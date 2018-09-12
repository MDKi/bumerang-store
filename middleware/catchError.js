const catchErrors = (middleware, general, route) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    }
    catch (error) {
      next({
        route,
        general,
        error
      });
    }
  }
};

module.exports = catchErrors;
