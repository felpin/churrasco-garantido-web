import { SubmissionError, reset } from 'redux-form';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from './types';

import loginInApi from './api';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const login = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest());

  return loginInApi(email, password)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }

      return response.json().then(error => Promise.reject(error));
    })
    .then((token) => {
      dispatch(loginSuccess());
      dispatch(reset('login'));

      sessionStorage.setItem('token', token);

      window.location = '/dashboard';
    })
    .catch((error) => {
      dispatch(loginFailure());

      switch (error.name) {
        case 'InvalidUsernameOrPasswordError':
          throw new SubmissionError({ _error: 'Usuário ou senha inválidos' });
        default:
          throw new SubmissionError({ _error: 'Ocorreu um erro ao realizar a requisição' });
      }
    })
};
