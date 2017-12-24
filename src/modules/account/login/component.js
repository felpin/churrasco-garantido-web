import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'O e-mail é obrigatório'
  }

  if (!values.password) {
    errors.password = 'A senha é obrigatória';
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

const Signup = (props) => {
  const { handleSubmit, isFetching, error } = props;

  return (
    <div className="container">
      <h2 className="text-center pt-5">Login</h2>
      <form className="form-signin" onSubmit={handleSubmit}>
        <Field name="email" component={renderField} type="email" placeholder="usuario@gmail.com" label="E-mail" />
        <Field name="password" component={renderField} type="password" placeholder="******" label="Senha" />
        {error && <span className="text-danger">{error}</span>}
        <div className="d-flex justify-content-center">
          <Link to="/conta/criar">
            <button type="button" className="btn btn-link m-3">Nova conta</button>
          </Link>
          <button type="submit" className="btn btn-primary m-3" disabled={isFetching}>
            {isFetching && <i class="fa fa-spinner fa-spin"></i>}Login
          </button>
        </div>
      </form>
    </div>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login',
  validate,
})(Signup);
