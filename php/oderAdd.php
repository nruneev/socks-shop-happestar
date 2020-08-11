<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set("display_errors", 1);

//require 'phpmailer/PHPMailer.php';
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

$mailTovar = '';
$mailNabor = '';

$params = [
    'orderJson' => isset($_GET['item']) ? json_encode(json_decode($_GET['item'], true)) : "",
    'promo' => htmlspecialchars($_GET['promo']),
    'name' => htmlspecialchars($_GET['name']),
    'surname' => htmlspecialchars($_GET['surname']),
    'email' => htmlspecialchars($_GET['email']),
    'phone' => htmlspecialchars($_GET['phone']),
    'delivery' => htmlspecialchars(1),
    'pay' => htmlspecialchars(0),
    'comment' => htmlspecialchars(''),
    'address' => htmlspecialchars($_GET['address']),
    'update_at' => date("Y-m-d H:i:s"),
    'create_at' => date("Y-m-d H:i:s")
];

$query = "";
foreach ($params as $key => $value) { $query .= ":".$key.", "; }

$config = [
    'host' => 'localhost',
    'name' => 'fpspbmailr_n2',
    'user' => 'nruneev',
    'password' => '1WinnoW1_1',
];

$db = new mysqli($config['host'], $config['user'], $config['password'], $config['name']);
if ($db->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}

$db->query("INSERT INTO orders (orderJson, promo, name, surname, email, phone, delivery_id, pay_id, comment, address, update_at, create_at) VALUES ('".$params['orderJson']."', '".$params['promo']."', '".$params['name']."', '".$params['surname']."', '".$params['email']."', '".$params['phone']."', '".$params['delivery']."', '".$params['pay']."', '".$params['comment']."', '".$params['address']."', '".$params['update_at']."', '".$params['create_at']."')");
$id = $db->insert_id;

$out = '';

$out .= "<html>";
$out .= "<head>";
$out .= "</head>";
$out .= "<body>";

$out .= "<table border=1 cellpadding=5 cellspacing=0>";

$out .= "<tr>";
$out .= "<td>№ заказа</td>";
$out .= "<td>".$id."</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>ФИО</td>";
$out .= "<td>".$_GET['surname'] . ' ' . $_GET['name']."</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>Email</td>";
$out .= "<td>".$_GET['email']."</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>Телефон</td>";
$out .= "<td>".$_GET['phone']."</td>";
$out .= "</tr>";

$delivery = "";
if($_GET['delivery'] === "SDEK") {
    $delivery = "Доставка СДЭК";
} elseif ($_GET['delivery'] === "SDEK_PICKUP") {
    $delivery = "Самовывоз СДЭК";
} elseif ($_GET['delivery'] === "PICKUP") {
    $delivery = "Самовывоз";
} elseif ($_GET['delivery'] === "HAPPESTAR") {
    $delivery = "Курьерская доставка";
}

$out .= "<tr>";
$out .= "<td>Доставка</td>";
$out .= "<td>".($delivery)."</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>Оплата</td>";
$out .= "<td>Наличными при получении</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>Адрес</td>";
$out .= "<td>".$_GET['address']."</td>";
$out .= "</tr>";

$out .= "<tr>";
$out .= "<td>Общая цена</td>";
$out .= "<td>".$_GET['priceAll']." Руб.</td>";
$out .= "</tr>";

$out .= "</table>";

$out .= "</br>";
$out .= "</br>";

$basket = json_decode($_GET['item'], true);
if(isset($basket)) {
    $item = 1;
    $out .= "<table border=1 cellpadding=5 cellspacing=0>";
    $out .= "<tr>";
    $out .= "<td>№</td>";
    $out .= "<td>Изображение</td>";
    $out .= "<td>Название товара</td>";
    $out .= "<td>Артикул</td>";
    $out .= "<td>Размер</td>";
    $out .= "<td>Количество, шт</td>";
    $out .= "<td>Цена</td>";
    $out .= "</tr>";
    $tovars = $basket;
    foreach ($tovars as $key => $tovar) {
        $orders = ($tovar['ids']);
        $orders++;
        $db->query("UPDATE tovars SET orders = '".$orders."' WHERE id = " . $tovar['id']);

        $size = $tovar['sizes'];
        $out .= "<tr>";
        $out .= "<td>".$item++."</td>";
        $out .= "<td><img src='http://happestar.ru".$tovar['src']."' width=75></td>";
        $out .= "<td>".$tovar['name']."</td>";
        $out .= "<td>".$tovar['article']."</td>";
        $out .= "<td>".$size."</td>";
        $out .= "<td>".$tovar['count']."</td>";
        $out .= "<td>".$tovar['cost']." Руб.</td>";
        $out .= "</tr>";
    }
    $out .= "</table>";
}

$out .= "</body>";
$out .= "</html>";

$mail = new PHPMailer(true);
$mail->isSMTP();

$mail->SMTPDebug = 0;

$mail->Host = 'ssl://smtp.mail.ru';

$mail->SMTPAuth = true;
$mail->Username = 'Happestar@mail.ru '; // логин от вашей почты
$mail->Password = '1711rpm'; // пароль от почтового ящика
$mail->SMTPSecure = 'SSL';
$mail->Port = '465';

$mail->CharSet = 'UTF-8';
$mail->From = 'Happestar@mail.ru ';  // адрес почты, с которой идет отправка
$mail->FromName = 'Интернет-Магазин Happestar'; // имя отправителя

try {
    $mail->addAddress($_GET['email'], 'Name');
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mail->isHTML(true);

$mail->Subject = "Ваш заказ №".$id." подтвержден и оформлен";
$mail->Body = $out;
$mail->AltBody = "";

//$mail->SMTPDebug = 1;

try {
    if ($mail->send()) {
        $answer = '1';
    } else {
        $answer = '0';
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mails = new PHPMailer(true);
$mails->isSMTP();

$mails->SMTPDebug = 0;

$mails->Host = 'ssl://smtp.mail.ru';

$mails->SMTPAuth = true;
$mails->Username = 'Happestar@mail.ru '; // логин от вашей почты
$mails->Password = '1711rpm'; // пароль от почтового ящика
$mails->SMTPSecure = 'SSL';
$mails->Port = '465';

$mails->CharSet = 'UTF-8';
$mails->From = 'Happestar@mail.ru';  // адрес почты, с которой идет отправка
$mails->FromName = 'Интернет-Магазин Happestar'; // имя отправителя

try {
    $mails->addAddress('Happestar@mail.ru', 'Name');
} catch (\PHPMailer\PHPMailer\Exception $e) {}

$mails->isHTML(true);

$mails->Subject = "Новый заказ №".$id;
$mails->Body = $out;
$mails->AltBody = "";

//$mail->SMTPDebug = 1;

try {
    if ($mails->send()) {
        $answer = '1';
    } else {
        $answer = '0';
        echo 'Ошибка: ' . $mail->ErrorInfo;
    }
} catch (\PHPMailer\PHPMailer\Exception $e) {}

echo $id;

