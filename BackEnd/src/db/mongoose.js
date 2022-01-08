const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Mostafa:Mostafa123@cluster0.a7mw6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// mongoose.connect('mongodb://127.0.0.1:27017/cinema-reservations', {
//     useNewUrlParser: true,
// }).then(() => {
//     console.log("Connected successfullly to database");
// }
// ).catch(err => {
//     console.log('Error: ', err);
// });

mongoose.connect(uri, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected successfullly to database");
}
).catch(err => {
    console.log('Error: ', err);
});



