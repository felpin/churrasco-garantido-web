import { connect } from 'react-redux';

import Login from './component';
import { login } from './actions';
import { getLoginIsFetching } from '../../reducer';

export const mapStateToProps = state => ({
  isFetching: getLoginIsFetching(state),
});

export const mapDispatchToProps = {
  onSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
