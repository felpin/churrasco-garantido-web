import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './modules/account/login/container';
import Signup from './modules/account/signup/container';
import CompanyCreation from './modules/company/create/container';
import Dashboard from './modules/dashboard/container';
import Layout from './modules/shared/layout/component'
import { isAuthenticated } from './utils/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)
  )} />
)

export default (
  <BrowserRouter basename="/" >
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/conta/criar" component={Signup} />
      <Layout>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/empresa/criar" component={CompanyCreation} />
      </Layout>
      {/* TODO: Add 404 route */}
    </Switch>
  </BrowserRouter>
);