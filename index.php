<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Access-Control-Allow-Methods: POST, GET');

$data = [];
//adminer link : http://localhost:8000/test/adminer-sqlite.php?sqlite=&username=&db=pokequiz.db
// https://github.com/FrancoisCapon/LoginToASqlite3DatabaseWithoutCredentialsWithAdminer
if (!extension_loaded('sqlite3')) exit('Module sqlite3 not loaded');

class MyDB extends SQLite3 {
    function __construct() {
        $this->open('pokequiz.db');
    }
    /**
     * 
     */
    function insertScore($name, $settings, $score, $time, $alternateForms, $hints) {

        $data = [
            "error" => false,
        ];

        $statement = $this->prepare('
            INSERT INTO "scores" (name, settings, score, time, alternateForms, hints) VALUES (:name, :settings, :score, :time, :alternateForms, :hints)
        ');

        $statement->bindValue(':name', $name);
        $statement->bindValue(':settings', $settings);
        $statement->bindValue(':score', $score);
        $statement->bindValue(':time', $time);
        $statement->bindValue(':alternateForms', $alternateForms);
        $statement->bindValue(':hints', $hints);

        $result = $statement->execute();

        if($result) {

            $data = [
                "id" => $this->lastInsertRowID()
            ];
        }

        else $data['error'] = true;

        return $data;
    }
    /**
     * 
     */
    function listScore($settings, $alternateForms, $hints) {

        $data = [
            "error" => false,
            "empty" => true
        ];

        $sql = '
            SELECT * FROM "scores" WHERE "settings" = "'.$settings.'" AND "alternateForms" = "'.$alternateForms.'" AND "hints" = "'.$hints.'"  ORDER BY "score" DESC, "time" ASC
        ';


        $response = $this->query($sql);

        if(!$response) {
            $data['error'] = true;
        }

        else {

            while($result = $response->fetchArray(SQLITE3_ASSOC)) {
                $data['result'][] = $result;
                $data['empty'] = false;
            }
        }

        return $data;

    }
}

$route = 'select';
if(isset($_GET['route'])) {
    $route = $_GET['route'];
}

$params = json_decode($_POST['payload'], true);
$db = new MyDB();


if(!$db) {
    $data['error'] = true;
} else {

    switch($route) {
        case 'select':
            $data = $db->listScore($params['settings'], $params['alternateForms'], $params['hints']);
        break;

        case 'add':
            $data = $db->insertScore($params['name'], $params['settings'], $params['score'], $params['time'], $params['alternateForms'], $params['hints']);
        break;
    }

    
    $db->close();
}

echo json_encode($data);