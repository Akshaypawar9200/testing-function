const express = require("express");
const application = express();

// const Service = require("./service");
const { createUsers, allUsers, updateUsers, deleteUsers, getById } = require("./component/user/userController");
application.use(express.json());
application.post('/create',createUsers)
application.get('/getall',allUsers)
application.get('/getbyid/:id',getById)
application.put('/update/:id',updateUsers)
application.delete("/delete/:id",deleteUsers)

module.exports=application.listen(3000, () => {
  console.log("server run on 3000 port");
});
