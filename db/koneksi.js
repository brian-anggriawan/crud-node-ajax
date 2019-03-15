const Sequaelize = require('sequelize');
const sequelize = new Sequaelize('BARCODE','wh01','W4r3house',{
  host: '192.168.0.7',
  dialect: 'mssql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequaelize = Sequaelize;

sequelize.authenticate().then(() => {
    console.log('Berhasil Konek Database');
  })
  .catch(err => {
    console.error('Gagal Konek Database: ', err);
  });

module.exports = db;



