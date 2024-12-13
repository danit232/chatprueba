// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './FormContext.jsx';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Error from './Error/Error';
import Home from './Home/Home';
import Irina from './Irina/Irina';
import Experience from './Experience/Experience';
import Chat from './Agendador/Agendador';
import FormWrapper from './FormWrapper/FormWrapper';

import './App.css';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/irina" element={<Irina />} />
          <Route path="/experience-irina" element={<Experience />} />
          <Route path="/chat-irina" element={<Chat />} />
          <Route path="/form" element={<FormWrapper />} />

          Experience

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;