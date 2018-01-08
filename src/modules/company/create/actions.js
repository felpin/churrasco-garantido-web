import { toast } from 'react-toastify';
import { SubmissionError, reset } from 'redux-form';
import createCompanyInApi from './api';
import { COMPANY_CREATE_FAILURE, COMPANY_CREATE_REQUEST, COMPANY_CREATE_SUCCESS } from './types';

const companyCreateFailure = { type: COMPANY_CREATE_FAILURE };
const companyCreateRequest = { type: COMPANY_CREATE_REQUEST };
const companyCreateSuccess = { type: COMPANY_CREATE_SUCCESS };

export const createCompany = companyData => (dispatch) => {
  dispatch(companyCreateRequest);

  const cnpjNumbers = companyData.cnpj.replace(/[^\d]/g, '');
  const companyDataCopy = { ...companyData, cnpj: cnpjNumbers };

  return createCompanyInApi(companyDataCopy)
    .then((response) => {
      if (response.ok) {
        return;
      }

      response.json().then(error => Promise.reject(error));
    })
    .then(() => {
      dispatch(companyCreateSuccess);
      dispatch(reset('companyCreation'));
      toast.success('Empresa criada com sucesso');
    })
    .catch((error) => {
      dispatch(companyCreateFailure);

      switch (error.name) {
        case 'DuplicatedCnpjError':
          throw new SubmissionError({ cnpj: 'Já existe uma empresa com esse CNPJ' });
        case 'InvalidCnpjError':
          throw new SubmissionError({ cnpj: 'Este CNPJ é inválido' });
        default:
          throw new SubmissionError({ _error: 'Ocorreu um erro ao criar a empresa' });
      }
    });
};
