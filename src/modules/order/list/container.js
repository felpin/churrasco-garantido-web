import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OrderList from './component';
import {
  getOrders,
  getCompanyName,
  excludeOrder,
} from './actions';
import {
  getOrderListCompany,
  getOrderListCouldFetchOrders,
  getOrderListIsFetchingOrders,
  getOrderListOrders,
  getOrderListIsExcludingOrder,
  getOrderListOrderBeingExcluded,
} from '../../reducer';

export const mapStateToProps = state => ({
  company: getOrderListCompany(state),
  couldFetchOrders: getOrderListCouldFetchOrders(state),
  isExcludingOrder: getOrderListIsExcludingOrder(state),
  isFetchingOrders: getOrderListIsFetchingOrders(state),
  orders: getOrderListOrders(state),
  orderBeingExcluded: getOrderListOrderBeingExcluded(state),
});

export const mapDispatchToProps = {
  excludeOrder,
  getOrders,
  getCompanyName,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderList));
