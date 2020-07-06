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

    $res = $mysqli->query('SELECT * FROM tovars ');

while($row = mysqli_fetch_assoc($res)) {
    $ress = $mysqli->query('SELECT * FROM communication_tovar_color WHERE tovar_id = '.$row['id']);
    $color = "";
    while($rows = mysqli_fetch_assoc($ress)) {
        $color = $rows['color_id'];
    }
    $row['color'] = $color;
    $test[] = $row;
}

echo json_encode($test);

