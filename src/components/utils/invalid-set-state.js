exports.invalidSetState = ({ curState, fieldName }) => {
  const { errs } = JSON.parse(JSON.stringify(curState));
  errs[fieldName] = { isValidated: false, message: `Invalid ${fieldName}` };

  return {
    ...curState,
    errs,
  };
};
