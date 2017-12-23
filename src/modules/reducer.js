import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signupReducer, * as signupSelectors from './account/signup/reducer'

const reducers = {
  form: formReducer,
  signup: signupReducer,
};

export default combineReducers(reducers);

// SELECTORS
export const getAccountCreationIsFetching = state => signupSelectors.getIsFetching(state.signup);