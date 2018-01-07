import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CNPJ } from 'cpf_cnpj';

function renderErrorMessage() {
  return <h3 className='text-center'>Ocorreu um erro ao buscar as informações do dashboard</h3>
}

function renderLoadingMessage() {
  return <h3 className='text-center'>Carregando...</h3>
}

function renderNoCompanyMessage() {
  return <h3 className='text-center'>Você não possui empresa cadastrada</h3>
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.hasCompany = this.hasCompany.bind(this);
    this.renderCompanies = this.renderCompanies.bind(this);
  }

  componentDidMount() {
    this.props.getSummary();
  }

  hasCompany() {
    return !!this.props.summary.length;
  }

  renderCompanies() {
    const { summary } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="text-center">Nome fantasia</th>
            <th scope="col" className="text-center">CNPJ</th>
            <th scope="col" className="text-center">Qtd de pedidos</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(summaryItem =>
            <tr key={summaryItem.cnpj}>
              <td>{summaryItem.name}</td>
              <td>{CNPJ.format(summaryItem.cnpj)}</td>
              <td>{summaryItem.orders}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const { isFetching, couldFetch } = this.props

    return (
      <div>
        <h1 className="text-center pt-3">Dashboard</h1>
        {isFetching && renderLoadingMessage()}
        {!isFetching && couldFetch && (this.hasCompany() ? this.renderCompanies() : renderNoCompanyMessage())}
        {!isFetching && !couldFetch && renderErrorMessage()}
      </div>
    );
  }
}

Dashboard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  couldFetch: PropTypes.bool.isRequired,
  getSummary: PropTypes.func.isRequired,
  summary: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cnpj: PropTypes.string.isRequired,
    orders: PropTypes.number.isRequired,
  })).isRequired,
};


export default Dashboard;