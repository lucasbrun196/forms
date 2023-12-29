import { Sequelize } from "sequelize"

//conexão com o banco de dados MySql
const sequelize = new Sequelize('postapp', 'root', '1212',{
    host: 'localhost',
    dialect: 'mysql'
})

export{
    sequelize, Sequelize
}