const { Sequelize } = require("sequelize");//importação do sequelize
const database = require("../database/db");//importar a conexão com a model

const Trip = database.sequelize.define(
    //nome da tabela do postgres
    "trips",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        city:{
            type: Sequelize.STRING,
            allowNull: false,
        },    
        country:{
            type: Sequelize.STRING,
            allowNull: false,
        },    
        location_name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        summary:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        image:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true, //o nome da tabela seja o mesmo que eu criei no banco
        timestamps: false,//registrar a criação de tempo e data
        createdAt: false,
        updateAt: false,
    }
);

module.exports = Trip;//exportar a Viagem