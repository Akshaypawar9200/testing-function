const Service = require("../user/userService");

const createUsers = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!firstName && !lastName) {
      let err= new Error("badRequest: body is empty");
      err.statusCode=400
      throw err
    }
    if (!firstName) {
      let err= new Error("badRequest: firstname is empty");
      err.statusCode=400
      throw err
    }
    if (!lastName) {
      let err= new Error("badRequest: lastName is empty");
      err.statusCode=400
      throw err
    } 
    if (!email) {
      let err= new Error("badRequest: email is empty");
      err.statusCode=400
      throw err
    }
 
    if(typeof firstName!="string"){
      let err= new Error("badRequest: plz enter firstname in string format");
      err.statusCode=400
      throw err
    }
    if(typeof lastName!="string"){
      let err= new Error("badRequest: plz enter lastName in string format");
      err.statusCode=400
      throw err
    }
    if(typeof email!="string"){
      let err= new Error("badRequest: plz enter email in string format");
      err.statusCode=400
      throw err
    }

   


    if (!emailRegex.test(email)) {
      let err= new Error("badRequest: email is invalid");
      err.statusCode=400
      throw err
    }
   
    const data = await Service.createUser(req.body);

    // let  err= new Error("user service for create user rejected")
    // err.statusCode=500
    // throw err

    return res.status(200).send(data);
  } catch (error) {
  
    return res.status(error.statusCode).send({ message: error.message });
    
  }
};

const allUsers = async (req, res) => {
  try {
    const data = await Service.getAllUser();
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
    const { firstName, lastName } = req.body;
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
