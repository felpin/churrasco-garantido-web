import { connect } from 'react-redux';

import Dashboard from './component';
import { getSummary } from './actions';
import { getDashboardCouldFetch, getDashboardSummary, getDashboardIsFetching } from '../reducer';

export const mapStateToProps = state => ({
  couldFetch: getDashboardCouldFetch(state),
  isFetching: getDashboardIsFetching(state),
  summary: getDashboardSummary(state),
});

export const mapDispatchToProps = {
  getSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
