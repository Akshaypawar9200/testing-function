const db = require("../models")
const { Op, Sequelize } = require("sequelize")

class UserConfig{
    constructor(){
        this.fieldMapping=Object.freeze(
            {
                id:"id",
                firstName:"firstName",
                lastName:"lastName",
                email:"email"
            }
        )
     
    
        this.model=db.user
        this.modelName=db.user.Name
        this.tableName=db.user.tableName
        this.filters=Object.freeze({
            id: (id) => {
                return {
                    [this.fieldMapping.id]: {
                        [Op.eq]: id
                    }
                }
            },
            firstName: (firstName) => {
                return {
                    [this.fieldMapping.firstName]: {
                        [Op.eq]: firstName
                    }
                }
            },
            lastName: (lastName) => {
                return {
                    [this.fieldMapping.lastName]: {
                        [Op.eq]: lastName
                    }
                }
            },
            email: (email) => {
                return {
                    [this.fieldMapping.email]: {
                        [Op.eq]: email
                    }
                }
            },
            
        })

    }
}
const userConfig=new UserConfig()
module.exports=userConfig