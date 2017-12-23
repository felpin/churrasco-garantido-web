import { reset } from 'redux-form';
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

  createAccountInApi(email, password)
    .then((response) => {
      if (response.ok) {
        dispatch(signupSuccess());
        dispatch(reset('signup'));
        toast.success('Usuário criado com sucesso. Você será redirecionado para o login.');

        setTimeout(() => {
          window.location.replace('/login');
        }, 2000);
        return;
      }

      const status = response.status;
      if (status === 422) {
        response
          .json()
          .then((error) => {
            if (error && error.name) {
              switch (error.name) {
                case 'DuplicatedUsernameError':
                  toast.error(`O usuário ${error.username} não está disponível para criação`);
                  break;
                case 'WeakPasswordError':
                  toast.error('A senha não está de acordo com as políticas de segurança');
                  break;
              }
            }

            dispatch(signupFailure());
          })
          .catch(() => dispatch(signupFailure()));
      } else {
        toast.error('Ocorreu um erro no servidor');
        dispatch(signupFailure());
      }
    })
    .catch(() => {
      toast.error('Ocorreu um erro no servidor');
      dispatch(signupFailure());
    })
};
