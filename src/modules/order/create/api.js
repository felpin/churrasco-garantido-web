import fetch from 'isomorphic-fetch';
import { API_URL } from '../../../config';
import createAuthorizationHeader from '../../../utils/http/createAuthorizationHeader';
import createHttpConfig from '../../../utils/http/createHttpConfig';

export const getCompanies = () => fetch(`${API_URL}/companies`, ({ headers: createAuthorizationHeader() }));

export const getProducts = () => fetch(`${API_URL}/products`, ({ headers: createAuthorizationHeader() }));

export const createNewOrder = (body) => {
  const HTTP_METHOD = 'POST';
  const httpHeaders = createAuthorizationHeader();
  const httpConfig = createHttpConfig(body, HTTP_METHOD, httpHeaders);

  return fetch(`${API_URL}/orders`, httpConfig);
};
