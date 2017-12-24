import React from 'react';
import { Link } from 'react-router-dom';
import Notification from '../../shared/notification/component';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Menu</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
            <Link to="/dashboard" className="nav-item nav-link disabled">Cadastrar nova empresa</Link>
            <Link to="/dashboard" className="nav-item nav-link disabled">Novo pedido</Link>
            <Link to="/dashboard" className="nav-item nav-link disabled">Minha conta</Link>
            <Link to="/dashboard" className="nav-item nav-link disabled">Sair</Link>
          </div>
        </div>
      </nav>
      {children}
      <Notification />
    </div>
  );
}

export default Layout;
