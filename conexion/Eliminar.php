<?php
require 'conexionBD.php';
$con= Conectar();
$codigo=stripslashes($_GET["codigo"]);
 $query = sprintf("DELETE FROM suscriptores WHERE codigo = %d",
         mysql_real_escape_string($codigo));  

  $rs  = mysql_query($query);
  mysql_close($con);
  require 'CargarTabla.php';
 


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
