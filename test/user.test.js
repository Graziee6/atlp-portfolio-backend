const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("User tests", () => {
  /**
   * Test user's get api
   *  */
  describe("GET api/users/", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/user")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    /**
     * Test user's get by id api
     *  */
    describe("GET api/users/:id/", () => {
      it("It should GET a user by id", (done) => {
        const userId = "6274c93dd36636e2acccefb2";
        chai
          .request(server)
          .get("/api/users/" + userId)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            done();
          });
      });
    });
    /**
     * Test user's post api
     *  */
    describe("POST api/users/signup", () => {
      it("It should POST a user", (done) => {
        const user = {
          username: "grace",
          email: "grace1@gmail.com",
          password: "graced7",
        };
        chai
          .request(server)
          .post("/api/users")
          .send(user)
          .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.should.have.property("username").eq("grace");
            response.should.have.property("email").eq("grace1@gmail.com");
            response.should.have.property("password").eq("graced7");
            done();
          });
      });
    });
    /**
     * Test user's update api
     *  */
    describe("PUT api/users/:id", () => {
      it("It should PUT a user", (done) => {
        const userId = "6274c93dd36636e2acccefb2";
        chai
          .request(server)
          .put("/api/users/" + userId)

          .end((err, response) => {
            response.should.have.status(404);
            response.body.should.be.a("object");
            response.should.have.property("username").eq("grace");
            response.should.have.property("email").eq("grace1@gmail.com");
            response.should.have.property("password").eq("graced7");
            done();
          });
      });
    });
    /**
     * Test user's delete api
     *  */
    describe("DELETE api/users/:id", () => {
      it("It should DELETE a user", (done) => {
        const userId = "6274c93dd36636e2acccefb2";
        chai
          .request(server)
          .delete("/api/users/" + userId)

          .end((err, response) => {
            response.should.have.status(204);
            done();
          });
      });
    });
  });
});
