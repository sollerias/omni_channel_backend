const statusAnswer = (error, status, text, value = '') => ({
  error, status, text, value,
});

module.exports = {
  statusAnswer,
};
