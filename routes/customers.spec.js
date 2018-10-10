const request = require('supertest');
const app = require("../app.js");
const { connectDB, disconnectDB } = require("../helpers/tests/testDB.js");
const newDateCheck = require("../helpers/tests/newDateCheck.js");

describe("/api/customers", () => {
  beforeAll(() => {
    connectDB();
  });
  afterAll(() => {
    disconnectDB();
  });
  const url = "/api/customers/";
  let testCustomer = {};

  describe("can list customers", () => {
    test("can list ALL customers", async () => {
      await request(app)
        .get(url)
        .expect(200);
    });
    test("can list individual customers", async () => {
      await request(app)
        .get(`${url}/individuals/`)
        .expect(200);
    });
    test("can list organization customers", async () => {
      await request(app)
        .get(`${url}/organizations/`)
        .expect(200);
    });
  });

  describe("can post customers", () => {
    test("can post an individual", async () => {
      expect.assertions(7);
      const response = await request(app)
        .post(`${url}/individuals/`)
        .send({
          email: "individual@email.com",
          address: [{
            street: "individualSt",
            number: "indStNumber",
            neighborhood: {
              neighborhood: "individualNbh",
              block: "individualBlock",
              house: "indHouse",
            },
            zipCode: "indZip",
            city: "indCity",
            department: "indDep",
            province: "indProv",
          }],
          phone: [{
            areaCode: "indAreaCode",
            number: "indPhone",
          }],
          name: "EL INDIVIDUO",
          lastName: "INDIVIDUOSO",
          DNI: "11.123.321", // Definitely not an IP address...

          // Organization fields (should not appear)
          CUIT: "UN CUIT",
          fantasyName: "JS IS ONLY USED ON BROWSERS (C) 1996",

          garbageAtr: "this should be discarded"
        })
        .expect(200);

      testCustomer.individual = response.body;

      expect(testCustomer.individual._id).toBeDefined();
      expect(testCustomer.individual).toMatchObject({
        email: "individual@email.com",
        address: [{
          street: "individualSt",
          number: "indStNumber",
          neighborhood: {
            neighborhood: "individualNbh",
            block: "individualBlock",
            house: "indHouse",
          },
          zipCode: "indZip",
          city: "indCity",
          department: "indDep",
          province: "indProv",
        }],
        phone: [{
          areaCode: "indAreaCode",
          number: "indPhone",
        }],
        name: "EL INDIVIDUO",
        lastName: "INDIVIDUOSO",
        DNI: "11.123.321",


        __v: 0,
        isActive: true,
      });


      newDateCheck(testCustomer.individual.create_date);

      expect(testCustomer.individual.CUIT).not.toBeDefined();
      expect(testCustomer.individual.fantasyName).not.toBeDefined();

      expect(testCustomer.individual.garbageAtr).not.toBeDefined();
    });

    test("can post an organization", async () => {
      expect.assertions(8);
      const response = await request(app)
        .post(`${url}/organizations/`)
        .send({
          email: "org@email.com",
          address: [{
            street: "orgSt",
            number: "orgStN",
            neighborhood: {
              neighborhood: "orgNbh",
              block: "orgBlock",
              house: "orgH",
            },
            zipCode: "orgZIP",
            city: "CORP CITY",
            department: "CORP DEF NOT A CITY",
            province: "CORP NOT A STATE",
          }],
          phone: [{
            areaCode: "eleven",
            number: "82i5",
          }],
          // Individual fields (should not appear)
          name: "EL INDIVIDUO",
          lastName: "INDIVIDUOSO",
          DNI: "11.123.321",

          // Organization fields
          CUIT: "UN CUIT",
          fantasyName: "JS IS ONLY USED ON BROWSERS (C) 1996",

          garbageAtr: "this should be discarded"

        })
        .expect(200);

      testCustomer.organization = response.body;

      expect(testCustomer.organization._id).toBeDefined();
      expect(testCustomer.organization).toMatchObject({
        email: "org@email.com",
        address: [{
          street: "orgSt",
          number: "orgStN",
          neighborhood: {
            neighborhood: "orgNbh",
            block: "orgBlock",
            house: "orgH",
          },
          zipCode: "orgZIP",
          city: "CORP CITY",
          department: "CORP DEF NOT A CITY",
          province: "CORP NOT A STATE",
        }],
        phone: [{
          areaCode: "eleven",
          number: "82i5",
        }],
        CUIT: "UN CUIT",
        fantasyName: "JS IS ONLY USED ON BROWSERS (C) 1996",



        __v: 0,
        isActive: true,
      });

      newDateCheck(testCustomer.organization.create_date);

      expect(testCustomer.organization.name).not.toBeDefined();
      expect(testCustomer.organization.lastName).not.toBeDefined();
      expect(testCustomer.organization.DNI).not.toBeDefined();

      expect(testCustomer.organization.garbageAtr).not.toBeDefined();
    });
  });

  describe("can get a customer", async () => {
    test("can get an individual customer", async () => {
      const response = await request(app)
        .get(`${url}${testCustomer.individual._id}`)
        .expect(200);
      expect(response.body).toEqual(testCustomer.individual);
    });
    test("can get an organization customer", async () => {
      const response = await request(app)
        .get(`${url}${testCustomer.organization._id}`)
        .expect(200);
      expect(response.body).toEqual(testCustomer.organization);
    });
  });

  // To do
  describe("can update a single customer", () => {
    test("can updante an individual customer", async () => {
      const response = await request(app)
        .put(`${url}${testCustomer.individual._id}`)
        .send({})
        .expect(200);
      expect(response.body).toMatchObject({});
    });
    test("can updante an organization customer", async () => {
      const response = await request(app)
        .put(`${url}${testCustomer.organization._id}`)
        .send({})
        .expect(200);
      expect(response.body).toMatchObject({});
    });
  })

  describe("can delete a customer", () => {
    test("can delete an individual", async () => {
      const response = await request(app)
        .delete(`${url}${testCustomer.individual._id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        // _id: testCustomer.individual._id,
        // isActive: false,
        n: 1, ok: 1,
      });
    })
    test("can delete an organization", async () => {
      const response = await request(app)
        .delete(`/api/customers/${testCustomer.organization._id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        // _id: testCustomer.organization._id,
        // isActive: false,
        n: 1, ok: 1,
      });
    });

  })

});
