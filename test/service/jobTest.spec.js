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
const sequalizeStub = {
  Op: {
    eq: sinon.stub(),
  },
};

const jobService = proxyquire("../../job.js", {
  "./models": dbStub,
  sequelize: sequalizeStub,
});

describe("jobService", () => {
  describe("getJobById - get job by id", () => {
    let jobId = 1;
    const expectedResult = {
      where: {
        id: {
          [sequalizeStub.Op.eq]: jobId,
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
    };

    context("when finding job by id successfully", () => {
      before(() => {
        dbStub.Job.findOne.resolves("job find successfully");
      });

      it("should get the job by id", (done) => {
        jobService
          .getJobById(jobId)
          .then(() => {
            const result = dbStub.Job.findOne.getCall(0).args;
            expect(expectedResult).to.deep.equal(result[0]);
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
          .getJobById(jobId)
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
