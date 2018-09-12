const mongoose = require('mongoose');
const app = require("./app.js");
const config = require("./config");

// Database
mongoose.connect(config.db, { useNewUrlParser: true });
const db = mongoose.connection;

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
