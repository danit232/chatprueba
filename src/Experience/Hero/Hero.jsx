import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const handleAgendarClick = () => {
    setIsPressed(true);
    // Agregamos un delay de 500ms antes de la navegación
    setTimeout(() => {
      navigate('/chat-irina');
    }, 500);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <h2 className={styles.centerTitle}>Interesante experiencia no lo crees?</h2>

        <div className={styles.contentBlock}>
          <p className={styles.paragraph}>
            Así cómo este, en <span className={styles.bold}>Relatividad IA
            </span> nos dedicamos a desarrollar asistentes virtuales e implementarlos en base a tus
            <span className={styles.bold}> necesidades</span> y las de tu empresa.
          </p>

          <p className={styles.paragraph}>
            Aplica para ser una de las <span className={styles.bold}>10</span> empresas que construirán su ChatBot con
            <span className={styles.bold}> Inteligencia Artificial</span> a medida en el siguiente mes.
          </p>
        </div>

        <div className={styles.messageSection}>
          <h1 className={styles.text1}>Da el paso hacia el </h1>
          <p className={styles.leaveMessage}>Futuro</p>

          <button 
            className={`${styles.button} ${isPressed ? styles.buttonPressed : ''}`}
            onClick={handleAgendarClick}
            disabled={isPressed}
          >
            {isPressed ? 'Redirigiendo...' : 'Agendar cita con IrinA'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;