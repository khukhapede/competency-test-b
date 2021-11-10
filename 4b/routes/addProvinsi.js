const express = require('express')

const router = express.Router()

const dbConnection = require('../connection/db');

const uploadFile = require('../middleware/uploadFile')

router.get('/add-provinsi', function(request, response){
    // const title = "Add Car"
    // const isLogin = false
    response.render('add-provinsi',{
        title : 'tambah provinsi',
        isLogin : request.session.isLogin,
        auth: true
  })
})
router.post('/add-provinsi',uploadFile('image'), function (request, response) {
  const {nama, diresmikan, pulau} = request.body
  // const data = request.body
  let image = ''

  if (request.file) {
    image = request.file.filename
  }

  console.log({nama, diresmikan})

  if(nama == '' || diresmikan == '' || pulau == ''){
    request.session.message = {
      type: 'danger',
      message: 'please insert all details'
    }
    console.log(request.session.message)
    return response.redirect('/add-provinsi')
  }

  const query = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) 
                  VALUES ("${nama}",STR_TO_DATE("${diresmikan}", "%d-%M-%Y"), "${image}","${pulau}")`


  dbConnection.getConnection(function(err, conn){
    if(err) throw err

    conn.query(query, function(err, results){
      if (err) throw err
      request.session.message = {
        type: 'success',
        message: 'selamat, provinsi berhasil ditambahkan'
      }
      console.log("success")
      response.redirect('/')
    })
  })
  console.log(query)
});


module.exports = router;