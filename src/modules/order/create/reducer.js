import { combineReducers } from 'redux';
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
  RESET_ORDER,
  REMOVE_PRODUCT_FROM_ORDER,
  SHOW_COMPANY_REQUIRED,
} from './types';

const companies = (state = [], action) => {
  switch (action.type) {
    case COMPANY_AND_PRODUCT_LIST_FAILURE:
    case COMPANY_AND_PRODUCT_LIST_REQUEST:
      return [];
    case COMPANY_AND_PRODUCT_LIST_SUCCESS:
      return [...action.companies];
    default:
      return state;
  }
};

const couldFetchProductsAndCompanies = (state = true, action) => {
  switch (action.type) {
    case COMPANY_AND_PRODUCT_LIST_FAILURE:
      return false;
    case COMPANY_AND_PRODUCT_LIST_REQUEST:
    case COMPANY_AND_PRODUCT_LIST_SUCCESS:
      return true;
    default:
      return state;
  }
}

const isCreatingOrder = (state = false, action) => {
  switch (action.type) {
    case ORDER_CREATE_FAILURE:
    case ORDER_CREATE_SUCCESS:
      return false;
    case ORDER_CREATE_REQUEST:
      return true;
    default:
      return state;
  }
};

const isFetchingProductsAndCompanies = (state = false, action) => {
  switch (action.type) {
    case COMPANY_AND_PRODUCT_LIST_FAILURE:
    case COMPANY_AND_PRODUCT_LIST_SUCCESS:
      return false;
    case COMPANY_AND_PRODUCT_LIST_REQUEST:
      return true;
    default:
      return state;
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case RESET_ORDER:
      return [];
    case ADD_PRODUCT_TO_ORDER:
      return addProductToOrder(action.product, action.quantity, state.slice());
    case REMOVE_PRODUCT_FROM_ORDER:
      return removeProductFromOrder(action.product, state.slice());
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case COMPANY_AND_PRODUCT_LIST_FAILURE:
    case COMPANY_AND_PRODUCT_LIST_REQUEST:
      return [];
    case COMPANY_AND_PRODUCT_LIST_SUCCESS:
      return [...action.products];
    default:
      return state;
  }
};

const selectedCompany = (state = '', action) => {
  switch (action.type) {
    case CHANGE_COMPANY_IN_ORDER:
      return action.cnpj;
    case RESET_ORDER:
      return '';
    default:
      return state;
  }
};

const showCompanyRequired = (state = false, action) => {
  switch (action.type) {
    case SHOW_COMPANY_REQUIRED:
      return true;
    case RESET_ORDER:
    case HIDE_COMPANY_REQUIRED:
      return false;
    default:
      return state;
  }
};

function addProductToOrder(product, quantity, order) {
  const productIndex = order.findIndex(orderItem => orderItem.product === product);
  const isProductInOrder = productIndex !== -1;

  if (isProductInOrder) {
    const oldQuantity = order[productIndex].quantity;

    return [
      ...order.slice(0, productIndex),
      { product, quantity: oldQuantity + quantity },
      ...order.slice(productIndex + 1),
    ];
  }

  return [...order, { product, quantity }];
}

function removeProductFromOrder(product, order) {
  const productIndex = order.findIndex(orderItem => orderItem.product === product);
  const isProductInOrder = productIndex !== -1;

  if (isProductInOrder) {
    return [
      ...order.slice(0, productIndex),
      ...order.slice(productIndex + 1),
    ];
  }

  return order;
}

export default combineReducers({
  companies,
  couldFetchProductsAndCompanies,
  isCreatingOrder,
  isFetchingProductsAndCompanies,
  order,
  products,
  selectedCompany,
  showCompanyRequired,
});

export const getCompanies = state => state.companies;
export const getProducts = state => state.products;
export const getOrder = state => state.order;
export const getSelectedCompany = state => state.selectedCompany;

export const getIsCreatingOrder = state => state.isCreatingOrder;
export const getIsFetchingProductsAndCompanies = state => state.isFetchingProductsAndCompanies;
export const getCouldFetchProductsAndCompanies = state => state.couldFetchProductsAndCompanies;
export const getShowCompanyRequired = state => state.showCompanyRequired;
