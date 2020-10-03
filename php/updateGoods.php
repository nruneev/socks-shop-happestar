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
    $uploaddirs = '/public/images/tovars/';

    if (isset($_FILES)) {
        if (file_exists($uploaddir . basename($_FILES['inputfile']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['inputfile']['name']);
            if (move_uploaded_file($_FILES['inputfile']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        if (file_exists($uploaddir . basename($_FILES['inputfile2']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileDetail = $uploaddir . basename($_FILES['inputfile2']['name']);
            if (move_uploaded_file($_FILES['inputfile2']['tmp_name'], $uploadfileDetail)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        if (file_exists($uploaddir . basename($_FILES['inputfile3']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileLeft = $uploaddir . basename($_FILES['inputfile3']['name']);
            if (move_uploaded_file($_FILES['inputfile3']['tmp_name'], $uploadfileLeft)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $uploadfileMain1 = $uploaddirs . basename($_FILES['inputfile']['name']);
        $uploadfileDetail1 = $uploaddirs . basename($_FILES['inputfile2']['name']);
        $uploadfileLeft1 = $uploaddirs . basename($_FILES['inputfile3']['name']);

        $new = 0;
        $visibility = 0;

        if ($_POST['new'] == "on") {
            $new = 1;
        }
        if ($_POST['visibility'] == "on") {
            $visibility = 1;
        }

        $mysqli->query("UPDATE tovars SET name='" . $_POST['name'] . "',description='" . $_POST['description'] . "',composition='" . $_POST['composition'] . "',article='" . $_POST['article'] . "',photoMain='" . $uploadfileMain1 . "',photoDetail='" . $uploadfileDetail1 . "',photoLeft='" . $uploadfileLeft1 . "',price=" . $_POST['price'] . ",discount='" . $_POST['discount'] . "',new=" . $new . ",update_at='" . date("Y-m-d H:i:s") . "',visibly=" . $visibility . " WHERE `id`=" . $_POST['idOder']);
    } else{
        $new = 0;
        $visibility = 0;

        if ($_POST['new'] == "on") {
            $new = 1;
        }
        if ($_POST['visibility'] == "on") {
            $visibility = 1;
        }

        $mysqli->query("UPDATE tovars SET name='" . $_POST['name'] . "',description='" . $_POST['description'] . "',composition='" . $_POST['composition'] . "',article='" . $_POST['article'] . "',price=" . $_POST['price'] . ",discount='" . $_POST['discount'] . "',new=" . $new . ",update_at='" . date("Y-m-d H:i:s") . "',visibly=" . $visibility . " WHERE `id`=" . $_POST['idOder']);
    }
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

    $mysqli->query("UPDATE `communication_tovar_color` SET `color_id`=$color,`update_at`='".`date("Y-m-d H:i:s")`."' WHERE tovar_id=".$_POST['idOder']);

header('Location: /admin/good');
