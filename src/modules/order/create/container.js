import { connect } from 'react-redux';

import OrderCreation from './component';
import {
  addProductToOrder,
  changeCompany,
  createOrder,
  getCompaniesAndProducts,
  removeProduct,
  resetOrder,
} from './actions';
import {
  getOrderCreationCompanies,
  getOrderCreationCouldFetchProductsAndCompanies,
  getOrderCreationIsCreatingOrder,
  getOrderCreationIsFetchingProductsAndCompanies,
  getOrderCreationOrder,
  getOrderCreationProducts,
  getOrderCreationSelectedCompany,
  getOrderCreationShowCompanyRequired,
} from '../../reducer';

export const mapStateToProps = state => ({
  companies: getOrderCreationCompanies(state),
  companySelected: getOrderCreationSelectedCompany(state),
  couldFetchProductsAndCompanies: getOrderCreationCouldFetchProductsAndCompanies(state),
  isCreatingOrder: getOrderCreationIsCreatingOrder(state),
  isFetchingProductsAndCompanies: getOrderCreationIsFetchingProductsAndCompanies(state),
  order: getOrderCreationOrder(state),
  products: getOrderCreationProducts(state),
  showCompanyRequired: getOrderCreationShowCompanyRequired(state),
});

export const mapDispatchToProps = {
  addProductToOrder,
  createOrder,
  getCompaniesAndProducts,
  handleCompanyChange: changeCompany,
  removeProduct,
  resetOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreation);
