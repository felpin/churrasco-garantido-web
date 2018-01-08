import React from 'react';
import { Redirect } from 'react-router-dom';
import { removeToken } from '../../../utils/auth';

const Logout = () => {
  removeToken();

  return (<Redirect to="/login" />);
};

export default Logout;
