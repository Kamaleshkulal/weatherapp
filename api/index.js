var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');


 
var app = express();
app.use(cors());


var CONNECTION_STRING = 'mongodb+srv://kamaleshkulal:Kamalesh6521&_@cluster0.zcs7co9.mongodb.net/?retryWrites=true&w=majority';
var DATABASENAME = 'weatherapp';
var database;

app.listen(5038,() => {
    MongoClient.connect(CONNECTION_STRING,(error,client) =>{
        database = client.db(DATABASENAME);
        console.log('MongoDb  Connected Successfully');
    })
})


