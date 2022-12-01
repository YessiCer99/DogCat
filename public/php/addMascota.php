<?php

require("conexion.php");

$nombre=$_POST['valNombre'];
$color=$_POST['valColor'];
$sexo=$_POST['valSexo'];
$esterilizado=$_POST['valEst'];
$talla=$_POST['valTalla'];
$edad=$_POST['valEdad'];
$raza=$_POST['valRaza'];
$foto = $_FILES['valFoto'];

$fotoNE = md5($foto['tmp_name']).".jpg";
$rutaS = "images/mascotas/".$fotoNE;
$rutaM = "../images/mascotas/".$fotoNE;
move_uploaded_file($foto['tmp_name'],$rutaM);

$addMascota ="INSERT INTO `mascotas` 
(`nombre`, `color`, `sexo`, `esterilizado`, `talla`, `edad`, `raza`, `foto`) 
VALUES (:nombre, :color, :sexo, :esterilizado, :talla, :edad, :raza, :foto)";
$mascotaRow=[
  'nombre'=>$nombre,
  'raza'=>$raza,
  'esterilizado'=>$esterilizado,
  'sexo'=>$sexo,
  'color'=>$color,
  'edad'=>$edad,
  'foto'=>$rutaS,
  'talla'=>$talla
];
$mascotaQuery = $pcn->prepare($addMascota);
if($mascotaQuery->execute($mascotaRow)){
  echo json_encode(array("response"=>"SUCCESS", "detail"=>"Mascota registrado con exito"));
}else{
  echo json_encode(array("response"=>'ERROR',"detail"=>$mascotaQuery->errorInfo()));
}

$conn->close();

?>