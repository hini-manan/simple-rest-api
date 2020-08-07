//Creating MySQL Connection
const mysql = require('mysql');
const bcrypt = require('bcrypt');

//creating a connection
const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'password',
    database: 'nodesql'
});
//connect to database
connection.connect((err) => {
    if(!err){
        console.log('Database Connected...');
    }
    else{
        console.log('Error connection to database...');
        throw err;
    }
});

//USER REGISTRATION handler
exports.register = async function(req, res) {
    const pass = req.body.pass;
    //const encryptedPassword = await bcrypt.hash(pass, salt);

    var users = {
        'username': req.body.username,
        'pass': pass
    }

    let sql = 'INSERT INTO user SET ?';
    
    connection.query(sql, users, (err, result) => {
        if(err){
            res.send({
                'code': 400,
                'failed': 'error occured'
            });
        }
        else{
            res.send({
                'code': 200,
                'success': 'user registered successfully'
            });
        }
    });
}

//USER LOGIN VALIDATION handler
exports.login = async function(req, res){
    const username = req.body.username;
    const pass = req.body.pass;

    let sql = 'SELECT * FROM user WHERE username = ?'

    connection.query(sql, [username], async function(err, results, fields) {
        if(err){
            res.sendres.send({
                'code': 400,
                'failed': 'error occured'
            });
        }
        else{
            if(result.length > 0){
                const comparison = await bcrypt.compare(pass, results[0].pass);
                if(comparison){
                    res.send({
                        'code': 200,
                        'success': 'login successful'
                    });
                }
                else{
                    res.send({
                        'code': 204,
                        'success': 'username and password does not match'
                    });
                }
            }
            else{
                res.send({
                    'code': 206,
                    'success': 'username does not exists'
                });
            }
        }
    });
}