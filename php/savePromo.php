<?php

$config = [
    'host' => 'localhost',
    'name' => 'fpspbmailr_n2',
    'user' => 'nruneev',
    'password' => '1WinnoW1_1',
];
$mysqli = new mysqli($config['host'], $config['user'], $config['password'], $config['name']);
if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli->query('INSERT INTO promos (promo, price) VALUES ('.$_GET["promo"].','.$_GET["price"])) {
    echo "Сообщение ошибки: %s\n". $mysqli->error;
}

echo 'ok';
