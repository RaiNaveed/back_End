const mongoose = require('mongoose');
const URL = process.env.dbURL;
mongoose.connect(URL);
const db = mongoose.connection;
db.once('error', function(){
    console.log('error in connection')
});
db.on('open', function(){
    console.log('dataBase is connected successfully')
});