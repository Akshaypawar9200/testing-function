import Sequelize from 'sequelize';
const db=require('./models')

async function getJobById(inputs) {
    const { jobId } = inputs;
  
    const result = await db.user.findOne({
      where: {
        id: jobId,
      }
      // attributes: [
      //   ['id', 'jobId'],
      //   [Sequelize.col('File.id'), 'fileId'],
      //   [Sequelize.col('File.name'), 'fileName'],
      //   [Sequelize.col('File.location'), 'fileLocation'],
      //   [Sequelize.col('File.type'), 'fileType'],
      // ],
      // include: [
      //   {
      //     model: File,
      //     attributes: [],
      //     required: true,
      //   },
      // ],
      // raw: true,
    });
  
    return result;
  }
  