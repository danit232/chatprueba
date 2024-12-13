// Hero.jsx
import styles from './Hero.module.css';
import { useEffect, useState } from 'react';
import VoiceRecorder from '../../Components/VoiceRecorder';

const Hero = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const initializeMicrophone = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasInitialized(true);
      } catch (err) {
        console.error('Error al inicializar micrófono:', err);
      }
    };

    initializeMicrophone();
  }, []);

  const handleRecordingStart = () => {
    setIsRecording(true);
  };

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <h1 className={styles.text1}>Emilio</h1>
        <h2 className={styles.text2}>estás cavando tu propia tumba…</h2>

        <div className={styles.contentBlock}>
          <p className={styles.paragraph}>
            Construyes tu propio <span className={styles.bold}>reemplazo</span> , date cuenta.
            Hasta podría decir que estás aportando para que en algún punto
            la tecnología nos <span className={styles.bold}>&quot;gobierne&quot;</span>
          </p>

          <p className={styles.paragraph}>
            Como este, he recibido muchos comentarios relacionados a mi
            proyecto con la <span className={styles.bold}>inteligencia artificial.</span>
          </p>

          <p className={styles.paragraph}>
            Pero si estás leyendo esto, quiere decir que nuestro punto de vista…
          </p>
        </div>

        <h2 className={styles.centerTitle}>Es diferente.</h2>

        <div className={styles.contentBlock}>
          <p className={styles.paragraph}>
            Parte de elevar nuestra conciencia en relación con el <span className={styles.bold}>tiempo </span>
            en el que vivimos es la <span className={styles.bold}>adaptación</span> y el uso de las herramientas
            que tenemos a mano.
          </p>

          <p className={styles.paragraph}>
            Por eso integré un <span className={styles.bold}>ChatBot</span> con <span className={styles.bold}>IA</span> para que realice las tareas
            que más tiempo, recursos y energía consumen.
          </p>
        </div>

        <div className={styles.messageSection}>
          <p className={styles.presentation}>Te la presento...</p>
          <p className={styles.leaveMessage}>Déjale un mensaje</p>

          <div className={styles.imageContainer}>
            <div className={`${styles.circleContainer} ${isRecording ? styles.recording : ''}`}>
              <div className={styles.circle} />
              <div className={styles.circle2} />
            </div>
            <div className={styles.waveWrapper}>
              <VoiceRecorder
                onRecordingStart={handleRecordingStart}
                onRecordingStop={handleRecordingStop}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;