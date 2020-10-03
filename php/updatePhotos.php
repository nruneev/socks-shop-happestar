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

    if ($_FILES['mainPageSlider1photo']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageSlider1photo']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageSlider1photo']['name']);
            if (move_uploaded_file($_FILES['mainPageSlider1photo']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageSlider1photo']['name'])."' WHERE id = 1");
    }

    if ($_FILES['mainPageSlider2photo']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageSlider2photo']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageSlider2photo']['name']);
            if (move_uploaded_file($_FILES['mainPageSlider2photo']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageSlider2photo']['name'])."' WHERE id = 2");
    }

    if ($_FILES['mainPageSlider3photo']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageSlider3photo']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageSlider3photo']['name']);
            if (move_uploaded_file($_FILES['mainPageSlider3photo']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageSlider3photo']['name'])."' WHERE id = 3");
    }

    if ($_FILES['mainPageTopLeftPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageTopLeftPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageTopLeftPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageTopLeftPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageTopLeftPhoto']['name'])."' WHERE id = 4");
    }

    if ($_FILES['mainPageTopCenterPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageTopCenterPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageTopCenterPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageTopCenterPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageTopCenterPhoto']['name'])."' WHERE id = 5");
    }

    if ($_FILES['mainPageTopRightPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageTopRightPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageTopRightPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageTopRightPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageTopRightPhoto']['name'])."' WHERE id = 6");
    }

    if ($_FILES['mainPageCenterPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageCenterPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageCenterPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageCenterPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageCenterPhoto']['name'])."' WHERE id = 7");
    }

    if ($_FILES['mainPageBottomLeftPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageBottomLeftPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageBottomLeftPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageBottomLeftPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageBottomLeftPhoto']['name'])."' WHERE id = 8");
    }

    if ($_FILES['mainPageBottomRightPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['mainPageBottomRightPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['mainPageBottomRightPhoto']['name']);
            if (move_uploaded_file($_FILES['mainPageBottomRightPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['mainPageBottomRightPhoto']['name'])."' WHERE id = 9");
    }

    if ($_FILES['BrandHistoryPhoto']['tmp_name']){
        if (file_exists($uploaddir . basename($_FILES['BrandHistoryPhoto']['name']))) {
            echo "The file exists";
        } else {
            $uploadfileMain = $uploaddir . basename($_FILES['BrandHistoryPhoto']['name']);
            if (move_uploaded_file($_FILES['BrandHistoryPhoto']['tmp_name'], $uploadfileMain)) {
                echo("Файл корректен и был успешно загружен.\n");
            } else {
                echo("Возможная атака с помощью файловой загрузки!\n");
            }
        }

        $mysqli->query("UPDATE photos SET src = '".$uploaddirs . basename($_FILES['BrandHistoryPhoto']['name'])."' WHERE id = 10");
    }

    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageSlider1']."' WHERE id = 1");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageSlider2']."' WHERE id = 2");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageSlider3']."' WHERE id = 3");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageTopLeft']."' WHERE id = 4");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageTopCenter']."' WHERE id = 5");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageTopRight']."' WHERE id = 6");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageBottomLeft']."' WHERE id = 8");
    $mysqli->query("UPDATE photos SET text = '".$_POST['mainPageBottomRight']."' WHERE id = 9");


    header('Location: /admin/photo');
