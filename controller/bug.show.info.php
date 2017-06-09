<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/8
 * Time: 17:08
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$id = $_POST["id"];
$result = array();
$result = getBugSingleInfo($id);
echo json_encode($result);
exit;