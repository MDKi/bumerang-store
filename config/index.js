const defaultEnv = "development";
const env = process.env.NODE_ENV || defaultEnv;

// To prevent invalid env
switch (env) {
  case "development": // Falls through
  case "pi": // Falls through
  case "test":
    break;
  default:
    env = defaultEnv;
}
const config = require(`./${env}`);

module.exports = config;
