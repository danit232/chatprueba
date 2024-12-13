// FormContext.jsx
import  { createContext, useContext, useState } from 'react';

const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export function FormProvider({ children }) {
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState(null);

  return (
    <FormContext.Provider value={{ formData, setFormData, responses, setResponses }}>
      {children}
    </FormContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormData() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
}