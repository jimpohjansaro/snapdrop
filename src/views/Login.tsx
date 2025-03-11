import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
      {displayRegister ? <RegisterForm /> : <LoginForm />}
      <div className="flex flex-col items-center justify-center">
        <button
          className="my-2.5 block w-4/5 rounded-md bg-blue-400 p-2 text-center transition-all duration-500 ease-in-out hover:bg-indigo-500"
          onClick={toggleRegister}
        >
          or {displayRegister ? 'login' : 'register'}?
        </button>
      </div>
    </>
  );
};

export default Login;
