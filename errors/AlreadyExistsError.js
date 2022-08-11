class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.code = 'alreadyExists'
  }
}

module.exports = AlreadyExistsError;