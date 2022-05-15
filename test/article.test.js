// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../index");

// //Assertion style
// chai.should();

// chai.use(chaiHttp);

// describe("Article tests", () => {
//   /**
//    * Test article's get api
//    *  */
//   describe("GET api/articles", () => {
//     it("It should GET all the articles", (done) => {
//       chai
//         .request(server)
//         .get("/api/articles/")
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a("array");
//           done();
//         });
//     });

//     it("It should NOT GET all the articles", (done) => {
//       chai
//         .request(server)
//         .get("/api/article")
//         .end((err, response) => {
//           response.should.have.status(404);
//           done();
//         });
//     });

//     /**
//      * Test article's get by id api
//      *  */

//     /**
//      * Test article's post api
//      *  */

//     /**
//      * Test article's update api
//      *  */

//     /**
//      * Test article's delete api
//      *  */
//   });
// });
