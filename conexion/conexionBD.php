<?php

function Conectar() 
{

    $Host = 'mysql';
    $User = 'anfepera';
    $password = 'anfepera';
    $BD = 'anfepera';

//    $registros[] = array();
    $Conexion = mysql_connect($Host, $User, $password) or die("<center>No se puede conectar con la base de datos\n</center>\n");
    $bool =  mysql_select_db($BD, $Conexion);
if ($bool==false) {
    print "NO se pudo seleccionar La $BD";
}
   
    return $Conexion;
}

?>
