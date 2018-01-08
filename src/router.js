import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './modules/shared/privateRoute/component';
import Login from './modules/account/login/container';
import Logout from './modules/account/logout/component';
import Signup from './modules/account/signup/container';
import CompanyCreation from './modules/company/create/container';
import Dashboard from './modules/dashboard/container';
import OrderCreation from './modules/order/create/container';
import OrderList from './modules/order/list/container';
import Layout from './modules/shared/layout/component';
import { isAuthenticated } from './utils/auth';

const RedirectToDashboard = () => (<Redirect to="/dashboard" />);

export default (
  <BrowserRouter basename="/" >
    <Switch>
      <Route exact path="/" component={isAuthenticated() ? RedirectToDashboard : Login} />
      {/* TODO: Login should redirect to dashboard if authenticated */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route
        exact
        path="/conta/criar"
        component={isAuthenticated() ? RedirectToDashboard : Signup}
      />
      <Layout>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/empresa/criar" component={CompanyCreation} />
        <PrivateRoute exact path="/empresa/:cnpj/pedidos" component={OrderList} />
        <PrivateRoute exact path="/pedido/criar" component={OrderCreation} />
      </Layout>
      {/* TODO: Add 404 route */}
    </Switch>
  </BrowserRouter>
);
