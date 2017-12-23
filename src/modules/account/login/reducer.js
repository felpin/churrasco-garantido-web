import { combineReducers } from 'redux'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from './types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
      return false;
    case LOGIN_REQUEST:
      return true;
    default:
      return state;
  }
};

export default combineReducers({ isFetching });

export const getIsFetching = state => state.isFetching;
