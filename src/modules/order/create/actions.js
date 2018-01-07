import { toast } from 'react-toastify';
import {
  createNewOrder as createNewOrderInApi,
  getCompanies as getCompaniesInApi,
  getProducts as getProductsInApi,
} from './api';
import {
  ADD_PRODUCT_TO_ORDER,
  CHANGE_COMPANY_IN_ORDER,
  COMPANY_AND_PRODUCT_LIST_FAILURE,
  COMPANY_AND_PRODUCT_LIST_REQUEST,
  COMPANY_AND_PRODUCT_LIST_SUCCESS,
  HIDE_COMPANY_REQUIRED,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  REMOVE_PRODUCT_FROM_ORDER,
  RESET_ORDER,
  SHOW_COMPANY_REQUIRED,
} from './types';

const companyAndProductListFailure = { type: COMPANY_AND_PRODUCT_LIST_FAILURE };
const companyAndProductListRequest = { type: COMPANY_AND_PRODUCT_LIST_REQUEST };
const companyAndProductListSuccess = (companies, products) => ({ type: COMPANY_AND_PRODUCT_LIST_SUCCESS, companies, products });

const orderCreateFailure = { type: ORDER_CREATE_FAILURE };
const orderCreateRequest = { type: ORDER_CREATE_REQUEST };
const orderCreateSuccess = { type: ORDER_CREATE_SUCCESS };

export const resetOrder = () => ({ type: RESET_ORDER });

export const getCompaniesAndProducts = () => (dispatch) => {
  dispatch(companyAndProductListRequest);

  const handleFetchResponse = (response) => {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(error => Promise.reject(error));
  };

  const getCompaniesPromise = getCompaniesInApi()
    .then(handleFetchResponse);

  const getProductsPromise = getProductsInApi()
    .then(handleFetchResponse);

  return Promise
    .all([getCompaniesPromise, getProductsPromise])
    .then(([companies, products]) => {
      dispatch(companyAndProductListSuccess(companies, products));
    })
    .catch(() => {
      dispatch(companyAndProductListFailure);
    });
};

export const createOrder = ({ cnpj, order }) => (dispatch) => {
  if (!cnpj) {
    dispatch({ type: SHOW_COMPANY_REQUIRED });
    return;
  }

  const products = order.map(orderItem => ({ name: orderItem.product, quantity: orderItem.quantity }));

  dispatch(orderCreateRequest);

  return createNewOrderInApi({ cnpj, products })
    .then((response) => {
      if (response.ok) {
        return;
      }

      return response.json().then(error => Promise.reject(error));
    })
    .then(() => {
      dispatch(orderCreateSuccess);
      dispatch(resetOrder());
      toast.success('Pedido finalizado com sucesso');
    })
    .catch(() => {
      dispatch(orderCreateFailure);
      toast.error('Ocorreu um erro ao finalizar o pedido');
    });
};

export const addProductToOrder = ({ product, quantity }) => ({ type: ADD_PRODUCT_TO_ORDER, product, quantity: parseInt(quantity, 10) });
export const changeCompany = cnpj => (dispatch) => {
  dispatch({ type: CHANGE_COMPANY_IN_ORDER, cnpj });
  dispatch({ type: HIDE_COMPANY_REQUIRED });
};
export const removeProduct = product => ({ type: REMOVE_PRODUCT_FROM_ORDER, product });
