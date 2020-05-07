export const parseError = (err) => {
  console.log('!!!!', err);
  if (err.isJoi) { return err.details[0]; }
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const statusAnswer = (error, status, text, value = '') => ({
  error, status, text, value,
});
