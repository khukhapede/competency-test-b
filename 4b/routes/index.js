const express = require('express')

const router = express.Router()

const dbConnection = require('../connection/db');

const pathFile = 'http://localhost:3003/uploads/'

router.get('/', function (request, response) {
  const query = `SELECT
  *,
  date_format(diresmikan, '%d-%M-%Y') as tanggal
  FROM provinsi_tb
  ORDER BY id;`


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
          tanggal: result.tanggal,
          photo: pathFile + result.photo,
          pulau: result.pulau,
        })
      }

      response.render('index', {
        title: 'provinsi',
        isLogin: request.session.isLogin,
        provinsi
      })
      console.log(provinsi.length)
    })
  })
});

module.exports = router;