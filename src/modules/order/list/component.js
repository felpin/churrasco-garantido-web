import React, { Component } from 'react';
import PropTypes from 'prop-types';

function renderErrorMessage() {
  return <h3 className='text-center'>Ocorreu um erro ao buscar os pedidos</h3>
}

function renderLoadingMessage() {
  return <h3 className='text-center'>Carregando pedidos...</h3>
}

function renderNoOrderMessage() {
  return <h3 className='text-center'>Não existem pedidos para esta empresa</h3>
}

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.hasOrder = this.hasOrder.bind(this);
    this.renderOrders = this.renderOrders.bind(this);
  }

  componentDidMount() {
    const cnpj = this.props.match.params.cnpj;

    this.props.getOrders(cnpj);
    this.props.getCompanyName(cnpj);
  }

  hasOrder() {
    return !!this.props.orders.length;
  }

  renderOrders() {
    const { orders, excludeOrder, orderBeingExcluded } = this.props;

    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">Código</th>
            <th scope="col" className="text-center">Itens</th>
            <th scope="col" className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((orderItem) => {
            const isOrderBeingExcluded = orderBeingExcluded === orderItem.code;

            return (<tr key={orderItem.code}>
              <td className="text-center align-middle">{orderItem.code}</td>
              <td className="align-middle">{orderItem.products.map(product => (
                <div key={product.name}>
                  <div>{`${product.quantity}x ${product.name}`}</div>
                </div>
              ))}</td>
              <td className="align-middle">
                <button type="button" className="btn btn-secondary" onClick={() => excludeOrder(orderItem.code)} disabled={isOrderBeingExcluded}>
                  {isOrderBeingExcluded && <i className="fa fa-spinner fa-spin"></i>}Cancelar
                </button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { company, isFetchingOrders, couldFetchOrders } = this.props;

    return (
      <div>
        <h1 className="text-center pt-3">{"Meus Pedidos" + (!!company ? ` - ${company}` : "")}</h1>
        {isFetchingOrders && renderLoadingMessage()}
        {!isFetchingOrders && couldFetchOrders && (this.hasOrder() ? this.renderOrders() : renderNoOrderMessage())}
        {!isFetchingOrders && !couldFetchOrders && renderErrorMessage()}
      </div>
    );
  }
}

OrderList.propTypes = {
  company: PropTypes.string.isRequired,
  couldFetchOrders: PropTypes.bool.isRequired,
  excludeOrder: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  getCompanyName: PropTypes.func.isRequired,
  isExcludingOrder: PropTypes.bool.isRequired,
  isFetchingOrders: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  orderBeingExcluded: PropTypes.number.isRequired,
};

export default OrderList;
