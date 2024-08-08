// Export a function that wraps an asynchronous middleware or route handler
module.exports = (func) => (req, res, next) =>
  // Ensure the result of func is a promise
  Promise.resolve(func(req, res, next))
    // If the promise is rejected, catch the error and pass it to the next middleware
    .catch(next);
