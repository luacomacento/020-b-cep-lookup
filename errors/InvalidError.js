class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.code = 'invalidData'
  }
}

module.exports = InvalidError;