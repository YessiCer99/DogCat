<?php

require("conexion.php");

$idMascota=$_POST['idMascota'];
$nombre=$_POST['nombre'];
$telefono=$_POST['telefono'];
$correo=$_POST['correo'];
$razonAdoptar=$_POST['razonAdoptar'];
$razonVivira=$_POST['razonVivira'];
$estatus=0;

$addMascota ="INSERT INTO `solicitudesadopcion` 
(`idMascota`, `nombre`, `telefono`, `correo`, `razonAdoptar`, `razonVivira`, `estatus`) 
VALUES (:id, :nombre, :telefono, :correo, :r1, :r2, :estatus)";
$mascotaRow=[
  'id'=>$idMascota,
  'nombre'=>$nombre,
  'telefono'=>$telefono,
  'correo'=>$correo,
  'r1'=>$razonAdoptar,
  'r2'=>$razonVivira,
  'estatus'=>$estatus
];
$mascotaQuery = $pcn->prepare($addMascota);
if($mascotaQuery->execute($mascotaRow)){
  echo json_encode(array("response"=>"SUCCESS", "detail"=>"Solicitud enviada con éxito"));
}else{
  echo json_encode(array("response"=>'ERROR',"detail"=>$mascotaQuery->errorInfo()));
}


$conn->close();

?>