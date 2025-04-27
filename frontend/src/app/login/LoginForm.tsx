import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useReducer, useState, SyntheticEvent } from 'react';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import ErrorMessage from './ErrorMessage';
import styles from './LoginPage.module.css';
import { login } from '../auth/auth.service'; 
import { UserLogin } from '../auth/auth.interfaces';


interface FormState {
  username: string;
  password: string;
}

type FormAction =
  | { type: 'UPDATE_FIELD'; name: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.name]: action.value };
    case 'RESET_FORM':
      return { username: '', password: '' };
    default:
      return state;
  }
};

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [loginErrorMessages, setLoginErrorMessages] = useState<string[]>([]);

  const [formState, dispatch] = useReducer(formReducer, { username: '', password: '' });
  const { username, password } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_FIELD', name: e.target.name as keyof FormState, value: e.target.value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginFailed(false);
    setLoginErrorMessages([]);

    try {
      const payload: UserLogin = { username, password };
      await login(payload);

      router.push('/map');
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoginFailed(true);
      setLoginErrorMessages(['Wrong username or password']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles['login-form']} onSubmit={onSubmit}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
      </svg>
      <h1 className={styles['login-h1']}>Welcome Back</h1>
      <h2 className={styles['login-h2']}>Login</h2>
      <UsernameInput value={username} onChange={handleChange} />
      <PasswordInput value={password} onChange={handleChange} />
      <LoginButton isLoading={isLoading} onSubmit={onSubmit} disabled={isLoading} />
      <hr className={styles['login-hr']} />
      <span>
        Don't have an account?{' '}
        <a href="/register" className={styles['register-link']}>
          Sign Up
        </a>
      </span>
      <ErrorMessage messages={loginErrorMessages} />
    </form>
  );
};

export default LoginForm;