<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 16:23
 */

function generateToken($username, $password, $salt)
{
    $cookies = array();
    $cookies['username'] = $username;
    $cookies['password'] = $password;
    $cookies['salt'] = $salt;
    return md5(serialize($cookies));
}
//token的作用是用户认证

function toUTF8($str)
{
    $encode = mb_detect_encoding($str, array('ASCII', 'UTF-8', 'GB2312', 'GBK'));
    //mb_detect_encoding 检测字符串的编码格式
    if (!$encode == 'UTF-8') {
        $str = iconv('UTF-8', $encode, $str);
    }
    return $str;
}

function logout($cookie1, $cookie2)
{
    setcookie($cookie1, FALSE, time() - 1);
    setcookie($cookie2, FALSE, time() - 1);
}
//设置cookie的有效期为当前时间的上一秒
//退出时为了清除cookie；