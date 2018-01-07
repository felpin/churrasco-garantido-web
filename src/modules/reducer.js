import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer, * as loginSelectors from './account/login/reducer';
import signupReducer, * as signupSelectors from './account/signup/reducer';
import companyCreationReducer, * as companyCreationSelectors from './company/create/reducer';
import dashboardReducer, * as dashboardSelectors from './dashboard/reducer';
import orderCreationReducer, * as orderCreationSelectors from './order/create/reducer';
import orderListReducer, * as orderListSelectors from './order/list/reducer';

const reducers = {
  companyCreation: companyCreationReducer,
  dashboard: dashboardReducer,
  form: formReducer,
  login: loginReducer,
  orderCreation: orderCreationReducer,
  orderList: orderListReducer,
  signup: signupReducer,
};

export default combineReducers(reducers);

// SELECTORS
export const getAccountCreationIsFetching = state => signupSelectors.getIsFetching(state.signup);
export const getCompanyCreationIsFetching = state => companyCreationSelectors.getIsFetching(state.companyCreation);
export const getDashboardCouldFetch = state => dashboardSelectors.getCouldFetch(state.dashboard);
export const getDashboardIsFetching = state => dashboardSelectors.getIsFetching(state.dashboard);
export const getDashboardSummary = state => dashboardSelectors.getSummary(state.dashboard);
export const getLoginIsFetching = state => loginSelectors.getIsFetching(state.login);
export const getOrderCreationCompanies = state => orderCreationSelectors.getCompanies(state.orderCreation);
export const getOrderCreationCouldFetchProductsAndCompanies = state => orderCreationSelectors.getCouldFetchProductsAndCompanies(state.orderCreation);
export const getOrderCreationIsCreatingOrder = state => orderCreationSelectors.getIsCreatingOrder(state.orderCreation);
export const getOrderCreationIsFetchingProductsAndCompanies = state => orderCreationSelectors.getIsFetchingProductsAndCompanies(state.orderCreation);
export const getOrderCreationOrder = state => orderCreationSelectors.getOrder(state.orderCreation);
export const getOrderCreationProducts = state => orderCreationSelectors.getProducts(state.orderCreation);
export const getOrderCreationSelectedCompany = state => orderCreationSelectors.getSelectedCompany(state.orderCreation);
export const getOrderCreationShowCompanyRequired = state => orderCreationSelectors.getShowCompanyRequired(state.orderCreation);
export const getOrderListOrders = state => orderListSelectors.getOrders(state.orderList);
export const getOrderListIsFetchingOrders = state => orderListSelectors.getIsFetchingOrders(state.orderList);
export const getOrderListCouldFetchOrders = state => orderListSelectors.getCouldFetchOrders(state.orderList);
export const getOrderListCompany = state => orderListSelectors.getCompany(state.orderList);
export const getOrderListIsExcludingOrder = state => orderListSelectors.getIsExcludingOrder(state.orderList);
export const getOrderListOrderBeingExcluded = state => orderListSelectors.getOrderBeingExcluded(state.orderList);
