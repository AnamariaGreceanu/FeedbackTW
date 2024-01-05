const {Sequelize} = require("sequelize")

const db = new Sequelize('tw-feedback','root','',{
    host:'localhost',
    dialect:'mysql',
    define: {
         timestamps: true 
    },
})

module.exports = db