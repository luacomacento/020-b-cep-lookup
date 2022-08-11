class NotCreatedError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.code = 'notCreated'
  }
}

module.exports = NotCreatedError;