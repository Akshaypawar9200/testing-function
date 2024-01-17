const { Sequelize, Op } = require("sequelize");
const db=require("./models")

async function getJobById(inputs) {
 try {
  // console.log("#####################",Op);
   const result = await db.Job.findOne({
    where: {
      id: {
        [Op.eq]: inputs,
      },
    },
    attributes:  [
      ['id', 'jobId'],
      [Sequelize.col('File.id'), 'fileId'],
      [Sequelize.col('File.name'), 'fileName'],
      [Sequelize.col('File.location'), 'fileLocation'],
      [Sequelize.col('File.type'), 'fileType'],
    ],
    include: [
      {
        model: db.file,
        attributes: [],
        required: true,
      },
    ],
    raw: true,
  
  });
  
  return result;
 } catch (error) {
  let errors = new Error("unexpected error");
  throw errors;
 }

 
}
module.exports={getJobById}

