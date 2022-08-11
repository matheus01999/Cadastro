mysql = require('mysql');
connectionString = 'mysql://root:60265146@localhost/cadast';

db = {}
db.cnn = {}
db.cnn.exec = function(query, callback){
    var connection = mysql.createConnection(connectionString)
    connection.query(query, function(err, rows){
        if(err) throw err;
        callback(rows, err);
        connection.end()
    })
}

var App = {
    Arquivo : 'dados/banco.js',
    db: db
    
}

module.exports = App