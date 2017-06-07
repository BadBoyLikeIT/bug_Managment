<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/6
 * Time: 23:04
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();
$result = getProjectInfo();
echo json_encode($result);
exit;

//---------------------------------------

