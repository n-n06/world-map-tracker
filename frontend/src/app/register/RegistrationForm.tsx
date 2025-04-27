'use client'

import React, { useReducer, useState, SyntheticEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UsernameInput from './UsernameInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import RepeatPasswordInput from './RepeatPasswordInput';
import RegisterButton from './RegisterButton';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import styles from './RegistrationPage.module.css';

import { register as registerService, isRegistered } from '../auth/auth.service';
import { UserRegistration } from '../auth/auth.interfaces';

interface FormState {
  username: string;
  email: string;
  password: string;
  password2: string;
}

type FormAction =
  | { type: 'UPDATE_FIELD'; name: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.name]: action.value };
    case 'RESET_FORM':
      return { username: '', email: '', password: '', password2: '' };
    default:
      return state;
  }
};

interface RegistrationFormProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [formState, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const { username, email, password, password2 } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_FIELD', name: e.target.name as keyof FormState, value: e.target.value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationSuccess(false);
    setErrorMessages([]);
    setSuccessMessage('');

    if (password !== password2) {
      setErrorMessages(['Passwords do not match']);
      setIsLoading(false);
      return;
    }

    const payload: UserRegistration = { username, email, password, password2 };

    try {
      await registerService(payload);
      setRegistrationSuccess(true);
      setSuccessMessage('Registration Successful. Redirecting to Login');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Registration Error', error);
      setErrorMessages([error.message || 'Unexpected error, try again later please']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles['reg-form']} onSubmit={onSubmit}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
      </svg>
      <h1 className={styles['reg-h1']}>Welcome</h1>
      <h2 className={styles['reg-h2']}>Create account</h2>
      <UsernameInput value={username} onChange={handleChange} />
      <EmailInput value={email} onChange={handleChange} />
      <PasswordInput value={password} onChange={handleChange} />
      <RepeatPasswordInput value={password2} onChange={handleChange} />
      <RegisterButton isLoading={isLoading} onSubmit={onSubmit} disabled={isLoading} />
      <SuccessMessage message={successMessage} />
      <ErrorMessage messages={errorMessages} />
    </form>
  );
};

export default RegistrationForm;