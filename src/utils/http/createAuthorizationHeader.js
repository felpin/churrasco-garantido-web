import { getToken } from '../auth';

const createAuthorizationHeader = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default createAuthorizationHeader;
