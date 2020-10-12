<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Access-Control-Allow-Methods: POST, GET');

//$pdo = new PDO("sqlite:pokequiz.db");

$data = ["error" => "404"];
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
    function insertScore($data) {
        // var_dump($this->lastInsertRowID());
    }
    /**
     * 
     */
    function listScore($settings) {
        $sql = '
            SELECT * FROM "scores" WHERE "settings" = "'
        .$settings.'"';

        $data = [];

        $response = $this->query($sql);
        $result = $response->fetchArray(SQLITE3_ASSOC);
        $data[] = $result;

        if(empty($data)) {
            $data = 'empty';
        }

        return $data;
    }
}
$db = new MyDB();
if(!$db) {
    //echo $db->lastErrorMsg();
} else {
    //echo "Opened database successfully\n";
    $data = $db->listScore(json_decode($_POST['payload'], true)['settings']);
    $db->close();
}


// var_dump(json_decode($_POST['payload'], true)['settings']);
echo json_encode($data);