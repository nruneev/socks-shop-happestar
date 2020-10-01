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

    $res = $mysqli->query('Delete FROM orders WHERE id = '.$_GET['idOder']);

    $test = array();

    $result = mysqli_query($mysqli, $res) or die("Ошибка " . mysqli_error($mysqli));

    echo 'ok';
