<?php
//Se llama al codigo que zhace la conexion a la base de datos
require("conexion.php");
//Se obtinen los datos
//Se hace la consulta para obtener los datos de las mascotas
$mascotas ="SELECT *, 
DATE_FORMAT(fecha, '%d / %m / %Y') as fechaF 
FROM donaciones ";
$mascotasRow=[];
$mascotasQuery = $pcn->prepare($mascotas);
if($mascotasQuery->execute($mascotasRow)){
    $resultMascotas = $mascotasQuery->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(array("response"=>"SUCCESS", "detail"=>$resultMascotas));
}else{
    echo json_encode(array("response"=>'ERROR',"detail"=>$mascotasQuery->errorInfo()));
}
 
$conn->close();

?>
