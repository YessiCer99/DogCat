<?php
//Se llama al codigo que zhace la conexion a la base de datos
require("conexion.php");
//Se obtinen los datos
$id=$_POST['id'];
//Se hace la consulta para obtener los datos de las mascotas

$solicitudes ="DELETE 
FROM `solicitudesadopcion` 
WHERE id = :idMascota";
$solicitudesRow=[
    'idMascota'=>$id
];
$solicitudesQuery = $pcn->prepare($solicitudes);
if($solicitudesQuery->execute($solicitudesRow)){
    echo json_encode(array("response"=>"SUCCESS", "detail"=>"La solicitud ha sido canselada"));
}else{
    echo json_encode(array("response"=>'ERROR',"detail"=>$solicitudesQuery->errorInfo()));
}

 
$conn->close();

?>