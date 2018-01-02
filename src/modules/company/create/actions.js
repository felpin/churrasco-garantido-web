import createCompanyInApi from './api';
import { COMPANY_CREATE_FAILURE, COMPANY_CREATE_REQUEST, COMPANY_CREATE_SUCCESS } from './types';

const companyCreateFailure = { type: COMPANY_CREATE_FAILURE };
const companyCreateRequest = { type: COMPANY_CREATE_REQUEST };
const companyCreateSuccess = { type: COMPANY_CREATE_SUCCESS };

export const createCompany = (companyData) => (dispatch) => {
  dispatch(companyCreateRequest);

  createCompanyInApi(companyData)
    .then((response) => {
      if (response.ok) {
        dispatch(companyCreateSuccess);
        return;
      }

      Promise.reject();
    })
    .catch(() => dispatch(companyCreateFailure));
};
