const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./../index");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("User tests", () => {
  /**
   * Test user's get api
   *  */
  describe("GET api/users", () => {
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

    /**
     * Test user's post api
     *  */

    /**
     * Test user's update api
     *  */

    /**
     * Test user's delete api
     *  */
  });
});
