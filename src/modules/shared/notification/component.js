import React from 'react';
import { ToastContainer } from 'react-toastify';

const Notification = () =>
  (<ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnHover
  />);

export default Notification;
