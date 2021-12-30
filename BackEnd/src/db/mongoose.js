const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cinema-reservations', {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected successfullly to database");
}
).catch(err => {
    console.log('Error: ', err);
});



