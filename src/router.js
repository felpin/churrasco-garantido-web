import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './modules/account/signup/container';
import Login from './modules/account/login/container';

const basename = process.env.APP_NAME || '/';

export default (
  <BrowserRouter basename={basename} >
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/conta/criar" component={Signup} />
      {/* TODO: Add 404 route */}
    </Switch>
  </BrowserRouter>
);