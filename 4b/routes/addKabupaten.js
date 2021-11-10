const express = require('express')

const router = express.Router()

const dbConnection = require('../connection/db');

const uploadFile = require('../middleware/uploadFile')

router.get('/add-kabupaten', function (request, response) {
  const query = `SELECT * FROM provinsi_tb ORDER BY id`


  dbConnection.getConnection(function (err, conn) {
    if (err) throw err;

    conn.query(query, function (err, results) {
      if (err) throw err

      // console.log(results)

      const provinsi = []
      

      for (let result of results) {
        provinsi.push({
          id: result.id,
          nama: result.nama,
          diresmikan: result.diresmikan,
          pulau: result.pulau,
        })
      }

      response.render('add-kabupaten', {
        title: 'tambah kabupaten',
        isLogin: request.session.isLogin,
        provinsi
      })
      // console.log(provinsi.length)
    })
  })
});

router.post('/add-kabupaten',uploadFile('image'), function (request, response) {
  const {nama, diresmikan, provinsi} = request.body
  // const data = request.body
  let image = ''

  if (request.file) {
    image = request.file.filename
  }

  console.log({nama, diresmikan})

  if(nama == '' || diresmikan == ''){
    request.session.message = {
      type: 'danger',
      message: 'please insert all details'
    }
    console.log(request.session.message)
    return response.redirect('/add-kabupaten')
  }

  const query = `INSERT INTO kabupaten_tb (nama, diresmikan, photo, provinsi_id) 
                  VALUES ("${nama}",STR_TO_DATE("${diresmikan}", "%d-%M-%Y"), "${image}",${provinsi})`


  dbConnection.getConnection(function(err, conn){
    if(err) throw err

    conn.query(query, function(err, results){
      if (err) throw err
      request.session.message = {
        type: 'success',
        message: 'selamat, kabupaten berhasil ditambahkan'
      }
      console.log("success")
      response.redirect('/')
    })
  })
  console.log(query)
});


module.exports = router;