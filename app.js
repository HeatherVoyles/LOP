var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    qt   = require('quickthumb');

// Use quickthumb
console.log(__dirname);
app.use(qt.static(__dirname + '/'));

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

// Show the upload form	
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  var form = '<form action="/upload" enctype="multipart/form-data" 
  method="post">Add a title: <input name="title" type="text" /><br><br>
  <input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" 
  value="Upload" /></form>';
  res.end(form); 
}); 
app.listen(8080);

/*Sequlize Node DB creator*/

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
