<?php
$ch = curl_init('https://www.instagram.com/happestar/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false); // true - чтобы вывести заголовки
$html = curl_exec($ch);
curl_close($ch);

// Удаление управляющих символов
for ($i = 0; $i <= 31; ++$i) {
    $html = str_replace(chr($i), '', $html);
}

// Удаление символа Delete
$html = str_replace(chr(127), '', $html);

$data = array();

preg_match_all('/<script type="text\/javascript">window\._sharedData = \{(.*)\};<\/script>/ism', $html, $matches);
if (!empty($matches[1][0])) {
    $res = json_decode('{' . $matches[1][0] . '}', true);

    $media = $res['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'];
    if (!empty($media)) {
        foreach ($media as $row) {
            //print_r($row['node']);
            $data[] = json_encode([
                'id'       => $row['node']['id'],
                'image'    => $row['node']['thumbnail_src'],
            ]);
        }
    }
}

echo json_encode($data);
