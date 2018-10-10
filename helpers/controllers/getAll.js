const defaultFindArgs = (req, res) => ({query: {}, projection: {}, options: {}});
const defaultOnceFound = async items => items;

const getAll = (Model, findArgs = defaultFindArgs, onceFound = defaultOnceFound) => async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;

  const {query, projection, options: configObject} = findArgs(req, res);
  const options = { ...configObject, limit, skip };

  const items = await onceFound(Model.find(query, projection, options));
  res.json(items);
};

module.exports = getAll;
