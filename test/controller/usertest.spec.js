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

describe("#UserController", () => {
  describe("createUser - create a user", () => {
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

    // Context for creating user successfully
    context("creating user successfully", () => {
      for (let i = 0; i < positiveTestCases.length; i++) {
        const testCase = positiveTestCases[i];

        // Check if the test case is positive
        if (testCase.case == "positive") {
          describe(testCase.description, () => {
            beforeEach(() => {
              userSerivceStub.createUser.resolves(cloneDeep(testCase.mockData));
            });

            it(testCase.description, (done) => {
              const req = {
                body: testCase.requestBody,
              };

              userController
                .createUsers(cloneDeep(req), res)
                .then((res) => {
                  // Expectations for successful user creation
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
                    "createUser was not called with the correct req.body (you change body)"
                  ).to.be.equal(true);

                  done();
                })
                .catch((err) => {
                  done(err);
                });
            });

            afterEach(() => {
              sinon.restore();
            });
          });
        } else {
          // Context for checking if the request body is valid
          describe("Check if request body is valid", () => {
            it(testCase.description, (done) => {
              const req = {
                body: testCase.requestBody,
              };
              userController
                .createUsers(req, res, next)
                .then((res) => {
                  // Expectations for invalid request body
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

    // Describe for checking if the service rejects
    describe("Check if service rejects", () => {
      beforeEach(() => {
        const err = new Error("unexpected error in create user");
        userSerivceStub.createUser.throws(err);
      });

      it("error occurs in service", (done) => {
        const req = {
          body: {
            firstName: "akshay",
            lastName: "pawar",
            email: "akshay@gmail.com",
          },
        };
        userController
          .createUsers(req, res, next)
          .then((res) => {
            if (!res.data) {
              throw new Error("service error");
            }
            // Expectations for service rejection
            const expectedStatusCode = 500;
            const expectedErrorMessage = "unexpected error in create user";
            const actualStatusCode = res.statusCode;
            const actualErrorMessage = res.data.message;

            expect(actualStatusCode).to.equal(expectedStatusCode);
            expect(actualErrorMessage).to.equal(expectedErrorMessage);

            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
