const express = require('express')

const router = express.Router()

const dbConnection = require('../connection/db');

const pathFile = 'http://localhost:3003/uploads/'


router.get('/provinsi-detail/:id', function (request, response) {
    var id = request.params.id
    const query = `SELECT 	
	a.*,
    date_format(a.diresmikan, '%d-%M-%Y') as tanggal
FROM kabupaten_tb a 
INNER JOIN provinsi_tb b on a.provinsi_id=b.id
WHERE b.id = ${id}`

    const query2 =`SELECT
    *,
    date_format(diresmikan, '%d-%M-%Y') as tanggal
    FROM provinsi_tb WHERE id = ${id};`

    const kabupaten = []
    const provinsi = []
  
  
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
  
      conn.query(query, function (err, results) {
        if (err) throw err
  
        // console.log(results)
  
        
        
  
        for (let result of results) {
          kabupaten.push({
            id: result.id,
            nama: result.nama,
            tanggal: result.tanggal,
            photo: pathFile + result.photo,
            provinsi_id: result.provinsi_id,
          })
        }
  
        // response.render('provinsi-detail', {
        //   title: 'detail provinsi',
        //   isLogin: request.session.isLogin,
        //   kabupaten
        // })
        // console.log(kabupaten.length)
      })

      conn.query(query2, function (err, results) {
        if (err) throw err
  
        // console.log(results)

        
        
        const provinsi = {
                id: results[0].id,
                nama: results[0].nama,
                tanggal: results[0].tanggal,
                photo: pathFile + results[0].photo,
                pulau: results[0].pulau,
            }
        
  
        response.render('provinsi-detail', {
            title: 'detail provinsi',
            isLogin: request.session.isLogin,
            kabupaten,
            provinsi,
        })
        console.log(provinsi)
      })


    })
  });

module.exports = router;