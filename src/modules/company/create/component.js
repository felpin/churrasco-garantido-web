import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { CNPJ } from "cpf_cnpj";
import normalizeCnpj from '../../../utils/normalize/cnpj';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'O nome fantasia é obrigatório';
  }

  if (!values.cnpj) {
    errors.cnpj = 'O CNPJ é obrigatório';
  } else if (!CNPJ.isValid(values.cnpj)) {
    errors.cnpj = 'Este CNPJ é inválido'
  }

  return errors
}

// TODO: Extract to shared component
const renderField = ({ input, name, label, type, placeholder, meta: { touched, error } }) => (
  <div className="form-group row">
    <label htmlFor={name} className="col-sm-2 col-form-label">{label}:</label>
    <div className="col-sm-10">
      <input {...input} id={name} type={type} placeholder={placeholder} className="form-control" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
)

const CompanyCreation = (props) => {
  const { handleSubmit, isFetching, error } = props;

  return (
    <div className="container">
      <h2 className="text-center pt-5">Cadastro de Empresa</h2>
      <form className="form-company-creation" onSubmit={handleSubmit}>
        <Field name="name" component={renderField} type="text" placeholder="Taller" label="Nome fantasia" />
        <Field name="cnpj" component={renderField} type="text" placeholder="12.819.834/0001-02" label="CNPJ" normalize={normalizeCnpj} />
        {error && <span className="text-danger">{error}</span>}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary m-3" disabled={isFetching}>
            {isFetching && <i className="fa fa-spinner fa-spin"></i>}Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

CompanyCreation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'companyCreation',
  validate,
})(CompanyCreation);
