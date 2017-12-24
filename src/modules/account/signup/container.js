import { connect } from 'react-redux';

import Signup from './component';
import { signup } from './actions';
import { getAccountCreationIsFetching } from '../../reducer';

export const mapStateToProps = state => ({
  isFetching: getAccountCreationIsFetching(state),
});

export const mapDispatchToProps = {
  onSubmit: signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
