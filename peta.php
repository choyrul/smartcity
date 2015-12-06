<?php
include "koneksi.php";

$dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $options);

$tabel= $_GET['q'];
switch($tabel){
	case "rumah":
		$query = $db->query("select * from lokasi where id_jenis=1");
		break;
	case "pendidikan":
		$query = $db->query("select * from lokasi where id_jenis=2");
		break;
	case "kesehatan":
		$query = $db->query("select * from lokasi where id_jenis=3");
		break;
	case "niaga ":
		$query = $db->query("select * from lokasi where id_jenis=4");
		break;
	case "ibadah":
		$query = $db->query("select * from lokasi where id_jenis=5");
		break;
	case "olahraga":
		$query = $db->query("select * from lokasi where id_jenis=6");
		break;
	case "pemerintah":
		$query = $db->query("select * from lokasi where id_jenis=7");
		break;
	case "budaya":
		$query = $db->query("select * from lokasi where id_jenis=8");
		break;
	case "makam":
		$query = $db->query("select * from lokasi where id_jenis=9");
		break;
}

$data = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data, JSON_NUMERIC_CHECK);