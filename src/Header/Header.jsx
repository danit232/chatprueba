import logo from '../assets/icons/logo4.png';
import logoBlack from '../assets/icons/logo4.png';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';  // Importar el módulo CSS correctamente

const Header = () => {
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            setIsHeaderHidden(currentScrollY > lastScrollY && currentScrollY > 60);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isHeaderHidden ? styles.hidden : ''}`}>
            <img src={logo} alt="Relatividad IA" className={`${styles.logo} ${styles['logo-black']}`} />
            <img src={logoBlack} alt="Relatividad IA" className={`${styles.logo} ${styles['logo-white']}`} />
        </header>
    );
};

export default Header;
