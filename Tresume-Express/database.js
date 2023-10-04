var sql = require("mssql");

//Configuration object for database connection
const config = {
    user: 'sa',
    password: 'Tresume@123',
    server: '92.204.128.44',
    database: 'Tresume',
    trustServerCertificate: true
};

// const config = {
//   user: 'sa',
//   password: 'Tresume@123',
//   server: '92.204.128.44',
//   database: 'Tresume_Beta',
//   trustServerCertificate: true
// };

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to Tresume database:', err);
      return;
    }
    console.log('Connected to Tresume database!');
  });
  
  module.exports = pool;
