<?php

if ($_GET["op"]=="agregar")
    require 'Agregar.php';
if ($_GET["op"]=="eliminar")
    require 'Eliminar.php';
if ($_GET["op"]=="editar")
    require 'Editar.php';


?>
