const sinon = require("sinon");
const proxyquire = require("proxyquire");
const { expect } = require("chai");
const { cloneDeep } = require("lodash");
const positiveTestCases = require("../../positiveCase");
const userSerivceStub = {
  createUser: sinon.stub(),
  updateUser: sinon.stub(),
  deleteUser: sinon.stub(),
  getUserById: sinon.stub(),
};

const next = function (error, result) {
  if (error) throw error;
  return result;
};
const userController = proxyquire("../../component/user/userController", {
  "../user/userService": userSerivceStub,
});
describe("#UserController ", () => {
  describe(" createUser - create a user", () => {
    const res = {
      statusCode: null,
      data: [],
      headers: {},
      set: (field, value) => {
        res.headers[field] = value;
        return res;
      },
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        res.data = data;
        return res;
      },
      send: (data) => {
        res.data = data;
        return res;
      },
    };
    context("creating user successfully", () => {
      for (let i = 0; i < positiveTestCases.length; i++) {
        const testCase = positiveTestCases[i];
        if (testCase.case == "positive") {
          describe(testCase.description, () => {
            beforeEach(() => {
              userSerivceStub.createUser.resolves(cloneDeep(testCase.mockData));
            });

            it(testCase.description, (done) => {
              const req = {
                body: testCase.requestBody,
              };

              const res = {
                statusCode: null,
                data: null,
                headers: {},

                status: (code) => {
                  res.statusCode = code;
                  return res;
                  i;
                },

                send: (data) => {
                  res.data = data;
                  return res;
                },
              };

              userController
                .createUsers(cloneDeep(req), res)
                .then((res) => {
                  expect(res.data, "Incorrect response data").to.deep.equal(
                    testCase.mockData
                  );
                  expect(res.statusCode, "Incorrect status code").to.be.equal(
                    testCase.status
                  );
               
                  const actualErrorMessage = res.data.message;
                  const expectedErrorMessage = testCase.expectedErrorMessage;
                  expect(actualErrorMessage).to.equal(expectedErrorMessage);
                  
                  const result = userSerivceStub.createUser.calledWith(
                    req.body
                  );
                  expect(
                    result,
                    "createUser was not called with the correct arguments"
                  ).to.be.equal(true);
                  done();
                })  
                .catch((err) => {
                  done(err);
                })
                .catch((err) => {
                  done(`Error in createUsers promise: ${err}`);
                });
            });

            afterEach(() => {
              sinon.restore();
            });
          });
        } else {
          describe("Check if request body is valid", () => {
            it(testCase.description, (done) => {
              const req = {
                body: testCase.requestBody,
              };
              userSerivceStub.createUser.throws(new Error("user service for create user rejected"));
              userController
                .createUsers(req, res, next)
                .then((res) => {
                  const expectedStatusCode = testCase.status;
                  const actualStatusCode = res.statusCode;

                  const actualErrorMessage = res.data.message;
                  const expectedErrorMessage = testCase.expectedErrorMessage;

                  expect(actualStatusCode).to.equal(expectedStatusCode);
                  expect(actualErrorMessage).to.equal(expectedErrorMessage);
                  done();
                })
                .catch((err) => {
                  done(err);
                });
            });
          });
        }
      }
    });








    // describe("Check if service reject", () => {
    //   it("dhsagdhsag", (done) => {
    //     const req = {
    //      body:{
    //       firstName:"akshay",
    //       lastName:"pawar",
    //       email:"akshay@gmail.com"
        
    //      }
    //     };
    //     userSerivceStub.createUser.rejects(new Error("unexpected error in create user"));
    //     userController
    //       .createUsers(req, res, next)
    //       .then((res) => {
    //         console.log(res);
    //         // const expectedStatusCode = testCase.status;
    //         // const actualStatusCode = res.statusCode;

    //         // const actualErrorMessage = res.data.message;
    //         // const expectedErrorMessage = testCase.expectedErrorMessage;

    //         // expect(actualStatusCode).to.equal(expectedStatusCode);
    //         // expect(actualErrorMessage).to.equal(expectedErrorMessage);
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });
    // });




  });
});
