<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/8
 * Time: 2:34
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();
$result = getBugInfo();
echo json_encode($result);
exit;