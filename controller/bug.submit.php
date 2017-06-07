<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/7
 * Time: 21:49
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';
$result = array();

$result['project'] = $_POST["project"];
$result['version'] = $_POST["version"];
$result['title'] = $_POST["title"];
$result['date'] = $_POST["date"];
$result['status'] = $_POST["status"];
$result['class'] = $_POST["class"];
$result['description'] = $_POST["description"];
$result['test_name'] = $_COOKIE['__username'];

//插入图片
$dest_floder = substr(dirname(__FILE__), 0, -10) .'images\\';
$tmp_name = $_FILES["picture"]["tmp_name"];
$name = $_FILES["picture"]["name"];
$uploadfile = $dest_floder.$name;
move_uploaded_file($tmp_name,$uploadfile);
$result['img_path'] = $name;

$result['status'] = add_Bug($result);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

echo json_encode($result);
exit;
//--------------------------------------------
function add_Bug($result)
{
    if (addBug($result['project'], $result['version'], $result['title'] ,
    $result['date'] , $result['status'], $result['class'] , $result['description'] ,$result['test_name'],$result['img_path']))
        return Constant::$_CORRECT;
    else
        return Constant::$_DB_INSERT_ERROR;
}


