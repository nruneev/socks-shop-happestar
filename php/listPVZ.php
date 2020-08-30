<?php
$xmldata = file_get_contents("http://integration.cdek.ru/pvzlist/v1/json?cityid=".$_GET['ID_City']) or die("Failed to load");

echo ($xmldata);
?>
