exports.invalidSetState = ({ curState, fieldName, message }) => {
  const { errs } = JSON.parse(JSON.stringify(curState));
  errs[fieldName] = {
    isValidated: false,
    message: message || `Invalid ${fieldName}`,
  };

  return {
    ...curState,
    errs,
  };
};
