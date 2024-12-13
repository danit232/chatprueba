// VoiceRecorder.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic } from 'lucide-react';

const VoiceRecorder = ({ onRecordingStart, onRecordingStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();

  const requestMicrophonePermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('El navegador no soporta acceso al micrófono');
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false
      });
      
      mediaStreamRef.current = stream;
      setHasPermission(true);
      setError(null);
      
      return stream;
    } catch (err) {
      console.error('Error al solicitar permiso del micrófono:', err);
      setError('Por favor, permite el acceso al micrófono para usar esta función');
      setHasPermission(false);
      throw err;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeRecording = async () => {
      try {
        await requestMicrophonePermission();
        
        if (!mounted) return;

        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
          setError('Tu navegador no soporta reconocimiento de voz');
          return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        recognitionRef.current.lang = 'es-ES';
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Error en reconocimiento:', event.error);
          setError('Error en el reconocimiento de voz: ' + event.error);
          setIsRecording(false);
        };
      } catch (err) {
        if (mounted) {
          console.error('Error al inicializar:', err);
        }
      }
    };

    initializeRecording();

    return () => {
      mounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    if (!hasPermission) {
      await requestMicrophonePermission();
      if (!hasPermission) return;
    }

    try {
      setError(null);
      setTranscript('');
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        onRecordingStart?.();
      }
    } catch (err) {
      console.error('Error al iniciar grabación:', err);
      setError('Error al iniciar el reconocimiento de voz: ' + err.message);
    }
  };

  const stopRecording = async () => {
    try {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
        onRecordingStop?.();

        if (transcript.trim()) {
          await sendMessageToOpenAI(transcript);
        }
      }
    } catch (err) {
      console.error('Error al detener grabación:', err);
      setError('Error al detener el reconocimiento: ' + err.message);
    }
  };

  const sendMessageToOpenAI = async (message) => {
    setIsLoading(true);
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';
      console.log('Enviando mensaje a:', backendURL); // Debug log
      
      const chatResponse = await fetch(`${backendURL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1'
        },
        body: JSON.stringify({
          message: message
        }),
        credentials: 'include' // Importante para CORS
      });

      console.log('Estado de la respuesta:', chatResponse.status); // Debug log

      if (!chatResponse.ok) {
        const errorData = await chatResponse.text();
        console.error('Error response:', errorData); // Debug log
        throw new Error(`Error al procesar el mensaje: ${chatResponse.status} ${errorData}`);
      }

      const chatData = await chatResponse.json();
      console.log('Respuesta recibida:', chatData); // Debug log
      
      if (chatData.response && chatData.audio) {
        navigate('/irina', { 
          state: { 
            userMessage: message,
            response: chatData.response,
            audio: chatData.audio
          } 
        });
      } else {
        throw new Error('Respuesta incompleta del servidor');
      }
    } catch (err) {
      console.error('Error detallado:', err); // Debug log
      setError(`Error al procesar el mensaje: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className={`p-4 rounded-full transition-all duration-300 ${
          isRecording ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
        } ${isLoading || !hasPermission ? 'opacity-50 cursor-not-allowed' : ''}`}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        disabled={isLoading || !hasPermission}
        title={!hasPermission ? "Permite el acceso al micrófono" : isRecording ? "Suelta para enviar" : "Mantén presionado para grabar"}
      >
        <Mic 
          size={48} 
          className={`${isRecording ? 'text-white animate-pulse' : 'text-gray-700'}`}
        />
      </button>

      {error && (
        <div className="absolute top-full mt-2 text-red-500 text-sm max-w-xs">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute top-full mt-2 text-blue-500 text-sm">
          ...
        </div>
      )}

      {!hasPermission && !error && (
        <div className="absolute top-full mt-2 text-yellow-500 text-sm max-w-xs">
          Permite el acceso al micrófono para continuar
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;