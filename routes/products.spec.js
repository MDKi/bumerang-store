const request = require('supertest');
const app = require("../index.js");

describe("/api/products", () => {
  const url = "/api/products/";
  let testProduct;
  test("can list products", async () => {
    await request(app)
      .get(url)
      .expect(200);
  });
  test("can post a product", async () => {
    const response = await request(app)
      .post(url)
      .send({
        name: "testProduct"
      })
      .expect(200);

    testProduct = response.body;

    expect(testProduct._id).toBeDefined();
    expect(testProduct).toMatchObject({
      name: "testProduct",
      __v: 0,
      isActive: true,
    });

    const now = new Date().toJSON();
    const fiveSecondsAgo = new Date(Date.now() - 5000).toJSON();
    expect(testProduct.create_date < now).toBe(true);
    expect(testProduct.create_date > fiveSecondsAgo).toBe(true);
  });
  test("can get a product", async () => {
    const response = await request(app)
      .get(`${url}${testProduct._id}`)
      .expect(200);
    expect(response.body).toEqual(testProduct);
  });
  test("can update a product", async () => {
    const response = await request(app)
      .put(`${url}${testProduct._id}`)
      .send({
        name: "modifiedTestProduct"
      })
      .expect(200);
    expect(response.body).toMatchObject({
      _id: testProduct._id,
      name: "modifiedTestProduct",

      __v: testProduct.__v,
      isActive: testProduct.isActive,
      create_date: testProduct.create_date
    })
  });
  test("can delete a product", async () => {
    const response = await request(app)
      .delete(`${url}${testProduct._id}`)
      .expect(200);

    // This is the expected behavior for now
    expect(response.body).toMatchObject({
      _id: testProduct._id,
      name: "modifiedTestProduct",

      __v: testProduct.__v,
      isActive: false,
      create_date: testProduct.create_date
    })
  });
});
