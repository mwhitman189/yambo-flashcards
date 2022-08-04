const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./index");

let userOneProfile = {
  email: "userOne@gmail.com",
  password: "01.SuperSecret",
};

let userTwoProfile = {
  email: "userTwo@gmail.com",
  password: "01.SuperDuperSecret",
};

let userOneDeckOne = {
  title: "User One Deck One",
  description: "This is deck one",
};
let userOneDeckOneEdit = {
  title: "User One Deck One Edit",
  description: "This is edited deck one",
};
// deckId's for cards are added within response bodies
let userOneDeckOneCardOne = {
  card: {
    front: "Card 1",
    back: "Back 1",
  },
};
let userOneDeckOneCardOneEdit = {
  front: "Card 1 edit",
  back: "Back 1 edit",
};
let userOneDeckOneCardBatch = {
  cards: [
    {
      front: "Card 2",
      back: "Back 2",
    },
    {
      front: "Card 3",
      back: "Back 3",
    },
    {
      front: "Card 4",
      back: "Back 4",
    },
    {
      front: "Card 5",
      back: "Back 5",
    },
  ],
};

let userOneDeckTwo = {
  title: "User One Deck Two",
  description: "This is deck two",
};
let userOneDeckTwoEdit = {
  title: "User One Deck Two Edit",
  description: "This is edited deck two",
};
let userOneDeckTwoCardOne = {
  card: {
    front: "Card 1",
    back: "Back 1",
  },
};
let userOneDeckTwoCardOneEdit = {
  front: "Card 1 edit",
  back: "Back 1 edit",
};
let userOneDeckTwoCardBatch = {
  cards: [
    {
      front: "Card 2",
      back: "Back 2",
    },
    {
      front: "Card 3",
      back: "Back 3",
    },
    {
      front: "Card 4",
      back: "Back 4",
    },
    {
      front: "Card 5",
      back: "Back 5",
    },
  ],
};

let userTwoDeckOne = {
  title: "User Two Deck One",
  description: "This is deck one",
};
let userTwoDeckOneEdit = {
  title: "User Two Deck One Edit",
  description: "This is edited deck one",
};

let userTwoDeckTwo = {
  title: "User Two Deck Two",
  description: "This is deck two",
};
let userTwoDeckTwoEdit = {
  title: "User Two Deck Two Edit",
  description: "This is edited deck two",
};

let userTwoDeckThreeCopyUserOneDeckOne = {
  title: "User One Deck One",
  description: "This is deck one",
};

let userOneToken;
let userOneId;
let userTwoToken;
let userTwoId;

let userOneDeckIdOne;
let userOneDeckIdTwo;
let userTwoDeckIdOne;
let userTwoDeckIdTwo;

let userOneDeckOneCardIdOne;
let userOneDeckTwoCardIdOne;

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});

describe("Start User One API", () => {
  it("POST /signup => Create User One account", async () => {
    return await request(app)
      .post("/user/signup")
      .send(userOneProfile)
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
        userOneId = res.body.user._id;
      });
  });

  it("POST /login => Login User One", async () => {
    return await request(app)
      .post("/user/login")
      .send(userOneProfile)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              decks: expect.arrayContaining([]),
              _id: userOneId,
              __v: expect.any(Number),
            }),
            token: expect.any(String),
          })
        );
        userOneToken = res.body.token;
      });
  });

  it("GET / => Get User One", async () => {
    return await request(app)
      .get(`/user`)
      .set("Authorization", `Bearer ${userOneToken}`)
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

// describe("Start User Two API", () => {
//   it("POST /signup => Create User Two account", async () => {
//     return await request(app)
//       .post("/user/signup")
//       .send(userTwoProfile)
//       .expect("Content-Type", /json/)
//       .expect(201)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             user: expect.objectContaining({
//               decks: expect.arrayContaining([]),
//               _id: expect.any(String),
//               __v: expect.any(Number),
//             }),
//             token: expect.any(String),
//           })
//         );
//         userTwoId = res.body.user._id;
//       });
//   });

//   it("POST /login => Login User Two", async () => {
//     return await request(app)
//       .post("/user/login")
//       .send(userTwoProfile)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             user: expect.objectContaining({
//               decks: expect.arrayContaining([]),
//               _id: userTwoId,
//               __v: expect.any(Number),
//             }),
//             token: expect.any(String),
//           })
//         );
//         userTwoToken = res.body.token;
//       });
//   });

//   it("GET / => Get User Two", async () => {
//     return await request(app)
//       .get(`/user`)
//       .set("Authorization", `Bearer ${userTwoToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             decks: expect.arrayContaining([]),
//             _id: userTwoId,
//             __v: expect.any(Number),
//           })
//         );
//       });
//   });
// });

describe("Create, get, patch, get User One Deck One", () => {
  it("POST /deck => Create User One Deck One", async () => {
    return await request(app)
      .post("/deck")
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckOne)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOne.title,
            description: userOneDeckOne.description,
            _id: expect.any(String),
          })
        );
        userOneDeckIdOne = res.body._id;
        userOneDeckOneCardOne.deckId = res.body._id;
        userOneDeckOneCardBatch.deckId = res.body._id;
      });
  });

  it("GET /deck/:id => Get User One Deck One", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOne.title,
            description: userOneDeckOne.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("PATCH /deck/:id => Patch User One Deck One", async () => {
    return await request(app)
      .patch(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckOneEdit)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOneEdit.title,
            description: userOneDeckOneEdit.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck One", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).not.toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOne.title,
            description: userOneDeckOne.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck One", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOneEdit.title,
            description: userOneDeckOneEdit.description,
            _id: expect.any(String),
          })
        );
      });
  });
});

