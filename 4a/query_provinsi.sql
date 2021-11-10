show databases;

create database comptest;

use comptest;

create TABLE provinsi_tb(
id 			INT AUTO_INCREMENT PRIMARY KEY,
nama		VARCHAR(255),
diresmikan	DATE,
photo		VARCHAR(255),
pulau		VARCHAR(255)
);

INSERT INTO provinsi_tb(nama, diresmikan, pulau)
VALUES		("Sumatera Utara", STR_TO_DATE('15-April-1948', '%d-%M-%Y'), "sumatera"),
			("Jawa Barat", STR_TO_DATE('19-August-1945', '%d-%M-%Y'), "jawa"),
            ("Bali", STR_TO_DATE('19-August-1945', '%d-%M-%Y'), "bali"),
            ("Kalimantan Selatan", STR_TO_DATE('14-August-1950', '%d-%M-%Y'), "kalimantan"),
            ("Sulawesi Utara", STR_TO_DATE('23-September-1964', '%d-%M-%Y'), "sulawesi"),
            ("Papua Barat", STR_TO_DATE('4-October-1999', '%d-%M-%Y'), "papua");

DELETE FROM provinsi_tb;
ALTER TABLE provinsi_tb AUTO_INCREMENT = 0;

create TABLE kabupaten_tb(
id			INT AUTO_INCREMENT PRIMARY KEY,
nama		VARCHAR(255),
diresmikan	DATE,
photo		VARCHAR(255),
provinsi_id	INT,
FOREIGN KEY	(provinsi_id) REFERENCES provinsi_tb(id)
);

SELECT * FROM kabupaten_tb;
DELETE FROM kabupaten_tb;
ALTER TABLE kabupaten_tb AUTO_INCREMENT = 0;

-- query soal 4A

SELECT * FROM provinsi_tb;

SELECT 
a.*,
b.*
FROM provinsi_tb a
JOIN kabupaten_tb b on a.id=b.provinsi_id;

SELECT * FROM provinsi_tb WHERE pulau= "sumatera";
SELECT * FROM provinsi_tb WHERE pulau= "jawa";
SELECT * FROM provinsi_tb WHERE pulau= "bali";
SELECT * FROM provinsi_tb WHERE pulau= "kalimantan";
SELECT * FROM provinsi_tb WHERE pulau= "sulawesi";
SELECT * FROM provinsi_tb WHERE pulau= "papua";


SELECT
*,
date_format(diresmikan, '%d-%M-%Y') as tanggal
FROM provinsi_tb;

SELECT 	
	a.*,
    date_format(a.diresmikan, '%d-%M-%Y') as tanggal
FROM kabupaten_tb a 
INNER JOIN provinsi_tb b on a.provinsi_id=b.id
WHERE b.id = 2







