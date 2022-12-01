<?php
//Se llama al codigo que zhace la conexion a la base de datos
require("conexion.php");
//Se obtinen los datos
$id=$_POST['id'];
//Se hace la consulta para obtener los datos de las mascotas
$mascotas ="DELETE 
FROM `mascotas` 
WHERE id=:id";
$mascotasRow=[
    'id'=>$id
];
$mascotasQuery = $pcn->prepare($mascotas);
if($mascotasQuery->execute($mascotasRow)){
    $solicitudes ="DELETE 
    FROM `solicitudesadopcion` 
    WHERE idMascota = :idMascota";
    $solicitudesRow=[
        'idMascota'=>$id
    ];
    $solicitudesQuery = $pcn->prepare($solicitudes);
    if($solicitudesQuery->execute($solicitudesRow)){
        echo json_encode(array("response"=>"SUCCESS", "detail"=>"La mascota ha sido eliminada"));
    }else{
        echo json_encode(array("response"=>'ERROR',"detail"=>$solicitudesQuery->errorInfo()));
    }
}else{
    echo json_encode(array("response"=>'ERROR',"detail"=>$mascotasQuery->errorInfo()));
}
 
$conn->close();

?>