const getAll = (Model, isActive = true, onceFound = async items => items) => async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  let [query, projection, options] = [{}, {}, {}];

  // This and the second parameter are a dirty solution to my inability
  // to access the context I need to.
  if (isActive) {
    query = req.query.isActive ? { isActive: true } : {};
  }
  else {
    query = req.query || {};
  }
  options = { ...options, limit, skip }

  const items = await onceFound(Model.find(query, projection, options));
  res.json(items);
};

module.exports = getAll;
