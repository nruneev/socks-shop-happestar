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

    $uploaddir = '/var/www/html/public/images/tovars/';
    $uploadfileMain = $uploaddir . basename($_FILES['inputfile']['name']);
    $uploadfileDetail = $uploaddir . basename($_FILES['inputfile2']['name']);
    $uploadfileLeft = $uploaddir . basename($_FILES['inputfile3']['name']);


    if (move_uploaded_file($_FILES['inputfile']['tmp_name'], $uploadfileMain)) {
        echo("Файл корректен и был успешно загружен.\n");
    } else {
        echo("Возможная атака с помощью файловой загрузки!\n");
    }

    if (move_uploaded_file($_FILES['inputfile2']['tmp_name'], $uploadfileDetail)) {
        echo("Файл корректен и был успешно загружен.\n");
    } else {
        echo("Возможная атака с помощью файловой загрузки!\n");
    }

    if (move_uploaded_file($_FILES['inputfile3']['tmp_name'], $uploadfileLeft)) {
        echo("Файл корректен и был успешно загружен.\n");
    } else {
        echo("Возможная атака с помощью файловой загрузки!\n");
    }

    $uploaddirs = '/public/images/tovars/';
    $uploadfileMain1 = $uploaddirs . basename($_FILES['inputfile']['name']);
    $uploadfileDetail1 = $uploaddirs . basename($_FILES['inputfile2']['name']);
    $uploadfileLeft1 = $uploaddirs . basename($_FILES['inputfile3']['name']);


    $mysqli->query("INSERT INTO tovars(name, description, composition, article, photoMain, photoDetail, photoLeft, price, discount, orders, new, update_at, create_at, visibly) VALUES ('".$_POST['name']."','".$_POST['description']."','".$_POST['composition']."','".$_POST['article']."','".$uploadfileMain1."','".$uploadfileDetail1."','".$uploadfileLeft1."',".$_POST['price'].",".$_POST['discount'].",0,1,'".date("Y-m-d H:i:s")."','".date("Y-m-d H:i:s")."',1)");

    $color = 0;

    switch ($_POST['color']) {
        case 'gray':
            $color = 1;
            break;
        case 'black':
            $color = 2;
            break;
        case 'white':
            $color = 3;
            break;
        case 'red':
            $color = 4;
            break;
        case 'orange':
            $color = 5;
            break;
        case 'yellow':
            $color = 6;
            break;
        case 'green':
            $color = 7;
            break;
        case 'pink':
            $color = 8;
            break;
        case 'blue':
            $color = 9;
            break;
        case 'gradient':
            $color = 10;
            break;
    }

    $id = intval($mysqli->insert_id);

    $mysqli->query("INSERT INTO communication_tovar_color(tovar_id, color_id, update_at, create_at) VALUES (".$id.", ".$color.",'".date("Y-m-d H:i:s")."','".date("Y-m-d H:i:s")."')");

    header('Location: /admin/good');
