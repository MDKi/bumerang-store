import development from "./development";
import pi from "./pi";
import test from "./test"

const defaultEnv = "development";
const env = process.env.NODE_ENV || defaultEnv;

// To prevent invalid env
let config = development;

switch (env) {
  case "development":
    config = development;
    break;
  case "pi":
    config = pi;
    break;
  case "test":
    config = test;
    break;
}

export default config;
