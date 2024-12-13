import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Form.module.css';

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    empresa: '',
    cargo: '',
    numeroEmpleados: '',
  });

  const questions = [
    "¿Qué problemas enfrenta tu empresa actualmente que puedan ser abordados con un ChatBot con IA a medida?",
    "¿Qué soluciones tecnológicas has utilizado en el pasado para abordar estos problemas?",
    "¿Qué conocimientos y habilidades quisieras que tu ChatBot con IA posea?",
    "¿Trabajando en conjunto con un equipo de científicos de datos y desarrolladores de software especializados en IA, qué resultados crees que podría conseguir tu negocio?"
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [showMessage, setShowMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const [isFirstFormVisible, setIsFirstFormVisible] = useState(true);

  useEffect(() => {
    if (isFirstFormSubmitted) {
      const timer = setTimeout(() => {
        setShowQuestions(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFirstFormSubmitted]);

  const handleCloseMessage = () => {
    setShowMessage(false);
    setSubmitStatus({ type: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendFormData = async (data) => {
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwjvnMvofa_YK_R8GXkm0dq5mzITXXkMX3aYR9Q86TH7u8K_WPMu_s9zw1sNcCP700/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return true;
    } catch (error) {
      console.error('Error al enviar datos:', error);
      return false;
    }
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendFormData({
        ...formData,
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: ''
      });

      if (success) {
        
        setShowMessage(true);
        setSlideDirection('slide-out');

        setTimeout(() => {
          setIsFirstFormVisible(false);
          setIsFirstFormSubmitted(true);
          setSlideDirection('slide-in');
        }, 500);
      } else {
        throw new Error('Error al enviar el formulario inicial');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.'
      });
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        handleCloseMessage();
      }, 5000);
    }
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit final form
      setIsSubmitting(true);
      try {
        const finalData = {
          ...formData,
          respuesta1: responses[0],
          respuesta2: responses[1],
          respuesta3: responses[2],
          respuesta4: responses[3]
        };

        const success = await sendFormData(finalData);

        if (success) {

          // Reset all form data
          setFormData({
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            empresa: '',
            cargo: '',
            numeroEmpleados: '',
          });
          setResponses(Array(questions.length).fill(""));
          setIsFirstFormVisible(true);
          setIsFirstFormSubmitted(false);
          setCurrentStep(0);
        } else {
          throw new Error('Error al enviar el formulario final');
        }
      } catch (error) {
        console.error('Error:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.'
        });
        setShowMessage(true);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          handleCloseMessage();
        }, 5000);
      }
    }
  };

  return (
    <section id="Formulario" className={styles.contacto}>
      <div className={styles.formWrapper}>
      <h1 className={styles.heading}>Formulario de aplicación para desarrollar tu Chatbot IA</h1>
        {isFirstFormVisible && (
          <div className={`${styles.formContainer} ${styles[slideDirection]}`}>
            
            <form onSubmit={handleInitialSubmit} className={styles.form}>
              <div className={styles.seccionPregunta}>
                <label htmlFor="nombre" className={styles.label}>Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="..."
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="apellido" className={styles.label}>Apellido *</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="..."
                  required
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="telefono" className={styles.label}>Celular *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="..."
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="..."
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="empresa" className={styles.label}>Empresa *</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  placeholder="..."
                  required
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="cargo" className={styles.label}>Cargo *</label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  placeholder="..."
                  required
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.seccionPregunta}>
                <label htmlFor="numeroEmpleados" className={styles.label}>
                  Empleados: {formData.numeroEmpleados || '0'} *
                </label>
                <input
                  type="range"
                  id="numeroEmpleados"
                  name="numeroEmpleados"
                  min="1"
                  max="150"
                  required
                  value={formData.numeroEmpleados || '0'}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    height: '5px',
                    background: '#2E8CB38F',
                    borderRadius: '5px',
                    appearance: 'none',
                    outline: 'none'
                  }}
                />
              </div>
              <div className={styles.submitButton}>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '...' : 'SIGUIENTE'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isFirstFormVisible && showQuestions && (
          <div className={`${styles.formContainer} ${styles[slideDirection]}`}>
            <p className={styles.description}>
              Nos gusta trabajar de manera profesional: Responde a las siguientes 4 preguntas que aceleranrán tu desarrollo.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <div className={styles.questionContainer}>
                <label className={styles.label}>
                  {questions[currentStep]}
                </label>
                <br />
                <label className={styles.label}>
                Sé lo más específico posible.
                </label>
                <textarea
                  value={responses[currentStep]}
                  onChange={(e) => {
                    const newResponses = [...responses];
                    newResponses[currentStep] = e.target.value;
                    setResponses(newResponses);
                  }}
                  className={styles.textarea}
                  required
                  placeholder="Escribe tu respuesta aquí..."
                  rows="4"
                />
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!responses[currentStep] || isSubmitting}
                  className={styles.svgButton}
                  aria-label={currentStep < questions.length - 1 ? 'Siguiente' : 'Enviar Formulario'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="15.9833" cy="15.9833" r="15.9833" fill="url(#paint0_linear_398_4445)" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.9719 10.2197C15.2636 9.92678 15.7364 9.92678 16.0281 10.2197L20.7812 14.9926C21.0729 15.2855 21.0729 15.7604 20.7812 16.0533C20.4896 16.3462 20.0167 16.3462 19.725 16.0533L16.2469 12.5607V21.25C16.2469 21.6642 15.9125 22 15.5 22C15.0875 22 14.7531 21.6642 14.7531 21.25V12.5607L11.275 16.0533C10.9833 16.3462 10.5104 16.3462 10.2188 16.0533C9.92708 15.7604 9.92708 15.2855 10.2188 14.9926L14.9719 10.2197Z" fill="white" />
                    <defs>
                      <linearGradient id="paint0_linear_398_4445" x1="15.9833" y1="0" x2="15.9833" y2="31.9667" gradientUnits="userSpaceOnUse">
                        <stop />
                        <stop offset="1" stopColor="#024A92" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {submitStatus.message && showMessage && (
          <div className={`${styles.message} ${submitStatus.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
            {submitStatus.message}
            <button
              onClick={handleCloseMessage}
              className={styles.messageCloseButton}
              aria-label="Cerrar mensaje"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Form;