describe("Create, get, patch, get User One Deck Two", () => {
  it("POST /deck => Create User One Deck Two", async () => {
    return await request(app)
      .post("/deck")
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckTwo)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckTwo.title,
            description: userOneDeckTwo.description,
            _id: expect.any(String),
          })
        );
        userOneDeckIdTwo = res.body._id;
        userOneDeckTwoCardOne.deckId = res.body._id;
        userOneDeckTwoCardBatch.deckId = res.body._id;
      });
  });

  it("GET /deck/:id => Get User One Deck Two", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckTwo.title,
            description: userOneDeckTwo.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("PATCH /deck/:id => Patch User One Deck Two", async () => {
    return await request(app)
      .patch(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckTwoEdit)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckTwoEdit.title,
            description: userOneDeckTwoEdit.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck Two", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).not.toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckOne.title,
            description: userOneDeckOne.description,
            _id: expect.any(String),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck Two", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([]),
            user: userOneId,
            title: userOneDeckTwoEdit.title,
            description: userOneDeckTwoEdit.description,
            _id: expect.any(String),
          })
        );
      });
  });
});

describe("Add card and edit card User One Deck One", () => {
  it("POST /card => Create User One Deck One Card One", async () => {
    return await request(app)
      .post("/card")
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckOneCardOne)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckOneCardOne.card.front,
                back: userOneDeckOneCardOne.card.back,
                deck: userOneDeckIdOne,
                user: userOneId,
                _id: expect.any(String),
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckOneEdit.title,
            description: userOneDeckOneEdit.description,
            _id: userOneDeckIdOne,
            __v: expect.any(Number),
          })
        );
        userOneDeckOneCardIdOne = res.body.cards[0]._id;
      });
  });

  it("GET /deck/:id => Get User One Deck One", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: userOneDeckIdOne,
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckOneCardOne.card.front,
                back: userOneDeckOneCardOne.card.back,
                deck: userOneDeckIdOne,
                user: userOneId,
                _id: userOneDeckOneCardIdOne,
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckOneEdit.title,
            description: userOneDeckOneEdit.description,
            __v: expect.any(Number),
          })
        );
      });
  });

  it("PATCH /card/:id Patch User One Deck One Card One", async () => {
    return await request(app)
      .patch(`/card/${userOneDeckOneCardIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckOneCardOneEdit)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            front: userOneDeckOneCardOneEdit.front,
            back: userOneDeckOneCardOneEdit.back,
            deck: userOneDeckIdOne,
            user: userOneId,
            _id: userOneDeckOneCardIdOne,
            __v: expect.any(Number),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck One", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: userOneDeckIdOne,
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckOneCardOneEdit.front,
                back: userOneDeckOneCardOneEdit.back,
                deck: userOneDeckIdOne,
                user: userOneId,
                _id: userOneDeckOneCardIdOne,
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckOneEdit.title,
            description: userOneDeckOneEdit.description,
            __v: expect.any(Number),
          })
        );
      });
  });
});

describe("Add card and edit card User One Deck Two", () => {
  it("POST /card => Create User One Deck Two Card One", async () => {
    return await request(app)
      .post("/card")
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckTwoCardOne)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckTwoCardOne.card.front,
                back: userOneDeckTwoCardOne.card.back,
                deck: userOneDeckIdTwo,
                user: userOneId,
                _id: expect.any(String),
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckTwoEdit.title,
            description: userOneDeckTwoEdit.description,
            _id: userOneDeckIdTwo,
            __v: expect.any(Number),
          })
        );
        userOneDeckTwoCardIdOne = res.body.cards[0]._id;
      });
  });

  it("GET /deck/:id => Get User One Deck Two", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: userOneDeckIdTwo,
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckTwoCardOne.card.front,
                back: userOneDeckTwoCardOne.card.back,
                deck: userOneDeckIdTwo,
                user: userOneId,
                _id: userOneDeckTwoCardIdOne,
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckTwoEdit.title,
            description: userOneDeckTwoEdit.description,
            __v: expect.any(Number),
          })
        );
      });
  });

  it("PATCH /card/:id Patch User One Deck Two Card One", async () => {
    return await request(app)
      .patch(`/card/${userOneDeckTwoCardIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .send(userOneDeckTwoCardOneEdit)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            front: userOneDeckTwoCardOneEdit.front,
            back: userOneDeckTwoCardOneEdit.back,
            deck: userOneDeckIdTwo,
            user: userOneId,
            _id: userOneDeckTwoCardIdOne,
            __v: expect.any(Number),
          })
        );
      });
  });

  it("GET /deck/:id => Get User One Deck Two", async () => {
    return await request(app)
      .get(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: userOneDeckIdTwo,
            cards: expect.arrayContaining([
              expect.objectContaining({
                front: userOneDeckTwoCardOneEdit.front,
                back: userOneDeckTwoCardOneEdit.back,
                deck: userOneDeckIdTwo,
                user: userOneId,
                _id: userOneDeckTwoCardIdOne,
                __v: expect.any(Number),
              }),
            ]),
            user: userOneId,
            title: userOneDeckTwoEdit.title,
            description: userOneDeckTwoEdit.description,
            __v: expect.any(Number),
          })
        );
      });
  });
});

