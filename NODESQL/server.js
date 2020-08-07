//import EXPRESS
const express = require('express');
//import Body Parser
const bodyParser = require('body-parser');
//login connection
const login = require('./routes/loginroutes');

//setting up an express framework server
const app = express();
//using body-parser to parse incoming requests as JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//allowing access controls  for the server to serve across cross domain requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origint', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//using built-in express router for handling API requests
const router = express.Router();

//testing thr route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the sample interface'
    });
});

//route for handling USER REGISTRATION
router.post('/register', login.register); //api for register
router.post('/login', login.login); //api for login
app.use('/api', router);
app.listen('5000', () => {
    console.log('Server Started on Port: 5000');
});