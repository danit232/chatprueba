import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import logo from './videos/logo-black.png';

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (location.state?.audio) {
      playAudio(location.state.audio);
    }
  }, [location.state]);

  const playAudio = async (audioBase64) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (!audioBase64 || typeof audioBase64 !== 'string') {
        throw new Error('Audio base64 inválido');
      }

      const byteCharacters = atob(audioBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error("Error procesando audio:", error);
      setIsPlaying(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/experience-irina');
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <h1 className={styles.text1}>IrinA</h1>

        <div className={styles.imageContainer}>
          <div className={styles.circleContainer}>
            <div className={`${styles.circle} ${isPlaying ? styles.speaking : ''}`} />
            <div className={`${styles.circle2} ${isPlaying ? styles.speaking : ''}`} />
          </div>
        </div>

        <div
          className={`${styles.logoContainer} ${isPlaying ? styles.speaking : ''}`}
          onClick={handleLogoClick}
        >
          <img 
            src={logo} 
            alt="Relatividad IA" 
            className={`${styles.logo} ${isPlaying ? styles.speaking : ''}`}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;