import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer, * as loginSelectors from './account/login/reducer';
import signupReducer, * as signupSelectors from './account/signup/reducer';
import companyCreationReducer, * as companyCreationSelectors from './company/create/reducer';
import dashboardReducer, * as dashboardSelectors from './dashboard/reducer';

const reducers = {
  companyCreation: companyCreationReducer,
  dashboard: dashboardReducer,
  form: formReducer,
  login: loginReducer,
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
