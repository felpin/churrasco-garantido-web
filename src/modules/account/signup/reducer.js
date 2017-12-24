import { combineReducers } from 'redux'
import {
  ACCOUNT_CREATION_FAILURE,
  ACCOUNT_CREATION_REQUEST,
  ACCOUNT_CREATION_SUCCESS
} from './types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ACCOUNT_CREATION_FAILURE:
    case ACCOUNT_CREATION_SUCCESS:
      return false;
    case ACCOUNT_CREATION_REQUEST:
      return true;
    default:
      return state;
  }
};

export default combineReducers({ isFetching });

export const getIsFetching = state => state.isFetching;
