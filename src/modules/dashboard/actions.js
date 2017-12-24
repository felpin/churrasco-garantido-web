import getSummaryFromApi from './api';
import { SUMMARY_FAILURE, SUMMARY_REQUEST, SUMMARY_SUCCESS } from './types';

export const summaryRequest = () => ({
  type: SUMMARY_REQUEST
});

export const summarySuccess = (summary) => ({
  type: SUMMARY_SUCCESS,
  summary,
});

export const summaryFailure = () => ({
  type: SUMMARY_FAILURE,
});

export const getSummary = () => (dispatch) => {
  dispatch(summaryRequest());

  getSummaryFromApi()
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then(error => Promise.reject(error));
    })
    .then((summary) => {
      dispatch(summarySuccess(summary));
    })
    .catch((error) => {
      dispatch(summaryFailure());
    });
}