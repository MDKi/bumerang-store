process.env.NODE_ENV = "test";

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const app = require("../index.js");
