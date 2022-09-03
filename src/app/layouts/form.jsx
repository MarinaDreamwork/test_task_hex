import { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Form = () => {
  const [type, setType] = useState('register');

  const handleTypeChangeClick = (category) => {
    setType(type === category ? type : category);
  };

  return (
    <>
      {
        type === 'login' ? (
          <LoginForm onTypeChange={handleTypeChangeClick} />
        ) : (
          <RegisterForm onTypeChange={handleTypeChangeClick} />
        )
      }
    </>
  );
};

export default Form;