<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2017/6/8
 * Time: 23:50
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';
$result = array();

$result['description'] = $_POST["description1"];
$result['id'] = $_POST["id"];

//插入图片
$dest_floder = substr(dirname(__FILE__), 0, -10) .'images\\';
$tmp_name = $_FILES["picture"]["tmp_name"];
$name = $_FILES["picture"]["name"];
$uploadfile = $dest_floder.$name;
move_uploaded_file($tmp_name,$uploadfile);
$result['img_path'] = $name;

$result['status'] = update_Bug($result);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

echo json_encode($result);
exit;
//--------------------------------------------
function update_Bug($result)
{   $date = date('y-m-d h:i:s',time());
    if (updateBug($result['id'], $result['description'], $result['img_path'],$date))
        return Constant::$_CORRECT;
    else
        return Constant::$_DB_UPDATE_ERROR;
}



