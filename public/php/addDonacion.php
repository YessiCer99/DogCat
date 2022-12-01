<?php

require("conexion.php");

$nombre=$_POST['valNom'];
$telefono=$_POST['valTel'];
$tipo=$_POST['valDon'];
$descripcion=$_POST['valDes'];
$fecha=date("Y-m-d");//date("Y-m-d H:i:s");


$addMascota ="INSERT INTO `donaciones` 
(`nombre`, `telefono`, `tipo_donacion`, `descripcion`, `fecha`) 
VALUES (:nombre, :telefono, :tipo, :descripcion, :fecha);";
$mascotaRow=[
  'nombre'=>$nombre,
  'telefono'=>$telefono,
  'tipo'=>$tipo,
  'descripcion'=>$descripcion,
  'fecha'=>$fecha
];
$mascotaQuery = $pcn->prepare($addMascota);
if($mascotaQuery->execute($mascotaRow)){
  echo json_encode(array("response"=>"SUCCESS", "detail"=>"Donacion registrada"));
}else{
  echo json_encode(array("response"=>'ERROR',"detail"=>$mascotaQuery->errorInfo()));
}


$conn->close();

?>