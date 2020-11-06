<?php

    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    require '../YandexCheckout/lib/autoload.php';

    use YandexCheckout\Client;

    $client = new Client();
    $client->setAuth('737451', 'live_pmdK8JaxKPmDQTUGH9ZeXYU9R-yMrw8gOFMnziMiuCw');
    $idempotenceKey = uniqid('', true);
    $response = $client->createPayment(
    array(
        'amount' => array(
            'value' => $_GET['totalPrice'],
            'currency' => 'RUB',
        ),
        'payment_method_data' => array(
            'type' => 'bank_card',
        ),
        'confirmation' => array(
            'type' => 'redirect',
            'return_url' => 'https://happestar.ru/oders?id='.$_GET['id'],
        ),
        'receipt' => [
            'customer' => [
                'email' => $_GET['email']
            ],
            'items' => array([
                'description' => 'Товар из магазина Happestar',
                'quantity' => '1',
                'amount' => [
                    'value' => $_GET['totalPrice'],
                    'currency' => 'RUB',
                ],
                'vat_code' => 1,
            ])
        ],
        'description' => 'Заказ №72',
    ),
    $idempotenceKey
);

//get confirmation url
$confirmationUrl = $response->getConfirmation()->getConfirmationUrl();

echo $confirmationUrl;
