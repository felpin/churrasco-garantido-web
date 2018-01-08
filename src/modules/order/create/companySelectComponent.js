import React from 'react';
import PropTypes from 'prop-types';

const CompanySelect = ({ companies, onChange, selected, showCompanyRequired }) => {
  const companiesSorted = companies.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <form className="form-inline mb-3">
      <label htmlFor="companySelect" className="col-sm-1 offset-sm-2">Empresa:</label>
      <select id="companySelect" className={`col-sm-3 custom-select${showCompanyRequired ? ' border-danger' : ''}`} value={selected} onChange={onChange}>
        <option value="">Selecione uma empresa...</option>
        {companiesSorted.map(({ name, cnpj }) => <option key={cnpj} value={cnpj}>{name}</option>)}
      </select>
      {showCompanyRequired
        && <span className="ml-2 text-danger">É necessário escolher uma empresa</span>}
    </form>
  );
};

CompanySelect.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cnpj: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  showCompanyRequired: PropTypes.bool.isRequired,
};

export default CompanySelect;
