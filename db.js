/**
 * Created by dell on 1/13/2018.
 */
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gmail_challenge"
});

var con = require("./db");
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO emails (id, subject,date) VALUES ('Geetansh','Checking','Tuesday',)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record fetched");
    });
});

module.exports = con;
