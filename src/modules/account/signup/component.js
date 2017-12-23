import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Notification from '../../shared/notification/component';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'O e-mail é obrigatório'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'O e-mail é inválido'
  }

  if (!values.password) {
    errors.password = 'A senha é obrigatória';
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve conter no mínimo 6 caracteres';
  } else if (
    !/\d/.test(values.password)
    || !/[a-z]/.test(values.password)
    || !/[A-Z]/.test(values.password)) {
    errors.password = 'A senha deve conter pelo menos um dígito, um caractere maiúsculo e um minúsculo';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'A confirmação de senha é obrigatória'
  } else if (values.password && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'A confirmação de senha é diferente da senha'
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
  const { handleSubmit, isFetching } = props;

  return (
    <div className="container">
      <h2 className="text-center pt-5">Novo Cadastro</h2>
      <form className="form-signin" onSubmit={handleSubmit}>
        <Field name="email" component={renderField} type="email" placeholder="usuario@gmail.com" label="E-mail" />
        <Field name="password" component={renderField} type="password" placeholder="******" label="Senha" />
        <Field name="passwordConfirmation" component={renderField} type="password" placeholder="******" label="Repetir senha" />

        <div className="d-flex justify-content-center">
          <Link to="/login">
            <button type="button" className="btn btn-secondary m-3">Cancelar</button>
          </Link>
          <button type="submit" className="btn btn-primary m-3" disabled={isFetching}>Cadastrar</button>
        </div>
      </form>
      <Notification />
    </div>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'signup',
  validate,
})(Signup);
