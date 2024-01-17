const sinon = require("sinon");
const proxyquire = require("proxyquire");
const { expect } = require("chai");
const Sequelize = require("sequelize");

const dbStub = {
  file: "File_model",
  Job: {
    findOne: sinon.stub(),
  },
};

const jobService = proxyquire("../../job.js", {
  "./models": dbStub,
});

describe("jobService", () => {
  describe("getJobById - get job by id", () => {
    let inputs = 1;

    context("when finding user by id successfully", () => {
      const expectedWhereClause = {
        id: { [Sequelize.Op.eq]: inputs },
      };

      const expectedAttributes = [
        ["id", "jobId"],
        [Sequelize.col("File.id"), "fileId"],
        [Sequelize.col("File.name"), "fileName"],
        [Sequelize.col("File.location"), "fileLocation"],
        [Sequelize.col("File.type"), "fileType"],
      ];
      const exepectedInclude = [
        {
          model: "File_model",
          attributes: [],
          required: true,
        },
      ];
      const expectedRaw = true;

      before(() => {
        dbStub.Job.findOne.resolves("job find successfully");
      });

      it("should get the job by id", (done) => {
        jobService
          .getJobById(inputs)
          .then(() => {
            const result = dbStub.Job.findOne.getCall(0).args;

            const actualWhereClause = result[0].where;
            expect(
              actualWhereClause,
              "Expected where clause to match"
            ).to.deep.equal(expectedWhereClause);

            const actualAttributes = result[0].attributes;
            expect(
              actualAttributes,
              "Expected attributes to match"
            ).to.be.deep.equal(expectedAttributes);

            const actualInclude = result[0].include;
            expect(actualInclude, "Expected include to match").to.be.deep.equal(
              exepectedInclude
            );

            const actualRaw = result[0].raw;
            expect(actualRaw, "Expected raw to match").to.be.deep.equal(
              expectedRaw
            );

            const results = dbStub.Job.findOne.calledWith({
              where: {
                id: {
                  [Sequelize.Op.eq]: inputs,
                },
              },
              attributes: [
                ["id", "jobId"],
                [Sequelize.col("File.id"), "fileId"],
                [Sequelize.col("File.name"), "fileName"],
                [Sequelize.col("File.location"), "fileLocation"],
                [Sequelize.col("File.type"), "fileType"],
              ],
              include: [
                {
                  model: dbStub.file,
                  attributes: [],
                  required: true,
                },
              ],
              raw: true,
            });
            expect(
              results,
              "Expected changes to occur in where clause"
            ).to.be.equal(true);

            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    context("when an error occurs while getting job", () => {
      it("should throw an error", (done) => {
        dbStub.Job.findOne.throws(new Error("unexpected error from db"));
        jobService
          .getJobById(inputs)
          .then(() => {
            done(new Error("Unexpected success, expected an error from db"));
          })
          .catch((err) => {
            expect(err.message).to.equal("unexpected error");
            done();
          });
      });
    });
  });
});
