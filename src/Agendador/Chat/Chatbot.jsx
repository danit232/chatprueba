import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Chatbot.module.css';
import logo from './images/logo-black.png';

const ChatContainer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [userResponse, setUserResponse] = useState(null);
  const [showThirdMessage, setShowThirdMessage] = useState(false);
  const [showFourthMessage, setShowFourthMessage] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowSecondMessage(true);
      setCurrentStep(2);
      
      const buttonTimer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);
      
      return () => clearTimeout(buttonTimer);
    }, 2000);

    return () => clearTimeout(messageTimer);
  }, []);

  const handleButtonClick = (response) => {
    setShowButtons(false);
    setUserResponse(response);
    
    setTimeout(() => {
      setShowThirdMessage(true);
      setCurrentStep(3);
      
      setTimeout(() => {
        setShowFourthMessage(true);
        setCurrentStep(4);
        
        setTimeout(() => {
          setShowFinalButton(true);
        }, 1000);
      }, 2000);
    }, 1000);
  };


  return (
    <section className={styles.heroSection}>
      <div className={styles.chatcontainer}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 57">
              <defs>
                <radialGradient id="paint0_radial_56_16" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.5 16.7946) rotate(-172.17) scale(38.8624 51.5682)">
                  <stop stopColor="#024A92"/>
                  <stop offset="1" stopColor="white"/>
                </radialGradient>
                <radialGradient id="paint1_radial_56_16" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29 29) rotate(-109.877) scale(69.1176 78.4586)">
                  <stop offset="0.31" stopColor="white"/>
                  <stop offset="1" stopColor="#024A92"/>
                </radialGradient>
              </defs>
              <circle cx="28.5" cy="28.5" r="28.5" fill="url(#paint0_radial_56_16)"/>
              <circle cx="28.5" cy="28.5" r="28.5" fill="url(#paint1_radial_56_16)"/>
              <path d="M41.1511 18C40.7759 19.4885 42.4012 22.7764 41.8057 23.9518C41.5977 24.3618 40.68 24.3921 40.731 25.103C40.8146 26.2744 44.3161 30.4186 42.4563 31.3072C41.7303 31.6546 40.7596 31.178 40.1274 32.1211C39.642 32.8482 40.4516 33.4218 40.3415 33.8661C40.264 34.1811 39.6584 34.2559 39.4687 34.5487C39.2627 34.8658 39.383 35.3586 39.069 35.7019C38.8284 35.9645 38.1003 35.9948 37.8862 36.3401C37.3111 37.2671 38.4959 38.9555 36.8543 39.9653C34.4663 41.4336 31.2176 38.3819 29.8554 38.7071C28.9112 38.9333 29.266 40.1632 29.0886 40.8055C28.7317 42.1021 27.8997 42.2636 27.0636 43.1927C26.7026 43.5925 26.5395 44.358 26.1601 44.6427C25.1955 45.3698 19.9994 43.2472 18.8003 42.5908C17.6236 41.9466 13.6041 38.9454 13.1085 37.8912C12.5335 36.6693 14.4259 35.0718 14.5299 33.6035C14.689 31.3638 12.0583 29.8188 16.4999 29.3745C20.4766 28.9766 23.6926 30.3499 26.5374 32.9876C25.6585 24.7839 33.4283 18.4504 41.1511 18Z" fill="black"/>
              <path d="M23.2822 23.8003C26.2004 23.8003 25.8823 27.9486 23.5452 28.1021C20.5964 28.296 20.5107 23.7983 23.2822 23.8003Z" fill="black"/>
            </svg>
          </div>
          <h1 className={styles.title}>Irina</h1>
          <div className={styles.profileInfo}>
            <p className={styles.username}>@relatividadia</p>
            <p className={styles.stats}>1.2M seguidores • 37 publicaciones</p>
            <p className={styles.followers}>chatgpt y 9 otras IAs siguen a esta cuenta</p>
          </div>
        </div>
        <div className={styles.chatmessages}>
          <div className={styles.messageWrapper}>
            <div className={styles.messageBubble}>
              <p>Interesante experiencia no lo crees?</p>
            </div>
            {currentStep === 1 && (
              <div className={styles.avatarCircle}>
                <img src={logo} alt="Avatar" className={styles.avatarImage} />
              </div>
            )}
          </div>
          
          {showSecondMessage && (
            <div className={`${styles.messageWrapper} ${styles.fadeIn}`}>
              <div className={styles.messageBubble}>
                <p>Así cómo este, en Relatividad IA nos dedicamos a desarrollar asistentes virtuales e implementarlos en base a tus necesidades y las de tu empresa.</p>
              </div>
              {currentStep === 2 && (
                <div className={styles.avatarCircle}>
                  <img src={logo} alt="Avatar" className={styles.avatarImage} />
                </div>
              )}
            </div>
          )}

          {showButtons && (
            <div className={`${styles.buttonContainer} ${styles.fadeIn}`}>
              <button 
                className={styles.responseButton}
                onClick={() => handleButtonClick("¡Increíble!")}
              >
                ¡Increíble!
              </button>
              <button 
                className={styles.responseButton}
                onClick={() => handleButtonClick("Asombroso")}
              >
                Asombroso
              </button>
            </div>
          )}

          {userResponse && (
            <div className={`${styles.messageWrapper} ${styles.userMessage} ${styles.fadeIn}`}>
              <div className={styles.messageBubble}>
                <p>{userResponse}</p>
              </div>
            </div>
          )}

          {showThirdMessage && (
            <div className={`${styles.messageWrapper} ${styles.fadeIn}`}>
              <div className={styles.messageBubble}>
                <p>Aplica para ser una de las 10 empresas que construirán su ChatBot con Inteligencia Artificial a medida en el siguiente mes.</p>
              </div>
              {currentStep === 3 && (
                <div className={styles.avatarCircle}>
                  <img src={logo} alt="Avatar" className={styles.avatarImage} />
                </div>
              )}
            </div>
          )}

          {showFourthMessage && (
            <div className={`${styles.messageWrapper} ${styles.fadeIn}`}>
              <div className={styles.messageBubble}>
                <p>Te interesa entrenar un Chatbot IA para tu empresa?</p>
              </div>
              {currentStep === 4 && (
                <div className={styles.avatarCircle}>
                  <img src={logo} alt="Avatar" className={styles.avatarImage} />
                </div>
              )}
            </div>
          )}

          {showFinalButton && (
            <div className={`${styles.buttonContainer} ${styles.fadeIn}`}>
              <button 
                className={styles.responseButton}
                onClick={() => navigate('/form')}
              >
                ¡Sí, quiero mi Chatbot!
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;