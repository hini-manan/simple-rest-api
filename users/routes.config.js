var express = require('express');
var app = express();

app.post('/users', [
   UsersController.insert
]);
app.listen(5000);
