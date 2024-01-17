const { Op } = require("sequelize");
const userConfig = require("../../model-config/userConfig");
class UserService {
  constructor() {}

  async createUser(userInfo) {
    try {
      
      let data = await userConfig.model.create(userInfo);
      return data;
    } catch (error) {
      let errors = new Error("unexpected error");
      throw errors;
    }
  }

  async getAllUser(limit, page) {
    try {

      let data = await userConfig.model.findAll({
        page:page,
        limit: limit
      });
      return data;
    } catch (error) {
      let errors = new Error("unexpected error");
      throw errors;
    }
  }

  async updateUser(userInfo, id) {
    try {

      const data = await userConfig.model.update(
        userInfo,
        { where: { id:{[Op.eq]: id} } }
      );
      return "user updated";
      // return data;
    } catch (error) {
      let errors = new Error("unexpected error");
      throw errors;
    }
  }

  async getUserById(id) {
    try {
      const data = await userConfig.model.findOne(   { where: { id:{[Op.eq]: id} } });
      return data;
    } catch (error) {
      let errors = new Error("unexpected error");
      throw errors;
    }
  }
  async deleteUser(id) {
    try {
      
      const data = await userConfig.model.destroy(   { where: { id:{[Op.eq]: id} } });
      return "user deleted";
      return data;
    } catch (error) {
      let errors = new Error("unexpected error");
      throw errors;
    }
  }
}
module.exports = new UserService();
