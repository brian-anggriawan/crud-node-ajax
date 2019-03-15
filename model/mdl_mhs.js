const db = require('../db/koneksi');

var sequalize = db.sequelize,
    Sequelize = db.Sequaelize;

const mhs = sequalize.define(
    'tb_mahasiswa',
    {
        VCIDMAHASISWA:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        VCUSERNAME: Sequelize.STRING,
        VCALAMAT: Sequelize.STRING,
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

module.exports = mhs;



