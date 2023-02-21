const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
port = process.env.port || 3000;
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());



const dataBase = require('./dataBase/userDataBase');
const Router = require('./Routes/userRoutes');
app.use('/user', Router);

app.listen(port, ()=>{
    console.log(`my server is run on port # ${port}.`)
});