// describe("Create, get, patch, get User One Deck Two", () => {
//   it("POST /deck => Create User Two Deck Two", async () => {
//     return await request(app)
//       .post("/deck")
//       .set("Authorization", `Bearer ${userOneToken}`)
//       .send(userOneDeckTwo)
//       .expect("Content-Type", /json/)
//       .expect(201)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             cards: expect.arrayContaining([]),
//             user: userOneId,
//             title: userOneDeckTwo.title,
//             description: userOneDeckTwo.description,
//             _id: expect.any(String),
//           })
//         );
//         userOneDeckIdTwo = res.body._id;
//       });
//   });

//   it("GET /deck/:id => Get User One Deck Two", async () => {
//     return await request(app)
//       .get(`/deck/${userOneDeckIdTwo}`)
//       .set("Authorization", `Bearer ${userOneToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             cards: expect.arrayContaining([]),
//             user: userOneId,
//             title: userOneDeckTwo.title,
//             description: userOneDeckTwo.description,
//             _id: expect.any(String),
//           })
//         );
//       });
//   });

//   it("PATCH /deck/:id => Patch User One Deck Two", async () => {
//     return await request(app)
//       .patch(`/deck/${userOneDeckIdTwo}`)
//       .set("Authorization", `Bearer ${userOneToken}`)
//       .send(userOneDeckTwoEdit)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             cards: expect.arrayContaining([]),
//             user: userOneId,
//             title: userOneDeckTwoEdit.title,
//             description: userOneDeckTwoEdit.description,
//             _id: expect.any(String),
//           })
//         );
//       });
//   });

//   it("GET /deck/:id => Get User One Deck Two", async () => {
//     return await request(app)
//       .get(`/deck/${userOneDeckIdTwo}`)
//       .set("Authorization", `Bearer ${userOneToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).not.toEqual(
//           expect.objectContaining({
//             cards: expect.arrayContaining([]),
//             user: userOneId,
//             title: userOneDeckTwo.title,
//             description: userOneDeckTwo.description,
//             _id: expect.any(String),
//           })
//         );
//       });
//   });

//   it("GET /deck/:id => Get User One Deck Two", async () => {
//     return await request(app)
//       .get(`/deck/${userOneDeckIdTwo}`)
//       .set("Authorization", `Bearer ${userOneToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             cards: expect.arrayContaining([]),
//             user: userOneId,
//             title: userOneDeckTwoEdit.title,
//             description: userOneDeckTwoEdit.description,
//             _id: expect.any(String),
//           })
//         );
//       });
//   });
// });

describe("Clean Up All APIs", () => {
  it("DELETE /card => Delete User One Deck One Card One", async () => {
    return await request(app)
      .delete(`/card/${userOneDeckOneCardIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect(200);
  });

  it("DELETE /card => Delete User One Deck One Card Two", async () => {
    return await request(app)
      .delete(`/card/${userOneDeckTwoCardIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect(200);
  });

  it("DELETE /deck/:id => Delete User One Deck One", async () => {
    return await request(app)
      .delete(`/deck/${userOneDeckIdOne}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect(200);
  });

  it("DELETE /deck/:id => Delete User One Deck Two", async () => {
    return await request(app)
      .delete(`/deck/${userOneDeckIdTwo}`)
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect(200);
  });

  // it("DELETE /deck/:id => Delete User One Deck Two", async () => {
  //   return await request(app)
  //     .delete(`/deck/${userOneDeckIdTwo}`)
  //     .set("Authorization", `Bearer ${userOneToken}`)
  //     .expect(200);
  // });

  it("DELETE / => Delete User One", async () => {
    return await request(app)
      .delete("/user")
      .set("Authorization", `Bearer ${userOneToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            decks: expect.arrayContaining([]),
            _id: userOneId,
            __v: expect.any(Number),
          })
        );
      });
  });
  // it("DELETE / => Delete User Two", async () => {
  //   return await request(app)
  //     .delete("/user")
  //     .set("Authorization", `Bearer ${userTwoToken}`)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           decks: expect.arrayContaining([]),
  //           _id: userTwoId,
  //           __v: expect.any(Number),
  //         })
  //       );
  //     });
  // });
});
