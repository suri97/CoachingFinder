/**
 * Created by suransh on 26/10/16.
 */

const mysql = require('mysql');

/*

 CREATE TABLE Centres ( id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name text, lat FLOAT, lng FLOAT, type text );

 */

var getConnection = function () {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'newuser',
        password: 'newpassword',
        database: 'newdatabase'
    });
    connection.connect();

    return connection;
};

module.exports = {
  show: (type,cb) => {
      let connection = getConnection();
      connection.query('SELECT * FROM Centres WHERE type="' + type + '"', (err,rows,fields) => {
          cb(rows);
      });
      connection.end();
  }
}
;




