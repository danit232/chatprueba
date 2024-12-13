import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Chatbot.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRedo } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo-black.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (content) => {
    const trimmedMessage = content || inputMessage.trim();
    if (!trimmedMessage) return;

    // Añadir el mensaje del usuario inmediatamente
    const userMessage = { role: "user", content: trimmedMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsSending(true);
    setIsTyping(true);

    // Enviar al servidor
    fetch('http://127.0.0.1:8000/chatgpt', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Psico-API-Key': '94705224-bhvg-4745-mac7-f15c455858f4'
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
        "identificador": "43214",
        "intencion": "hablarConChat"
      })
    })
    .then(response => response.json())
    .then(data => {
      setIsSending(false);
      setIsTyping(false);
      if (data.response) {
        setMessages(prevMessages => [...prevMessages, { 
          role: "assistant", 
          content: data.response 
        }]);

        // Manejo de navegación y estados especiales
        if (data.currentBot === 8 ||
            data.response.toLowerCase().includes('gracias por tu tiempo') ||
            data.response.toLowerCase().includes('ha sido un placer') ||
            data.response.toLowerCase().includes('redirijido')) {
          setTimeout(() => {
            navigate('/form');
          }, 2000);
        }

        if (data.response.toLowerCase().includes('demo') ||
            data.response.toLowerCase().includes('empleados') ||
            data.currentBot === 7) {
          setShowEmployeeOptions(true);
        }

        if (data.response.toLowerCase().includes('celular')) {
          setShowPhoneForm(true);
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setIsTyping(false);
      setIsSending(false);
      setMessages(prevMessages => [...prevMessages, { 
        role: "assistant", 
        content: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo." 
      }]);
    });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setIsResetting(true);
    setIsTyping(false);
    setShowEmployeeOptions(false);
    setShowPhoneForm(false);
    setPhoneNumber('');
    setSelectedOption(null);

    fetch("http://127.0.0.1:8000/chatgpt/reset-chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Psico-API-Key': '94705224-bhvg-4745-mac7-f15c455858f4'
      },
      body: JSON.stringify({ chat_id: "43214" })
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error resetting chat:', error);
    })
    .finally(() => {
      setIsResetting(false);
    });
  };

  return (
    <div className={styles.chatWrapper}>
      <section className={styles.heroSection}>
        <div className={styles.chatcontainer}>
          <div className={styles.headerContent}>
            <img src={logo} alt="IrinA" className={styles.logo} />
            <h1 className={styles.title}>Cuéntame de ti</h1>
          </div>
          
          {/* Contenedor de mensajes con altura fija y scroll */}
          <div className={styles.chatmessages}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${styles.messagebubble} ${
                  message.role === "user" ? styles.user : styles.assistant
                }`}
              >
                {message.content}
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.messagebubble} ${styles.assistant} ${styles.typing}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de entrada fijo en la parte inferior */}
          <form 
            className={styles.chatform}
            onSubmit={(e) => {
              e.preventDefault();
              if (!showEmployeeOptions && !showPhoneForm) sendMessage();
            }}
          >
            <button
              type="button"
              className={styles.btnClean}
              onClick={resetChat}
              disabled={isSending || isResetting}
            >
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <textarea
              className={styles.formcontrol}
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje aquí..."
              rows="1"
              onKeyDown={handleKeyDown}
              disabled={showEmployeeOptions || showPhoneForm}
            />
            <button
              type="submit"
              className={styles.btnsend}
              disabled={isSending || showEmployeeOptions || showPhoneForm}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChatContainer;