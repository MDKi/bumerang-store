import request from 'supertest';
import app from "../app";
import Order from "../models/order";
import { connectDB, disconnectDB } from "../helpers/tests/testDB";
import newDateCheck from "../helpers/tests/newDateCheck";

describe("/api/orders/", () => {
  beforeAll(() => {
    connectDB();
    Order.create({});
  });
  afterAll(() => {
    disconnectDB();
  });
  const url = "/api/orders/";
  let testOrder;

  test("can list orders", async () => {
    await request(app)
      .get(`${url}`)
      .expect(200);
  });
  test("can post orders", async () => {
    const response = await request(app)
      .post(`${url}`)
      .send({
        person: "5bb3e1c861709f2f03d18aa4",
        products: [
          {
            product: "5bb3e1d561709f2f03d18aa5",
            quantity: 3,
            price: 13.5,
          },
          {
            product: "5bb3e1de61709f2f03d18aa6",
            quantity: 2,
            price: 33.43,
          },
        ],
      })
      .expect(200);

      testOrder = response.body;

      expect(testOrder._id).toBeDefined();
      expect(testOrder).toMatchObject({
        person: "5bb3e1c861709f2f03d18aa4",
        products: [
          {
            product: "5bb3e1d561709f2f03d18aa5",
            quantity: 3,
            price: 13.5,
          },
          {
            product: "5bb3e1de61709f2f03d18aa6",
            quantity: 2,
            price: 33.43,
          },
        ],
        __v: 0,
      });
      newDateCheck(testOrder.create_date);

      // expect(testOrder.person).toMatchObject({})
  });
  test("can get an order", async () => {
    const response = await request(app)
      .get(`${url}${testOrder._id}`)
      .expect(200);
  });
  test("can update an order", async () => {
    const response = await request(app)
      .put(`${url}${testOrder._id}`)
      .send({})
      .expect(200);
  });
  test("can delete an order", async () => {
    const response = await request(app)
      .delete(`${url}${testOrder._id}`)
      .expect(200);
  });
});
