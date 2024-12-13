import styles from './Footer.module.css';
import robotImage from './images/BOTBlack2.webp';
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from './images/logo_con_letras_negro.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <span className={styles.highlight2}>Conecta con</span>{' '}
          <span className={styles.highlight}>Nosotros</span>
        </h2>
        <a href="/"><img src={logo} alt='RelatividadIA' className={styles.logo} /></a>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Empresa</h3>
            <ul>
              <li><a href="https://www.relatividadia.com/acerca-de#acerca-de">Acerca De</a></li>
              <li><a href="https://www.relatividadia.com/contacto#contacto">Contactos</a></li>
              <li><a href="https://www.instagram.com/relatividadia/">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/relatividad-ia/mycompany/">LinkedIn</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Productos</h3>
            <ul>
              <li><a href="https://www.relatividadia.com/clones-info">Bot IA</a></li>
              <li><a href="https://www.relatividadia.com/calificador-info">Calificador IA</a></li>
              <li><a href="https://www.relatividadia.com/smartbook-AI-info">Smartbook IA</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Preguntas Frecuentes</h3>
            <ul>
              <li><a href="https://www.relatividadia.com/#FAQ">Resuelve tus dudas sobre Relatividad IA</a></li>
            </ul>
          </div>
        </div>
        <img src={robotImage} alt="AI Robot" className={styles.robotImage} />
      </div>
      <div className={styles.bottomBar}>
        <p>
          Copyright © 2024 Relatividad IA. Todos los derechos reservados.
          {' | '}
          <a href="https://www.relatividadia.com/politica-privacidad">
            Política de privacidad
          </a>
          {' | '}
          <a href="https://www.relatividadia.com/terminos-condiciones">
            Términos y Condiciones
          </a>
        </p>
        <div className={styles.socialIcons}>
          <FaInstagram className={styles.icon1} onClick={() => window.location.href = 'https://www.instagram.com/relatividadia/'}/>
          <FaLinkedin className={styles.icon2} onClick={() => window.location.href = 'https://www.linkedin.com/company/relatividad-ia/mycompany/'}/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;