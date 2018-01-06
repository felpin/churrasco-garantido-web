import { connect } from 'react-redux';

import CompanyCreation from './component';
import { createCompany } from './actions';
import { getCompanyCreationIsFetching } from '../../reducer';

export const mapStateToProps = state => ({
  isFetching: getCompanyCreationIsFetching(state),
});

export const mapDispatchToProps = {
  onSubmit: createCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreation);
