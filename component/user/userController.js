const Service = require("../user/userService");

const createUsers = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!firstName && !lastName) {
      throw new Error("badRequest: body is empty");
    }
    if (!firstName) {
      throw new Error("badRequest: firstname is empty");
    }
    if (!lastName) {
      throw new Error("badRequest: lastName is empty");
    }
    if (!email) {
      throw new Error("badRequest: email is empty");
    }

    if (typeof firstName != "string") {
      throw new Error("badRequest: plz enter firstname in string format");
    }

    if (typeof lastName != "string") {
      throw new Error("badRequest: plz enter lastName in string format");
    }
    if (typeof email != "string") {
      throw new Error("badRequest: plz enter email in string format");
    }

    if (!emailRegex.test(email)) {
      throw new Error("badRequest: email is invalid");
    }

    let data = await Service.createUser(req.body);
    
    // let data
    // try {
    //  data= await Service.createUser(req.body);
    // } catch (error) {
    //   return res.status(200).send(data);
    // }


    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const{limit,page}=req.query
    const data = await Service.getAllUser(limit,page);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.getUserById(id);
    res.status(200).send(data.dataValues);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName,email } = req.body;
    const data = await Service.updateUser(req.body, id);
    res.status(200).send("user updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.deleteUser(id);
    console.log(data);
    res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(500).send("user cannot delete");
  }
};

module.exports = { createUsers, allUsers, updateUsers, deleteUsers, getById };
