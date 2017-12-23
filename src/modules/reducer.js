import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer, * as loginSelectors from './account/login/reducer'
import signupReducer, * as signupSelectors from './account/signup/reducer'

const reducers = {
  form: formReducer,
  login: loginReducer,
  signup: signupReducer,
};

export default combineReducers(reducers);

// SELECTORS
export const getAccountCreationIsFetching = state => signupSelectors.getIsFetching(state.signup);
export const getLoginIsFetching = state => loginSelectors.getIsFetching(state.login);