const sinon = require("sinon");
const proxyquire = require("proxyquire");
const { expect } = require("chai");
const { cloneDeep } = require("lodash");

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
// for create user
describe("#userService ", () => {
  describe(" createUser - create a user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    context("creating user successfully", () => {
      beforeEach(() => {
        userConfigStub.model.create.resolves(cloneDeep(mockData));
      });
      afterEach(() => {
        sinon.restore();
      });
      it("create user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        userService
          .createUser(cloneDeep(userInfo))
          .then((res) => {
         
            const expectedData = mockData;
            const actualData = res;

            expect(expectedData).to.deep.equal(actualData);
            const result = userConfigStub.model.create.calledWith(cloneDeep(userInfo));
            expect(
              result,
              "createUser service was not called with the correct user data (you change data)"
            ).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    context("throws error if db reject while creating", () => {
      it("error occur in create user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };

        userConfigStub.model.create.throws(
          new Error("unexpected error from db")
        );
        userService
          .createUser(userInfo)
          .then(() => {
            done(new Error("error"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  // for update user
  describe(" updateUser - update a user", () => {
    const mockData = {
      id:1,
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    context("user updated successfully", () => {
      beforeEach(() => {
        userConfigStub.model.update.resolves(cloneDeep(mockData));
      });
      afterEach(() => {
        sinon.restore();
      });
      it("update user", (done) => {
        const userInfo = {
          id:1,
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        const id=1
        userService
          .updateUser(cloneDeep(userInfo),id)
          .then((res) => {
            const expectedMessage = "user updated";
            const actualMessage = res;
            expect(expectedMessage).to.equal(actualMessage);
            const result = userConfigStub.model.update.calledWith(
              { firstName: userInfo.firstName, lastName: userInfo.lastName ,email:userInfo.email},
              { where: { id: id } }
            )
            expect(
              result,
              "updateUser service was not called with the correct user data (you change data)"
            ).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    context("throws error if db reject while updating", () => {
      it("error occur in update user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        const id = 1;

        userConfigStub.model.update.throws(
          new Error("unexpected error from db")
        );
        userService
          .updateUser(userInfo, id)
          .then(() => {
            done(new Error("error"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  // for delete user
  describe(" deleteUser - delete a user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    context("user delete successfully", () => {
      beforeEach(() => {
        userConfigStub.model.destroy.resolves(cloneDeep(mockData));
      });
      afterEach(() => {
        sinon.restore();
      });
      it("delete user", (done) => {
        const id = 1;
        userService
          .deleteUser(cloneDeep(id))
          .then((res) => {
            const expectedMessage = "user deleted";
            const actualMessage = res;

            expect(expectedMessage).to.equal(actualMessage);
            const result = userConfigStub.model.destroy.calledWith(
              { where: { id: id } }
            )
            expect(
              result,
              "deleteUser service was not called with the correct user id (you change data)"
            ).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    context("throws error if db reject while deleting", () => {
      it("error occur in delete user", (done) => {
        const id = 1;

        userConfigStub.model.destroy.throws(
          new Error("unexpected error from db")
        );
        userService
          .deleteUser(id)
          .then(() => {
            done(new Error("error"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  // all user
  describe(" getAllUser - all user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    context("all users ", () => {
      beforeEach(() => {
        userConfigStub.model.findAll.resolves(cloneDeep(mockData));
      });
      afterEach(() => {
        sinon.restore();
      });
      it("all user", (done) => {
        userService
          .getAllUser()
          .then((res) => {
            const expectedData = mockData;
            const actualData = res;

            expect(expectedData).to.deep.equal(actualData);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    context("throws error if db reject while collecting all users", () => {
      it("error occur in get all user", (done) => {
        userConfigStub.model.findAll.throws(
          new Error("unexpected error from db")
        );
        userService
          .getAllUser()
          .then(() => {
            done(new Error("error"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });

  // findone
  describe(" getUserById - get specific user", () => {
    const mockData = {
      firstName: "Akshay",
      lastName: "pawar",
      email: "akshay@gmail.com",
    };
    const id = 1;
    context("specific users ", () => {
      beforeEach(() => {
        userConfigStub.model.findOne.resolves(cloneDeep(mockData));
      });
      afterEach(() => {
        sinon.restore();
      });
      it("all user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };
        userService
          .getUserById(cloneDeep(id))
          .then((res) => {
            const expectedData = mockData;
            const actualData = res;

            expect(expectedData).to.deep.equal(actualData);
            const result = userConfigStub.model.findOne.calledWith(
              { where: { id: id } }
            )
            expect(
              result,
              "User id service was not called with the correct user id (you change data)"
            ).to.be.equal(true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    context("throws error if db reject while collecting all users", () => {
      it("error occur in get all user", (done) => {
        const userInfo = {
          firstName: "Akshay",
          lastName: "pawar",
          email: "akshay@gmail.com",
        };

        userConfigStub.model.findOne.throws(
          new Error("unexpected error from db")
        );
        userService
          .getUserById(id)
          .then(() => {
            done(new Error("error"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});
