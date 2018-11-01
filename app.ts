import express, { json, Request, Response } from 'express';
const app = express();

app.use(json());

import products from "./routes/products";
import people from "./routes/people";
import orders from "./routes/orders";

app.get('/api', (req: Request, res: Response) => {
  res.send('Working! 😊');
});

app.use("/api/products", products);
app.use("/api/people", people);
app.use("/api/orders", orders);

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
})

export default app; // To test with Jest
