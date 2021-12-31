const express = require('express');
const routes = require('./routes/index.route');
require('./db/mongoose') // Here to make sure that the database is connected

const app = express();
const port = 3000;

app.use('/posters', express.static('posters'));
app.use(express.json()); // this is going to automatically pass incoming Json to an Object so we can access it in our request handler
app.use('/api', routes);

app.listen(port, () => {
    console.log('Server is up on port ' + port) //The app.listen() function is used to bind and listen the connections on the specified host and port.
}) //This runs the app on port(The passed server)