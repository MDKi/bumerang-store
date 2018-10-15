const request = require('supertest');
const app = require("../app.js");
const { connectDB, disconnectDB } = require("../helpers/tests/testDB.js");
const newDateCheck = require("../helpers/tests/newDateCheck.js");

describe("/api/people", () => {
  beforeAll(() => {
    connectDB();
  });
  afterAll(() => {
    disconnectDB();
  });
  const url = "/api/people/";
  let testPerson = {};

  describe("can list people", () => {
    test("can list ALL people", async () => {
      await request(app)
        .get(url)
        .expect(200);
    });
    test("can list individual people", async () => {
      await request(app)
        .get(`${url}/individuals/`)
        .expect(200);
    });
    test("can list organization people", async () => {
      await request(app)
        .get(`${url}/organizations/`)
        .expect(200);
    });
  });

  describe("can post people", () => {
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

      testPerson.individual = response.body;

      expect(testPerson.individual._id).toBeDefined();
      expect(testPerson.individual).toMatchObject({
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


      newDateCheck(testPerson.individual.create_date);

      expect(testPerson.individual.CUIT).not.toBeDefined();
      expect(testPerson.individual.fantasyName).not.toBeDefined();

      expect(testPerson.individual.garbageAtr).not.toBeDefined();
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

      testPerson.organization = response.body;

      expect(testPerson.organization._id).toBeDefined();
      expect(testPerson.organization).toMatchObject({
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

      newDateCheck(testPerson.organization.create_date);

      expect(testPerson.organization.name).not.toBeDefined();
      expect(testPerson.organization.lastName).not.toBeDefined();
      expect(testPerson.organization.DNI).not.toBeDefined();

      expect(testPerson.organization.garbageAtr).not.toBeDefined();
    });
  });

  describe("can get a person", async () => {
    test("can get an individual person", async () => {
      const response = await request(app)
        .get(`${url}${testPerson.individual._id}`)
        .expect(200);
      expect(response.body).toEqual(testPerson.individual);
    });
    test("can get an organization person", async () => {
      const response = await request(app)
        .get(`${url}${testPerson.organization._id}`)
        .expect(200);
      expect(response.body).toEqual(testPerson.organization);
    });
  });

  // To do
  describe("can update a single person", () => {
    test("can updante an individual person", async () => {
      const response = await request(app)
        .put(`${url}${testPerson.individual._id}`)
        .send({})
        .expect(200);
      expect(response.body).toMatchObject({});
    });
    test("can updante an organization person", async () => {
      const response = await request(app)
        .put(`${url}${testPerson.organization._id}`)
        .send({})
        .expect(200);
      expect(response.body).toMatchObject({});
    });
  })

  describe("can delete a person", () => {
    test("can delete an individual", async () => {
      const response = await request(app)
        .delete(`${url}${testPerson.individual._id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        // _id: testPerson.individual._id,
        // isActive: false,
        n: 1, ok: 1,
      });
    })
    test("can delete an organization", async () => {
      const response = await request(app)
        .delete(`/api/people/${testPerson.organization._id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        // _id: testPerson.organization._id,
        // isActive: false,
        n: 1, ok: 1,
      });
    });

  })

});
