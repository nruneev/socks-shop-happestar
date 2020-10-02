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

$mysqli->query('UPDATE articles SET article="'.$_POST['main'].'", update_at="'.date("Y-m-d H:i:s").'" WHERE page="main"');

$mysqli->query('UPDATE articles SET article="'.$_POST['historyBrand'].'", update_at="'.date("Y-m-d H:i:s").'" WHERE page="historyBrand"');

$mysqli->query('UPDATE articles SET article="'.$_POST['payAndDelivery'].'", update_at="'.date("Y-m-d H:i:s").'" WHERE page="payAndDelivery"');

$mysqli->query('UPDATE articles SET article="'.$_POST['gooder'].'", update_at="'.date("Y-m-d H:i:s").'" WHERE page="customer"');

header('Location: /admin/text');
