<?php
//Se llama al codigo que zhace la conexion a la base de datos
require("conexion.php");
//Se obtinen los datos
$raza=$_POST['raza'];
//Se hace la consulta para obtener los datos de las mascotas
$mascotas ="SELECT id, nombre, foto
FROM mascotas 
WHERE raza = :raza";
$mascotasRow=[
    'raza'=>$raza
];
$mascotasQuery = $pcn->prepare($mascotas);
if($mascotasQuery->execute($mascotasRow)){
    $resultMascotas = $mascotasQuery->fetchAll(PDO::FETCH_ASSOC);
    $solAdop ="SELECT idMascota
    FROM  solicitudesadopcion
    WHERE estatus = :solicitado OR estatus = :adoptado";
    $solAdopRow=[
        'solicitado'=>0,
        'adoptado'=>1
    ];
    $solAdopQuery = $pcn->prepare($solAdop);
    if($solAdopQuery->execute($solAdopRow)){
        $resultSolAdop = $solAdopQuery->fetchAll(PDO::FETCH_ASSOC);
        $arrSA = array();
        $arrMA = array();
        foreach ($resultSolAdop as $key) {
            array_push($arrSA,$key['idMascota']);
        }
        foreach ($resultMascotas as $key1) {
            if (in_array($key1['id'], $arrSA)==false) {
                array_push($arrMA,$key1);
            }
        }
        echo json_encode(array("response"=>"SUCCESS", "detail"=>$arrMA));
    }else{
        echo json_encode(array("response"=>'ERROR',"detail"=>$solAdopQuery->errorInfo()));
    }
}else{
    echo json_encode(array("response"=>'ERROR',"detail"=>$mascotasQuery->errorInfo()));
}

$conn->close();

?>
