import {
  getCompanies as getCompaniesInApi,
  getOrders as getOrdersInApi,
  excludeOrder as excludeOrderInApi,
} from './api';
import {
  GET_COMPANY_FAILURE,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_REMOVE_FAILURE,
  ORDER_REMOVE_REQUEST,
  ORDER_REMOVE_SUCCESS,
} from './types';

const orderListRequest = () => ({ type: ORDER_LIST_REQUEST });
const orderListSuccess = orders => ({ type: ORDER_LIST_SUCCESS, orders });
const orderListFailure = () => ({ type: ORDER_LIST_FAILURE });

const orderRemoveRequest = code => ({ type: ORDER_REMOVE_REQUEST, code });
const orderRemoveSuccess = code => ({ type: ORDER_REMOVE_SUCCESS, code });
const orderRemoveFailure = () => ({ type: ORDER_REMOVE_FAILURE });

const getCompanyRequest = () => ({ type: GET_COMPANY_REQUEST });
const getCompanySuccess = company => ({ type: GET_COMPANY_SUCCESS, company });
const getCompanyFailure = () => ({ type: GET_COMPANY_FAILURE });

export const getOrders = cnpj => (dispatch) => {
  dispatch(orderListRequest());

  return getOrdersInApi(cnpj)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(() => Promise.reject());
    })
    .then((orders) => {
      dispatch(orderListSuccess(orders));
    })
    .catch(() => {
      dispatch(orderListFailure());
    });
};

export const getCompanyName = cnpj => (dispatch) => {
  dispatch(getCompanyRequest());

  return getCompaniesInApi()
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(() => Promise.reject());
    })
    .then((companies) => {
      const company = companies.find(companyUnit => companyUnit.cnpj === cnpj);

      if (company) {
        dispatch(getCompanySuccess(company.name));
      } else {
        dispatch(getCompanyFailure());
      }
    })
    .catch(() => {
      dispatch(getCompanyFailure());
    });
};

export const excludeOrder = code => (dispatch) => {
  dispatch(orderRemoveRequest(code));

  return excludeOrderInApi(code)
    .then((response) => {
      if (response.ok) {
        return;
      }

      Promise.reject();
    })
    .then(() => {
      dispatch(orderRemoveSuccess(code));
    })
    .catch(() => {
      dispatch(orderRemoveFailure());
    });
};
