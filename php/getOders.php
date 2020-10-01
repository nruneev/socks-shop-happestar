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

$res = $mysqli->query('SELECT * FROM oders ');

$test = array();

while($row = mysqli_fetch_assoc($res)) {
    $row['orderJson'] = json_decode($row['orderJson']);
    $test[] = $row;
}

echo json_encode($test);
