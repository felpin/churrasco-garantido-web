import React from 'react';
import PropTypes from 'prop-types';

function renderNoItemOnShoppingCart() {
  return <h4 className='text-center'>Você não incluiu nenhum produto</h4>
}

const ShoppingCart = ({ removeItem, order }) => {
  return (
    <div className="mt-4">
      <h3 className="text-center">Lista de Compras</h3>
      {(!order.length ? renderNoItemOnShoppingCart() :
        <div>
          <table className="table table-striped table-bordered mx-3">
            <thead>
              <tr>
                <th scope="col" className="text-center">Produto</th>
                <th scope="col" className="text-center">Quantidade</th>
                <th scope="col" className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {order.map(orderItem =>
                <tr key={orderItem.product}>
                  <td>{orderItem.product}</td>
                  <td className="text-right">{orderItem.quantity}</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-secondary" onClick={() => removeItem(orderItem.product)}>Excluir</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  order: PropTypes.arrayOf(PropTypes.shape({
    product: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ShoppingCart;
