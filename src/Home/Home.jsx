import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import Hero from './Hero/Hero';
import Header from '../Header/Header';


// import Formulario from './Formulario/Formulario';

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`animated-section ${inView ? 'appear' : ''}`}>
      {children}
    </div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};

function Home() {
  return (
    <>
            <Header />
      <AnimatedSection><Hero/></AnimatedSection>
      {/* <AnimatedSection><Formulario/></AnimatedSection> */}
    </>
  );
}

export default Home;