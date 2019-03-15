const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      controller = require('./controller/controller'),
      path = require('path'),
      session = require('express-session'),
      hbs = require('hbs');


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/template');
hbs.registerPartials(__dirname + '/views/base');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use('/assets',express.static(__dirname +'/public'));

app.use(session({ secret: 'APPSCRUD' }));
var routes = require('./routes/routes');
routes(app);


app.listen(port);
console.log('API Berjalan Di Port ' + port);