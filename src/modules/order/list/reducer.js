import { combineReducers } from 'redux';
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

const orders = (state = [], action) => {
  switch (action.type) {
    case ORDER_LIST_SUCCESS:
      return [...action.orders];
    case ORDER_REMOVE_SUCCESS:
      return removeOrder(action.code, state.slice())
    case ORDER_LIST_REQUEST:
    case ORDER_LIST_FAILURE:
      return [];
    default:
      return state;
  }
}

const isExcludingOrder = (state = false, action) => {
  switch (action.type) {
    case ORDER_REMOVE_REQUEST:
      return true;
    case ORDER_REMOVE_SUCCESS:
    case ORDER_REMOVE_FAILURE:
      return false;
    default:
      return state;
  }
}

const orderBeingExcluded = (state = 0, action) => {
  switch (action.type) {
    case ORDER_REMOVE_REQUEST:
      return action.code;
    case ORDER_REMOVE_SUCCESS:
    case ORDER_REMOVE_FAILURE:
      return 0;
    default:
      return state;
  }
}

const isFetchingOrders = (state = false, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return true;
    case ORDER_LIST_SUCCESS:
    case ORDER_LIST_FAILURE:
      return false;
    default:
      return state;
  }
}

const couldFetchOrders = (state = true, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
    case ORDER_LIST_SUCCESS:
      return true;
    case ORDER_LIST_FAILURE:
      return false;
    default:
      return state;
  }
}

const company = (state = '', action) => {
  switch (action.type) {
    case GET_COMPANY_SUCCESS:
      return action.company;
    case GET_COMPANY_REQUEST:
    case GET_COMPANY_FAILURE:
      return '';
    default:
      return state;
  }
}

function removeOrder(code, orders) {
  const orderIndex = orders.findIndex(order => order.code === code);
  const isOrderInList = orderIndex !== -1;

  if (isOrderInList) {
    return [
      ...orders.slice(0, orderIndex),
      ...orders.slice(orderIndex + 1),
    ];
  }

  return orders;
}

export default combineReducers({
  company,
  couldFetchOrders,
  isFetchingOrders,
  orders,
  isExcludingOrder,
  orderBeingExcluded,
});

export const getOrders = state => state.orders;
export const getCompany = state => state.company;
export const getIsFetchingOrders = state => state.isFetchingOrders;
export const getCouldFetchOrders = state => state.couldFetchOrders;
export const getIsExcludingOrder = state => state.isExcludingOrder;
export const getOrderBeingExcluded = state => state.orderBeingExcluded;
