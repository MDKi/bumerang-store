import { connect, connection } from 'mongoose';
import app from "./app";
import config from "./config";

// Database
connect(config.db, { useNewUrlParser: true });
const db = connection;

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
