const express = require('express')

const router = express.Router()

const dbConnection = require('../connection/db');

const uploadFile = require('../middleware/uploadFile')

const pathFile = 'http://localhost:3003/uploads/'

router.get('/edit-provinsi/:id', function (request, response) {
    const { id } = request.params
    const title = "Edit Provinsi"

    
  
    console.log(id)
  
    const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`
  
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
  
      conn.query(query, function (err, results) {
        if (err) throw err

        const provinsi = {
            ...results[0],
            image: pathFile + results[0].image
        }
  
        response.render('edit-provinsi', {
          title,
          isLogin: request.session.isLogin,
          provinsi
        })
      })
    })
  });


router.post('/edit-provinsi/:id',uploadFile('image'), function (request, response) {
  const {id, nama, diresmikan, pulau, oldImage} = request.body
  // const data = request.body
//   let image = oldImage.replace(pathFile, '');
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

  const query = `UPDATE provinsi_tb SET nama = "${nama}", diresmikan = STR_TO_DATE("${diresmikan}", '%d-%M-%Y'), photo = "${image}" WHERE id = ${id}`


  dbConnection.getConnection(function(err, conn){
    if(err) throw err

    conn.query(query, function(err, results){
      if (err) throw err
      request.session.message = {
        type: 'success',
        message: 'selamat, provinsi berhasil diubah'
      }
      console.log("success")
      response.redirect('/')
    })
  })
  console.log(query)
});


module.exports = router;