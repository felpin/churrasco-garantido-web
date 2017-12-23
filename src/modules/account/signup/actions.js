import { SubmissionError, reset } from 'redux-form';
import { toast } from 'react-toastify';
import {
  ACCOUNT_CREATION_FAILURE,
  ACCOUNT_CREATION_REQUEST,
  ACCOUNT_CREATION_SUCCESS
} from './types';

import createAccountInApi from './api';

export const signupRequest = () => ({
  type: ACCOUNT_CREATION_REQUEST
});

export const signupSuccess = () => ({
  type: ACCOUNT_CREATION_SUCCESS
});

export const signupFailure = () => ({
  type: ACCOUNT_CREATION_FAILURE
});

export const signup = ({ email, password }) => (dispatch) => {
  dispatch(signupRequest());

  return createAccountInApi(email, password)
    .then((response) => {
      if (response.ok) {
        console.log('sucesso')
        return;
      }

      return response.json().then(error => Promise.reject(error));
    })
    .then(() => {
      dispatch(signupSuccess());
      dispatch(reset('signup'));
      toast.success('Usuário criado com sucesso. Você será redirecionado para o login.');

      setTimeout(() => {
        window.location.replace('/login');
      }, 3000);
    })
    .catch((error) => {
      dispatch(signupFailure());

      switch (error.name) {
        case 'DuplicatedUsernameError':
          throw new SubmissionError({ email: `O usuário ${error.username} não está disponível para cadastro` });
        case 'WeakPasswordError':
          throw new SubmissionError({ password: 'A senha não está de acordo com as políticas de segurança' });
        default:
          throw new SubmissionError({ _error: 'Ocorreu um erro ao realizar a requisição' });
      }
    })
};
