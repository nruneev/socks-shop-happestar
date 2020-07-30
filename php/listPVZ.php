<?php
$xmldata = file_get_contents("http://integration.cdek.ru/pvzlist/v1/json?cityid=137") or die("Failed to load");

echo ($xmldata);
?>
