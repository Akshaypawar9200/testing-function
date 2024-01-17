const sinon = require("sinon");
const proxyquire = require("proxyquire");
const { expect } = require("chai");
const { cloneDeep } = require("lodash");
const { Op } = require("sequelize");

const userConfigStub = {
  model: {
    create: sinon.stub(),
    update: sinon.stub(),
    destroy: sinon.stub(),
    findAll: sinon.stub(),
    findOne: sinon.stub(),
  },
};

const userService = proxyquire("../../component/user/userService", {
  "../../model-config/userConfig": userConfigStub,
});

describe("#userService", () => {
  // Create User
  describe("createUser - create a user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };

    context("when creating user successfully", () => {
      beforeEach(() => {
        userConfigStub.model.create.resolves(cloneDeep(mockData));
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should create a user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };

        userService.createUser(cloneDeep(userInfo)).then((res) => {
          const expectedData = mockData;
          const actualData = res;

          expect(expectedData).to.deep.equal(actualData);

          const result = userConfigStub.model.create.calledWith(
            cloneDeep(userInfo)
          );
          expect(
            result,
            "createUser service was not called with the correct user data (you changed data)"
          ).to.be.equal(true);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    context("when an error occurs while creating", () => {
      it("should throw an error", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };

        userConfigStub.model.create.throws(
          new Error("unexpected error from db")
        );
        
        userService.createUser(userInfo).then(() => {
          done(new Error("error"));
        }).catch((err) => {
          expect(err.message).to.equal("unexpected error");
          done();
        }).catch((err) => done(err));
      });
    });
  });

  // Update User
  describe("updateUser - update a user", () => {
    const mockData = {
      id: 1,
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };

    context("when updating user successfully", () => {
      beforeEach(() => {
        userConfigStub.model.update.resolves(cloneDeep(mockData));
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should update a user", (done) => {
        const userInfo = {
          id: 1,
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        const id = 1;

        userService.updateUser(cloneDeep(userInfo), id).then((res) => {
          const expectedMessage = "user updated";
          const actualMessage = res;

          expect(expectedMessage).to.equal(actualMessage);

          const result = userConfigStub.model.update.calledWith(
            userInfo,
            { where: { id: { [Op.eq]: id } } }
          );
          expect(
            result,
            "updateUser service was not called with the correct user data (you changed data)"
          ).to.be.equal(true);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    context("when an error occurs while updating", () => {
      it("should throw an error", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        const id = 1;

        userConfigStub.model.update.throws(
          new Error("unexpected error from db")
        );
        userService.updateUser(userInfo, id).then(() => {
          done(new Error("error"));
        }).catch((err) => {
          expect(err.message).to.equal("unexpected error");
          done();
        }).catch((err) => done(err));
      });
    });
  });

  // Delete User
  describe("deleteUser - delete a user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };

    context("when deleting user successfully", () => {
      beforeEach(() => {
        userConfigStub.model.destroy.resolves(cloneDeep(mockData));
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should delete a user", (done) => {
        const id = 1;
        userService.deleteUser(cloneDeep(id)).then((res) => {
          const expectedMessage = "user deleted";
          const actualMessage = res;

          expect(expectedMessage).to.equal(actualMessage);

          const result = userConfigStub.model.destroy.calledWith({
            where: { id: { [Op.eq]: id } },
          });
          expect(
            result,
            "deleteUser service was not called with the correct user id (you changed data)"
          ).to.be.equal(true);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    context("when an error occurs while deleting", () => {
      it("should throw an error", (done) => {
        const id = 1;

        userConfigStub.model.destroy.throws(
          new Error("unexpected error from db")
        );
        userService.deleteUser(id).then(() => {
          done(new Error("error"));
        }).catch((err) => {
          expect(err.message).to.equal("unexpected error");
          done();
        }).catch((err) => done(err));
      });
    });
  });

  // Get All Users
  describe("getAllUser - all users", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    const limit = 2;
    const page = 2;

    context("when retrieving all users", () => {
      beforeEach(() => {
        userConfigStub.model.findAll.resolves(cloneDeep(mockData));
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should retrieve all users", (done) => {
        userService.getAllUser(cloneDeep(limit), page).then((res) => {
          const expectedData = mockData;
          const actualData = res;
          expect(expectedData).to.deep.equal(actualData);

          const result = userConfigStub.model.findAll.getCall(0).args;
          expect(result[0].limit).to.deep.equal(limit);
          expect(result[0].page).to.deep.equal(page);

          const results = userConfigStub.model.findAll.calledWith({
            page: page,
            limit: limit,
          });
          expect(
            results,
            "getAllUser service arguments changed (you changed data)"
          ).to.be.equal(true);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    context("when an error occurs while retrieving all users", () => {
      it("should throw an error", (done) => {
        userConfigStub.model.findAll.throws(
          new Error("unexpected error from db")
        );
        userService.getAllUser().then(() => {
          done(new Error("error"));
        }).catch((err) => {
          expect(err.message).to.equal("unexpected error");
          done();
        }).catch((err) => done(err));
      });
    });
  });

  // Get Specific User
  describe("getUserById - get specific user", () => {
    const mockData = {
      id: 1,
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    const id = 1;

    context("when retrieving a specific user", () => {
      beforeEach(() => {
        userConfigStub.model.findOne.resolves(cloneDeep(mockData));
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should retrieve a specific user", (done) => {
        userService.getUserById(cloneDeep(id)).then((res) => {
          const expectedData = mockData;
          const actualData = res;
          expect(expectedData).to.deep.equal(actualData);

          const result = userConfigStub.model.findOne.calledWith({
            where: { id: { [Op.eq]: id } },
          });
          expect(
            result,
            "User id service was not called with the correct user id (you changed data)"
          ).to.be.equal(true);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    context("when an error occurs while retrieving a specific user", () => {
      it("should throw an error", (done) => {
        userConfigStub.model.findOne.throws(
          new Error("unexpected error from db")
        );
        userService.getUserById(id).then(() => {
          done(new Error("Unexpected success, expected an error from db"));
        }).catch((err) => {
          expect(err.message).to.equal("unexpected error");
          done();
        });
      });
    });
  });
});
