<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/6
 * Time: 20:53
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';
$result = array();

$result['project_name'] = $_POST["project"];
$result['date'] = $_POST["date"];
$result['leader'] = $_POST["leader"];
$result['description'] = $_POST["description"];
$result['version_name'] = $_POST["version"];
$result['description1'] = $_POST["description1"];

$result['status'] = add_Project($result);
$result['status'] = add_Version($result);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

echo json_encode($result);
exit;
//--------------------------------------------
function add_Project($result)
{
    if (addProject($result['project_name'], $result['description'], $result['leader'], $result['date']))
        return Constant::$_CORRECT;
    else
        return Constant::$_DB_INSERT_ERROR;
}
function add_Version($result)
{
    if (addVersion($result['project_name'], $result['version_name'], $result['description1'], $result['date']))
        return Constant::$_CORRECT;
    else
        return Constant::$_DB_INSERT_ERROR;
}

