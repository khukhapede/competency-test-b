const http = require('http');
const path = require('path');
const express = require('express');
const { dirname } = require('path');
const hbs = require('hbs');
const { response } = require('express');
const session = require('express-session');


const indexRoutes = require('./routes/index');
const addKabupatenRoutes = require('./routes/addKabupaten');
const addProvinsiRoutes = require('./routes/addProvinsi');
const provDetailRoutes = require('./routes/provinsi-detail')
const editProvRoutes = require('./routes/editProvinsi');

const app = express();

app.use(express.json());
app.use(express.static('express'));

app.use(
    session(
      {
        cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          secure: false,
          httpOnly: true
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: 'secretkey'
      }
    )
  )

// middleware message
app.use(function (request, response, next) {
    response.locals.message = request.session.message
    delete request.session.message
    next()
  })

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended: false}))

hbs.registerPartials(__dirname + `/views/partials`)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs')

const dbConnection = require('./connection/db');


// get provinsi/index view
app.use(indexRoutes);

// get add kabupaten
app.use(addKabupatenRoutes);

// get add provinsi
app.use(addProvinsiRoutes);

// get add provinsi detail
app.use(provDetailRoutes);

// get edit provinsi
app.use(editProvRoutes);

// get delete provinsi
app.get('/delete-provinsi/:id', function (request, response) {
    const id = request.params.id
  
    const query = `DELETE FROM provinsi_tb WHERE id=${id}`
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
  
      conn.query(query, function (err, results) {
        if (err) throw err
  
        response.redirect('/')
      })
    })
  })

port = 3003
const server = http.createServer(app)
server.listen(port)
