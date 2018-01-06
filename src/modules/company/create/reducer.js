import { combineReducers } from 'redux'
import {
  COMPANY_CREATE_FAILURE,
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
} from './types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case COMPANY_CREATE_FAILURE:
    case COMPANY_CREATE_SUCCESS:
      return false;
    case COMPANY_CREATE_REQUEST:
      return true;
    default:
      return state;
  }
};

export default combineReducers({ isFetching });

export const getIsFetching = state => state.isFetching;
