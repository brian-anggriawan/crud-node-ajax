const db = require('../db/koneksi');

var sequalize = db.sequelize,
    Sequelize = db.Sequaelize;

const login = sequalize.define(
    'tb_login',
    {
        VCIDLOGIN:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        VCUSERNAME: Sequelize.STRING,
        VCPASSWORD: Sequelize.STRING,
        VCENTRYBY: Sequelize.STRING,
        VCUPDATEBY: Sequelize.STRING,
        VCIPENTRY: Sequelize.STRING,
        VCIPUPDATE: Sequelize.STRING,
        VCPCNAMEENTRY: Sequelize.STRING,
        VCPCNAMEUPDATE: Sequelize.STRING,
        DTENTRYBY: Sequelize.DATEONLY,
        DTUPDATEBY: Sequelize.DATEONLY

    },
    {
    timestamps: false,
    freezeTableName: true
});

module.exports = login;



