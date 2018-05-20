//This app created by the best coder in the world.
var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb');

app.use(express.static('dist'));

app.use((req,res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'dist')
  });
});


//TODO Make this thing act like a rest api?


Mongo

Rest

Now it works dang it!


var port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log(`Server listening on port ${port}!\nPrepare to recieve many dank memes.`)
});
