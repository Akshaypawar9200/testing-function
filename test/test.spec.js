const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

chai.use(chaiHttp);
describe("USER API", () => {
  it("should get all user detail", async () => {
    const res = await chai.request(app).get("/getall");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });
  it("should create user", async () => {
    const res = await chai
      .request(app)
      .post("/create")
      .send({ firstName: "LMN", lastName: "OPQ" });
    expect(res).to.have.status(200);
    expect(res.body.firstName).to.equal("LMN");
  });
  it("should update the user", async () => {
    const res = await chai
      .request(app)
      .put("/update/3")
      .send({ firstName: "caleb", lastName: "felix" });
    expect(res).to.have.status(200);
    expect(res.text).to.equal("user updated successfully");
  });
  it("should delete user", async () => {
    const res = await chai.request(app).delete("/delete/25");
    expect(res).to.have.status(200);
    expect(res.text).to.equal("user deleted successfully");
  });
});
