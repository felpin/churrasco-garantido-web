import fetch from 'isomorphic-fetch';
import { API_URL } from '../../../config';
import createAuthorizationHeader from '../../../utils/http/createAuthorizationHeader';

export const getCompanies = cnpj => fetch(`${API_URL}/companies`, ({ headers: createAuthorizationHeader() }));
export const getOrders = cnpj => fetch(`${API_URL}/companies/${cnpj}/orders`, ({ headers: createAuthorizationHeader() }));
export const excludeOrder = code => fetch(`${API_URL}/orders/${code}`, ({ headers: createAuthorizationHeader(), method: 'DELETE' }));
