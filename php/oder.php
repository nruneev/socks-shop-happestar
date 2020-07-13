<?php
    if(!isset($post['pay'])) $post['pay'] = 0;
    if(!isset($post['delivery'])) $post['delivery'] = 0;

    $mailTovar = '';
    $mailNabor = '';

    $params = [
        'id' => '',
        'orderJson' => isset($_SESSION['basket']) ? json_encode($_SESSION['basket']) : "",
        'promo' => htmlspecialchars($post['promo']),
        'name' => htmlspecialchars($post['name']),
        'surname' => htmlspecialchars($post['surname']),
        'email' => htmlspecialchars($post['email']),
        'phone' => htmlspecialchars($post['phone']),
        'delivery' => htmlspecialchars($post['delivery']),
        'pay' => htmlspecialchars($post['pay']),
        'comment' => htmlspecialchars($post['comment']),
        'address' => htmlspecialchars($post['address']),
        'update_at' => date("Y-m-d H:i:s"),
        'create_at' => date("Y-m-d H:i:s")
    ];

    $query = "";
    foreach ($params as $key => $value) { $query .= ":".$key.", "; }
    $this->db->query('INSERT INTO orders VALUES ('.substr($query, 0, -2).')', $params);
    $id = $this->db->lastInsertId();

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
            $out .= "<td>".$post['surname'] . ' ' . $post['name']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Email</td>";
            $out .= "<td>".$post['email']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Телефон</td>";
            $out .= "<td>".$post['phone']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Доставка</td>";
            $out .= "<td>".$this->deliveryData($post['delivery'])['name']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Оплата</td>";
            $out .= "<td>".$this->payData($post['pay'])['name']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Комментарий к заказу</td>";
            $out .= "<td>".$post['comment']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Адрес</td>";
            $out .= "<td>".$post['address']."</td>";
            $out .= "</tr>";

        $out .= "<tr>";
            $out .= "<td>Общая цена</td>";
            $out .= "<td>".$_SESSION['priceAll']." Руб.</td>";
            $out .= "</tr>";

        $out .= "</table>";

    $out .= "</br>";
    $out .= "</br>";

    $basket = $_SESSION['basket'];
    if(isset($basket['tovars'])) {
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
        $tovars = $basket['tovars'];
        foreach ($tovars as $key => $tovar) {

        $orders = $this->tovarData($tovar['id'])['orders'];
        $orders++;
        $this->db->query("UPDATE tovars SET orders = '".$orders."' WHERE id = " . $tovar['id']);

        $tovarData = $this->tovarData($tovar['id']);
        $size = $this->sizeData($tovar['size']);
        $out .= "<tr>";
            $out .= "<td>".$item++."</td>";
            $out .= "<td><img src='http://happestar.ru".$tovarData['photoMain']."' width=75></td>";
            $out .= "<td>".$tovarData['name']."</td>";
            $out .= "<td>".$tovarData['article']."</td>";
            $out .= "<td>".$size['name']."</td>";
            $out .= "<td>".$tovar['count']."</td>";
            $out .= "<td>".$tovarData['price']." Руб.</td>";
            $out .= "</tr>";
        }
        $out .= "</table>";
    }

    $out .= "</br>";
    $out .= "</br>";

    if(isset($basket['userNabors'])) {
    $item = 1;
    $out .= "<table border=1 cellpadding=5 cellspacing=0>";
        $userNabors = $basket['userNabors'];
        foreach ($userNabors as $key1 => $userNabor) {
        $out .= "<tr>";
            $out .= "<td>Изображение</td>";
            $out .= "<td>Название товара в наборе №".$item++."</td>";
            $out .= "<td>Артикул</td>";
            $out .= "<td>Размер</td>";
            $out .= "<td>Цена</td>";
            $out .= "</tr>";
        foreach ($userNabor['ids'] as $key2 => $id) {
        $tovarData = $this->tovarData($id);
        $size = $this->sizeData($userNabor['sizes'][$key]);
        $out .= "<tr>";
            $out .= "<td><img src='http://happestar.ru".$tovarData['photoMain']."'></td>";
            $out .= "<td>".$tovarData['name']."</td>";
            $out .= "<td>".$tovarData['article']."</td>";
            $out .= "<td>".$size['name']."</td>";
            $out .= "<td>".$tovarData['price']." Руб.</td>";
            $out .= "</tr>";
        }
        $out .= "<tr>";
            $out .= "<td colspan=3>Количество наборов: ".$userNabor['count']." шт</td>";
            $out .= "</tr>";
        }
        $out .= "</table>";
    }

    $out .= "</body>";
    $out .= "</html>";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8";
    $subject = "New order from http://happestar.ru";

    mail("Happestar@mail.ru", "Новый заказ №" . $id, $out, $headers);

    //mail($post['email'], "Ваш заказ подтвержден и оформлен", "Здравствуйте! Спасибо, что выбрали наш интернет-магазин! Ваш заказ №".$id." на сумму ".$_SESSION['priceAll']." руб.");
    mail($post['email'], "Ваш заказ подтвержден и оформлен", $out, $headers);

    unset($_SESSION['basket']);

    return $id;
