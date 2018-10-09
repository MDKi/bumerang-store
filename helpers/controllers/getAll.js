const getAll = (Model, assignments = (assignObj, req, res) => assignObj, onceFound = items => items) => async (req, res) => {
  const [limit, page] = [5000, req.query.page];
  const skip = page * limit;
  assignmentObject = {
    query: {},
    projection: {},
    options: {}
  }
  assignmentObject = assignments(assignmentObject, req, res);
  const [query, projection, options] = [
    assignmentObject.query,
    assignmentObject.projection,
    { ...assignmentObject.options, skip, limit }
  ];

  const items = await Model.find(query, projection, options);
  items = onceFound(items);
  res.json(items);
};

module.exports = getAll;
