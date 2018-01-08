import { combineReducers } from 'redux';
import {
  SUMMARY_FAILURE,
  SUMMARY_REQUEST,
  SUMMARY_SUCCESS,
} from './types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case SUMMARY_FAILURE:
    case SUMMARY_SUCCESS:
      return false;
    case SUMMARY_REQUEST:
      return true;
    default:
      return state;
  }
};

const summary = (state = [], action) => {
  switch (action.type) {
    case SUMMARY_SUCCESS:
      return [...action.summary];
    case SUMMARY_FAILURE:
      return [];
    default:
      return state;
  }
};

const couldFetch = (state = true, action) => {
  switch (action.type) {
    case SUMMARY_FAILURE:
      return false;
    case SUMMARY_REQUEST:
    case SUMMARY_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default combineReducers({ isFetching, summary, couldFetch });

export const getIsFetching = state => state.isFetching;
export const getSummary = state => state.summary;
export const getCouldFetch = state => state.couldFetch;
