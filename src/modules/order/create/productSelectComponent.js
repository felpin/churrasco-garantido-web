import React from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};

  if (!values.product) {
    errors.product = 'A seleção do produto é obrigatória';
  }

  if (!values.quantity) {
    errors.quantity = 'A quantidade é obrigatória';
  } else if (!/^[\d]+$/g.test(values.quantity)) {
    errors.quantity = 'Apenas dígitos são permitidos';
  } else if (values.quantity <= 0) {
    errors.quantity = 'A quantidade deve ser maior que 0';
  }

  return errors;
};

const renderSelect = ({ input, name, meta: { touched, error }, children }) => (
  <select {...input} id={name} className={`form-control custom-select${(touched && error ? ' border-danger' : '')}`}>
    {children}
  </select>
);

renderSelect.propTypes = {
  ...propTypes,
};

const renderProductQuantity = ({ input, name, meta: { touched, error } }) => (
  <input {...input} id={name} className={`col-sm-1 form-control${(touched && error ? ' border-danger' : '')}`} type="number" min="1" />
);

renderProductQuantity.propTypes = {
  ...propTypes,
};

const ProductSelect = ({ handleSubmit, products, reset }) => {
  const SELECT_PRODUCT_NAME = 'product';
  const PRODUCT_QUANTITY_NAME = 'quantity';

  const productsSorted = products.sort((a, b) => a.localeCompare(b));

  const handleSubmitAndResetForm = (submitData) => {
    handleSubmit(submitData);
    reset();
  };

  return (
    <form className="form-add-product form-inline" onSubmit={handleSubmitAndResetForm}>
      <label htmlFor={SELECT_PRODUCT_NAME} className="col-sm-1 offset-sm-2">Produto:</label>
      <Field name={SELECT_PRODUCT_NAME} component={renderSelect}>
        <option value="">Selecione um produto...</option>
        {productsSorted.map(product => <option key={product} value={product}>{product}</option>)}
      </Field>

      <label htmlFor={PRODUCT_QUANTITY_NAME} className="col-sm-1">Quantidade:</label>
      <Field name={PRODUCT_QUANTITY_NAME} component={renderProductQuantity} />

      <button type="submit" className="btn btn-primary ml-3">Adicionar</button>
    </form>
  );
};

ProductSelect.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.string).isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'addProductToOrder',
  validate,
})(ProductSelect);
