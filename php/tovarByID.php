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

    $res = $mysqli->query('SELECT t.*, color.color_id FROM tovars t LEFT JOIN communication_tovar_color color on t.id = color.tovar_id Where t.id = '.$_GET['id']);

    while($row = mysqli_fetch_assoc($res)) {
        $test = $row;
    }

    echo json_encode([$test]);

