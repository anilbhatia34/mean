const express = require('express');
const app = express();
const mongoose=require('mongoose');
const config=require('./config/database');
var path = require('path');

mongoose.Promise=global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log("not connected to database");
    }else{
        console.log(config.secret)
        console.log("connection established ", +config.db);
    }
});
app.use(express.static(__dirname+ '/client/dist/Mean'));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/client/Mean/dist/Mean/index.html'));
  });
  
  app.listen(8080, () => {
   console.log("listening on 8080 port")
  });