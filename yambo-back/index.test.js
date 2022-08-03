const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./index");

// let server;
// beforeAll(() => {
//   const mod = require("./");
//   server = mod.default;
// });

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});

describe("User API", () => {
  let userToken;
  let userId;
  it("POST /signup => Create User account", async () => {
    return await request(app)
      .post("/user/signup")
      .send({
        email: "user@gmail.com",
        password: "01.SuperSecret",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              decks: expect.arrayContaining([]),
              _id: expect.any(String),
              __v: expect.any(Number),
            }),
            token: expect.any(String),
          })
        );
      });
  });

  it("POST /login => Login User", async () => {
    return await request(app)
      .post("/user/login")
      .send({
        email: "user@gmail.com",
        password: "01.SuperSecret",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              decks: expect.arrayContaining([]),
              _id: expect.any(String),
              __v: expect.any(Number),
            }),
            token: expect.any(String),
          })
        );
        userToken = res.body.token;
        userId = res.body.user._id;
      });
  });

  it("GET / => Get User", async () => {
    return await request(app)
      .get(`/user`)
      .set("Authorization", `Bearer ${userToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            decks: expect.arrayContaining([]),
            _id: expect.any(String),
            __v: expect.any(Number),
          })
        );
      });
  });

  it("DELETE / => Delete User", async () => {
    return await request(app)
      .delete("/user")
      .set("Authorization", `Bearer ${userToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            decks: expect.arrayContaining([]),
            _id: expect.any(String),
            __v: expect.any(Number),
          })
        );
      });
  });
});
