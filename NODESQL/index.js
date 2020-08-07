//import EXPRESS
const express = require('express');
//import MySQL
const mysql = require('mysql');
//import Body Parser
const bodyparser = require('body-parser');



//creating a connection
const myConnection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'MySQL@2020',
    database: 'nodesql',
    multipleStatements: true
});
//connect to database
myConnection.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...');
}); 

//setting up an express framework server
const app = express();

/* //TESTING
//creating a db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodesql';
    myConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});
//creating a table
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, firstName VARCHAR(25), lastName VARCHAR(25), messageTitle VARCHAR(50), messageBody VARCHAR(255), PRIMARY KEY(id))';
    myConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post table created...');
    })
});
//inserting post ex
app.get('/addpostex', (req, res) => {
    let post = {firstName: 'Hini', lastName: 'Manan', messageTitle: 'Hello World!', messageBody: 'welcome to the testing of nodejs with mysql'};
    let sql = 'INSERT INTO posts SET ?';
    let query = myConnection.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('post example added...');
    });
});
*/

//using body-parser to parse incoming requests as JSON
app.use(bodyparser.json());

app.listen('5000', () => {
    console.log('Server Started on Port: 5000');
});

//CRUD (RESTful) functions
//GET basic
app.get('/posts', (req, res) => {
    let sql = "SELECT * FROM user"
    myConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
        res.send('posts data retrieved...');
    });
});
//GET based on username
app.get('/posts/:username', (req, res) => {
    let sql = "SELECT * FROM user WHERE username = ?"
    myConnection.query(sql, [req.params.username], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
        res.send('posts data retrieved...');
    });
});

//DELETE a data
app.delete('/posts/:id', (req, res) => {
    let sql = "DELETE FROM posts WHERE id = ?"
    myConnection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        console.log("Data deleted successfully.")
        res.send('requested data deleted...');
    });
});

//INSERT (POST) a data
app.post('/posts', (req, res) => {
    let post = req.body;
    let sql = "SET @id = ?; SET @firstName = ?; SET @lastName = ?; SET @messageTitle = ?; SET @messageBody = ?; CALL postsAddorEdit(@id, @firstName, @lastName, @messageTitle, @messageBody);"
    myConnection.query(sql, [post.id, post.firstName, post.lastName, post.messageTitle, post.messageBody], (err, result) => {
        if(err) throw err;
        console.log("post inserted...");
        console.log(result);
        res.send(result);
    });
});

//UPDATE (PUT) a data
app.put('/posts', (req, res) => {
    let post = req.body;
    let sql = "SET @id = ?; SET @firstName = ?; SET @lastName = ?; SET @messageTitle = ?; SET @messageBody = ?; CALL postsAddorEdit(@id, @firstName, @lastName, @messageTitle, @messageBody);"
    myConnection.query(sql, [post.id, post.firstName, post.lastName, post.messageTitle, post.messageBody], (err, result) => {
        if(err) throw err;
        console.log("post updated...");
        console.log(result);
        res.send(result);
    });
});