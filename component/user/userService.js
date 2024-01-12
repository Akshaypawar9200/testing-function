const db = require("../../models");
class UserService {
  constructor() {}
  
  async createUser(body) {
    try {
      const data = await db.user.create(body);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const data = await db.user.findAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(body, id) {
    try {
      const data = await db.user.update(
        { firstName: body.firstName, lastName: body.lastName },
        { where: { id: id } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserById(id){
    try {
      const data= await db.user.findOne({where:{id:id}})
      return data
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteUser(id) {
    try {
      const data = await db.user.destroy({ where: { id: id } });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserService();
