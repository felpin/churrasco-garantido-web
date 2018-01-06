export default (value) => {
  if (!value) {
    return value;
  }

  const cnpjNumbers = value.replace(/[^\d]/g, '');
  const cnpjLength = cnpjNumbers.length;

  if (cnpjLength <= 2) {
    return cnpjNumbers;
  }

  let cnpjWithSeparations = `${cnpjNumbers.slice(0, 2)}.${cnpjNumbers.slice(2, 5)}`;
  if (cnpjLength <= 5) {
    return cnpjWithSeparations;
  }

  cnpjWithSeparations += `.${cnpjNumbers.slice(5, 8)}`;
  if (cnpjLength <= 8) {
    return cnpjWithSeparations;
  }

  cnpjWithSeparations += `/${cnpjNumbers.slice(8, 12)}`;
  if (cnpjLength <= 12) {
    return cnpjWithSeparations;
  }

  cnpjWithSeparations += `-${cnpjNumbers.slice(12, 14)}`;
  return cnpjWithSeparations;
}
