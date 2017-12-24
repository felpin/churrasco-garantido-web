import fetch from 'isomorphic-fetch';

import { API_URL } from '../../../config';
import createHttpConfig from '../../../utils/http/createHttpConfig';

export default (username, password) => fetch(`${API_URL}/account/create`, createHttpConfig({ username, password }));
