const express = require('express');
const routes = require('./routes/index.route');
require('./db/mongoose') // Here to make sure that the database is connected
var cors = require('cors');

var multer = require('multer');
var upload = multer();

const app = express();
const port = 8086;

app.use('/posters', express.static('posters'));
app.use(express.json()); // this is going to automatically pass incoming Json to an Object so we can access it in our request handler
app.use('/api', routes);

app.use(cors()); // Use this after the variable declaration

// for parsing multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server is up on port ' + port) //The app.listen() function is used to bind and listen the connections on the specified host and port.
}) //This runs the app on port(The passed server)