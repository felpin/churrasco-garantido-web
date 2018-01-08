import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanySelect from './companySelectComponent';
import ProductSelect from './productSelectComponent';
import ShoppingCart from './shoppingCartComponent';

function renderErrorMessage() {
  return <h3 className="text-center">Ocorreu um erro ao buscar as empresas e produtos</h3>;
}

function renderLoadingMessage() {
  return <h3 className="text-center">Carregando...</h3>;
}

function renderNoCompanyOrProductMessage() {
  return <h3 className="text-center">Não há empresas ou produtos para criar um pedido</h3>;
}

class OrderCreation extends Component {
  constructor(props) {
    super(props);
    this.hasCompany = this.hasCompany.bind(this);
    this.hasProduct = this.hasProduct.bind(this);
  }

  componentWillMount() {
    this.props.resetOrder();
  }

  componentDidMount() {
    this.props.getCompaniesAndProducts();
  }

  hasCompany() {
    return !!this.props.companies.length;
  }

  hasProduct() {
    return !!this.props.products.length;
  }

  render() {
    const {
      addProductToOrder,
      isFetchingProductsAndCompanies,
      isCreatingOrder,
      couldFetchProductsAndCompanies,
      companies,
      companySelected,
      createOrder,
      handleCompanyChange,
      order,
      products,
      removeProduct,
      showCompanyRequired,
    } = this.props;

    function onChangeCompany(event) {
      handleCompanyChange(event.target.value);
    }

    function submitOrder() {
      createOrder({ cnpj: companySelected, order });
    }

    let main = (<div />);
    if (isFetchingProductsAndCompanies) {
      main = renderLoadingMessage();
    } else if (couldFetchProductsAndCompanies) {
      main = this.hasCompany() && this.hasProduct() ?
        (
          <div>
            <CompanySelect
              companies={companies}
              onChange={onChangeCompany}
              selected={companySelected}
              showCompanyRequired={showCompanyRequired}
            />
            <ProductSelect products={products} onSubmit={addProductToOrder} />
            <ShoppingCart order={order} removeItem={removeProduct} onSubmit={submitOrder} />
            {!!order.length &&
              <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={submitOrder}
                disabled={isCreatingOrder}
              >
                {isCreatingOrder && <i className="fa fa-spinner fa-spin" />}Finalizar pedido
              </button>
            }
          </div>
        )
        : renderNoCompanyOrProductMessage();
    } else {
      main = renderErrorMessage();
    }

    return (
      <div>
        <h1 className="text-center pt-3">Novo Pedido</h1>
        {main}
      </div>
    );
  }
}

OrderCreation.propTypes = {
  addProductToOrder: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cnpj: PropTypes.string.isRequired,
  })).isRequired,
  companySelected: PropTypes.string.isRequired,
  couldFetchProductsAndCompanies: PropTypes.bool.isRequired,
  createOrder: PropTypes.func.isRequired,
  getCompaniesAndProducts: PropTypes.func.isRequired,
  handleCompanyChange: PropTypes.func.isRequired,
  isCreatingOrder: PropTypes.bool.isRequired,
  isFetchingProductsAndCompanies: PropTypes.bool.isRequired,
  order: PropTypes.arrayOf(PropTypes.shape({
    product: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  products: PropTypes.arrayOf(PropTypes.string).isRequired,
  showCompanyRequired: PropTypes.bool.isRequired,
  resetOrder: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default OrderCreation;
