const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose=require('mongoose');
const config=require('./config/database');
const path = require('path');
const router=express.Router();
const authentication=require('./routes/authentication')(router);

mongoose.Promise=global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log("not connected to database");
    }else{
        console.log(config.secret);
        console.log("connection established " + config.db);
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname+ '/client/dist/Mean'));
app.use('/authentication' ,authentication);
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/client/dist/Mean/index.html'));
  });
  
  app.listen(8080, () => {
   console.log("listening on 8080 port")
  });