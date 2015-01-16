var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    bodyParser = require('body-parser');

// Use quickthumb
console.log(__dirname);
app.use(qt.static(__dirname + '/'));



var pg = require('pg');

var conString = "postgres://Yellow@localhost/lop";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log("We're Connected!");
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

// Show the upload form	//
/*
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">Add a title: <input name="title" type="text" /><br><br><input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
  res.end(form); 
}); */

app.get('/', function(req, res){ 
  res.sendfile(__dirname + '/index.html');  
});

app.get('/SellerFormPage', function(req, res){ 
  res.sendfile(__dirname + '/SellerFormPage.html');  
});

/*app.use(bodyParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/upload', urlencodedParser, function(req, res){

//    console.log(request.body);
//    console.log(request.body.wrapper.formcontainer.item.description);
    console.log(req.body.price);

});*/

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});

    client.query('INSERT INTO items(catid, userid, description, color, locale, price) VALUES (1, 1, $1, $2, $3, $4);', [fields.description, fields.color, fields.locale, fields.price], function(err, result) {
      if(err) {
        console.log("no bam...");
        return console.error('error running query', err);
      }
      console.log('BAM!');
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });

    /*res.write('received upload:\n\n');*/
    res.end(util.inspect({fields: fields, files: files}));
    //res.write('done!');
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    //var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    //var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    //var new_location = 'uploads/';
/*
    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });*/

    client.query('INSERT INTO items(catid, userid, description, color, locale, price) VALUES (1, 1, $1, $2, $3, $4);', [form.description, form.color, form.locale, form.price], function(err, result) {
      if(err) {
        console.log("no bam...");
        return console.error('error running query', err);
      }
      console.log('BAM!');
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  console.log("Test!");
});


app.listen(8080); 

/*Sequlize Node DB creator

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('lop', 'Yellow', '', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
  */
