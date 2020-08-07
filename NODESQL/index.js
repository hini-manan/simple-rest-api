const express = require('express');
const mysql = require('mysql');

//creating a connection
const dbcon = mysql.createConnection({
    user    : 'root',
    password: 'password',
    database: 'nodesql'
});
//connect to database
dbcon.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...');
}); 

//setting up an express server
const app = express();

//creating a db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodesql';
    dbcon.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});
//creating a table
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, firstName VARCHAR(25), lastName VARCHAR(25), messageTitle VARCHAR(50), messageBody VARCHAR(255), PRIMARY KEY(id))';
    dbcon.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post table created...');
    })
});
//inserting post ex
app.get('/addpostex', (req, res) => {
    let post = {firstName: 'Hini', lastName: 'Manan', messageTitle: 'Hello World!', messageBody: 'welcome to the testing of nodejs with mysql'};
    let sql = 'INSERT INTO posts SET ?';
    let query = dbcon.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post example added...');
    });
});



app.listen('5000', () => {
    console.log('Server Started on Port 5000');
});