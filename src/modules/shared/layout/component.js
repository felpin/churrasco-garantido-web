import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notification from '../../shared/notification/component';

const Layout = ({ children }) => (
  <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand">Menu</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
          <Link to="/empresa/criar" className="nav-item nav-link">Cadastrar nova empresa</Link>
          <Link to="/pedido/criar" className="nav-item nav-link">Novo pedido</Link>
          <Link to="/dashboard" className="nav-item nav-link disabled">Minha conta</Link>
          <Link to="/logout" className="nav-item nav-link">Sair</Link>
        </div>
      </div>
    </nav>
    {children}
    <Notification />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
