import fetch from 'isomorphic-fetch';

import { API_URL } from '../../config';
import createAuthorizationHeader from '../../utils/http/createAuthorizationHeader';

export default () => fetch(`${API_URL}/summary`, ({ headers: createAuthorizationHeader() }));
