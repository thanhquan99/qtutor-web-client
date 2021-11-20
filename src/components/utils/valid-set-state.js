exports.validSetState = ({ curState, fieldName, value }) => {
  const { errs, payload } = JSON.parse(JSON.stringify(curState));
  payload[fieldName] = value;
  errs[fieldName] = { isValidated: true, message: undefined };

  return {
    ...curState,
    payload,
    errs,
  };
};
