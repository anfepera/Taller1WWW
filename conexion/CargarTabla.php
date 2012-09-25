<?php

include 'conexionBD.php';
$conexion = Conectar();

$Query = mysql_query('Select * from suscriptores ', $conexion) or die("<center>No se puede Realizar la consulta linea 18\n</center>\n");

$registros = array();
while ($fila = mysql_fetch_array($Query)) {
    $id = $fila['codigo'];
    $departamento = $fila['departamento'];
    $municipio = $fila['municipio'];
    $nombreSuscriptor = $fila['nombrePrestador'];
    $numeroSuscriptores = $fila['numeroSuscriptores'];
    $registros[] = array($id, $departamento, $municipio,$nombreSuscriptor, $numeroSuscriptores);
   
}

$json_encode = json_encode($registros);
mysql_close($conexion);


echo $json_encode;

?>
