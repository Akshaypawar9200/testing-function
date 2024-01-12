// const sinon = require("sinon");
// const proxyquire = require("proxyquire");
// const { expect } = require("chai");
// const serviceCases = require("../../serviceCase");
// const databaseInstanceStub = {
//   user: {
//     create: sinon.stub().returns({
//       id: "1",
//       firstName: "Akshay",
//       lastName: "pawar",
//       email: "akshay@gmail.com",
//       createdAt: "2024-01-11 15:23:27.495+05:30",
//       updatedAt: "2024-01-11 15:23:27.495+05:30",
//     }),
//     destroy: sinon.stub(),
//     update: sinon.stub(),
//     findOne: sinon.stub().returns({
//       id: "1",
//       firstName: "Akshay",
//       lastName: "pawar",
//       email: "akshay@gmail.com",
//       createdAt: "2024-01-11 15:23:27.495+05:30",
//       updatedAt: "2024-01-11 15:23:27.495+05:30",
//     }),
//   },
// };

// const userService = proxyquire("../../component/user/userService", {
//   "../../models": databaseInstanceStub,
// });

// console.log(databaseInstanceStub);
// describe("#UserService - Unit testing on user service", () => {


//   describe(" -------create user----", () => {
//     context("check user created", () => {
//       for (let i = 0; i < serviceCases.length; i++) {
//         const testCase = serviceCases[i];
//         if (testCase.case == "positive") {
//           describe(testCase.description, () => {
//             it(testCase.description,(done) => {
//               databaseInstanceStub.user.create;
//               userService
//                 .createUser(testCase.mockData)
//                 .then((response) => {
//                   const expectedMessage = testCase.modelData;
//                   const actualMessage = response;
//                   expect(actualMessage).to.be.deep.equal(expectedMessage);
//                   done();
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   done();
//                 })
//                 .catch((err) => {
//                   done(err);
//                 });
//             });
//           });
//         }
//       }
    
//     });



//   });




























//   // describe(" -------find user by id----", () => {
//   //   const mockData = {
//   //     id: 1,
//   //   };
//   //   const modelData = {
//   //     id: "1",
//   //     firstName: "Akshay",
//   //     lastName: "pawar",
//   //     email: "akshay@gmail.com",
//   //     createdAt: "2024-01-11 15:23:27.495+05:30",
//   //     updatedAt: "2024-01-11 15:23:27.495+05:30",
//   //   };
//   //   context("find user by id", () => {
//   //     it("should find user by id", () => {
//   //       databaseInstanceStub.user.create;
//   //       userService.getUserById(mockData).then((response) => {
//   //         const expectedMessage = modelData;
//   //         const actualMessage = response;
//   //         expect(actualMessage).to.be.deep.equal(expectedMessage);
//   //       });
//   //     });
//   //   });
//   // });
// });
