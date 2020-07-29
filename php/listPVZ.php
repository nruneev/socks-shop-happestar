<?php
$xmldata = file_get_contents("https://integration.cdek.ru/pvzlist/v1/json") or die("Failed to load");

echo ($xmldata);
?>
