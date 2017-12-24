const baseHeaders = {
  'Content-Type': 'application/json',
};

export default (bodyData, method = 'POST', headers) => ({
  method,
  headers: headers ? { ...baseHeaders, ...headers } : baseHeaders,
  body: JSON.stringify(bodyData),
});
