<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/21
 * Time: 21:06
 */

/**
 * @param $value //用户名
 * @return bool     //表中是否存在相同用户名
 */
function isExist($value)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    //php 数据库预处理命令
    $sql = "SELECT `id` FROM `tb_user` WHERE `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $value);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}

/**
 * @param $value1 //用户名
 * @param $value2 //密码
 * @return bool     //是否存在该用户
 */
function attemptLogin($value1, $value2)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `username` = ? AND `password` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $value1, $value2);
    $stmt->execute();

    $stmt->store_result();//为了后面的fetch能够调用返回俩的缓冲数据
    $stmt->bind_result($ids);  //绑定查询回来的id给stmt

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}


function getGroup($username)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `groupof` FROM `tb_user` WHERE `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",  $username);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($groupof);


    while ($stmt->fetch()) {
        $result = $groupof;
//$result会存在隐患
    }
    $stmt->close();
    $con->close();
    return $result;

}

/**
 * @param $token //__token
 * @param $name //用户名
 * @param $password //密码
 * @param $invitation_code //邀请码
 * @return bool //是否添加成功
 */
function addUser($token, $name, $password, $work_num,$groupof,$department,$workdate)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");

    $sql = "INSERT INTO `tb_user` (
                    `token`,
                    `username`,
                    `password`,
                    `work_num`,
                    `groupof`,
                    `department`,
                    `workdate`
              ) VALUE (?, ?, ?, ?,?,?,?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisss", $token, $name, $password,$work_num,$groupof,$department,$workdate );
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

function getLeaderId($name)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",  $name);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id);


    while ($stmt->fetch()) {
        $result = $id;
    }
    $stmt->close();
    $con->close();
    return $result;

}
function getLeaderName_id($id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `username` FROM `tb_user` WHERE `id` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i",  $id);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($name);

    $result = null;
    while ($stmt->fetch()) {
        $result = $name;
    }
    $stmt->close();
    $con->close();
    return $result;

}
function getLeaderName($name)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `leader_id` FROM `tb_project` WHERE `title` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",  $name);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id);

    $result = null;
    while ($stmt->fetch()) {
        $result = $id;
    }
    $result = getLeaderName_id($result);
    $stmt->close();
    $con->close();
    return $result;

}
function getProjectId($name)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_project` WHERE `title` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",  $name);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id);


    while ($stmt->fetch()) {
        $result = $id;

    }
    $stmt->close();
    $con->close();
    return $result;

}

/*
 * 因为Version的title不唯一，所以不能作为索引
 *
 * */
//function getVersionId($name)
//{
//    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
//    $con->query("SET NAMES UTF8;");
//    $sql = "SELECT `id` FROM `tb_version` WHERE `title` = ? LIMIT 1";
//    $stmt = $con->prepare($sql);
//    $stmt->bind_param("s",  $name);
//    $stmt->execute();
//
//    $stmt->store_result();
//    $stmt->bind_result($id);
//
//
//    while ($stmt->fetch()) {
//        $result = $id;
//
//    }
//    $stmt->close();
//    $con->close();
//    return $result;
//
//}


function addProject($project_name, $description, $leader, $date)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $leader_id = getLeaderId($leader);
    $sql = "INSERT INTO `tb_project` (
                    `leader_id`,
                    `title`,
                    `description`,
                    `date`
              ) VALUE (?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("isss", $leader_id, $project_name, $description,$date );
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}


function addVersion($project_name, $version_name, $description, $date)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $p_id = getProjectId($project_name);
    $sql = "INSERT INTO `tb_version` (
                    `p_id`,
                    `title`,
                    `description`,
                    `date`
              ) VALUE (?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("isss", $p_id, $version_name, $description,$date );
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

function addBug($project, $version, $title, $date, $status, $class , $description, $testName,$imgPath)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $leaderName = getLeaderName($project);
    $sql = "INSERT INTO `tb_bug` (
                    `p_name`,
                    `v_name`,
                    `title`,
                    `publish_time`,
                    `status`,
                    `class`,
                    `description`,
                    `tester_name`,
                    `developer_name`,
                    `img_path`
              ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssssssss", $project, $version, $title, $date, $status, $class , $description, $testName,$leaderName,$imgPath);
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}
/**
 * @param $token //__token
 * @return bool //token 是否存在
 */
function checkToken($token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `token` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $result = false;
    while ($stmt->fetch()) {
        $result = true;

    }

    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $token //__token
 * @param $username //用户名
 * @return array    //用户信息--数组，否则为空
 */
function getUserInfo($token, $username)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `username`, `balance`, `invitation_code` FROM `tb_user` WHERE `token` = ? AND `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $token, $username);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($username, $balance, $invitation_code);

    $result = array();
    while ($stmt->fetch()) {
        $result['username'] = $username;
        $result['balance'] = $balance;
        $result['invitation_code'] = $invitation_code;
    }
    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $token //用户token
 * @return array    //多条用户申请表
 */
function getUserApply($token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `project_id`, `status` FROM `tb_apply` WHERE `user_token` = ? ORDER BY `id` DESC";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $project_id, $status);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['project_id'] = $project_id;
        switch ($status) {
            case 0:
                $item['status'] = "待审核";
                break;
            case 1:
                $item['status'] = "审核通过";
                break;
            case 2:
                $item['status'] = "审核拒绝";
                break;
        }
        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $array //报名表信息-数组
 * @return bool //是否报名成功
 */
function submitApply($array)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "INSERT INTO `tb_apply` (
                    `user_token`,
                    `project_id`,
                    `name`,
                    `gender`,
                    `nationality`,
                    `phone_number`,
                    `email`,
                    `wechat`,
                    `id_card_number`,
                    `passport_number`,
                    `province`,
                    `post_address`,
                    `city_of_departure`,
                    `emergency_contact_name`,
                    `emergency_contact_phone_number`,
                    `occupation`,
                    `duration`,
                    `start_date`,
                    `diet_requirement`,
                    `is_medical_history`,
                    `medical_history`,
                    `is_first_go_abroad`,
                    `english_level`,
                    `is_need_insurance`,
                    `is_apply_interview`,
                    `interview_date`
              ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("sisisssssssssssiissisiiiis",
        $array['user_token'],
        $array['project'],
        $array['name'],
        $array['gender'],
        $array['nationality'],
        $array['phone_number'],
        $array['email'],
        $array['wechat'],
        $array['id_card_number'],
        $array['passport_number'],
        $array['province'],
        $array['post_address'],
        $array['city_of_departure'],
        $array['emergency_contact_name'],
        $array['emergency_contact_phone_number'],
        $array['occupation'],
        $array['duration'],
        $array['start_date'],
        $array['diet_requirement'],
        $array['is_medical_history'],
        $array['medical_history'],
        $array['is_first_go_abroad'],
        $array['english_level'],
        $array['is_need_insurance'],
        $array['is_apply_interview'],
        $array['interview_date']
    );
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

/**
 * @return int 返回项目数量
 */
function getProjectCount()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_project`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $count = $stmt->num_rows;
    $stmt->close();
    $con->close();
    return $count;
}

function getName($id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `username` FROM `tb_user` WHERE `id` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($name);

    $result = null;
    while ($stmt->fetch()) {
        $result = $name;

    }
    $stmt->close();
    $con->close();
    return $result;

}
function getVersionCurrentName($p_id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `title` FROM `tb_version` WHERE `p_id` = ? ORDER BY `id` DESC LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",$p_id);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($VersionCurrentName);

    $result = null;
    while ($stmt->fetch()) {
        $result = $VersionCurrentName;

    }
    $stmt->close();
    $con->close();
    return $result;

}
//这个地方可以修改一部分
/**
 * @param $start //查询起始
 * @param $num //查询数目
 * @return array    //返回项目信息
 */
function getProjectInfo()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `title`, `leader_id`, `description`, `date` FROM `tb_project`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name, $leader_id, $description, $date);

    $result = array();
    //$result['status'] = false;
    $index = 0;
    while ($stmt->fetch()) {
        //$result['status'] = true;
        $item = array();
        $item['id'] = $id;
        $item['name'] = $name;
        $item['leader_id'] = $leader_id;
        $item['leader_name'] = getName($leader_id);
        $item['version'] = getVersionCurrentName($id);
        $item['description'] = $description;
        $item['date'] = $date;

        $result[$index]=$item;
        $index++;
    }
    $stmt->close();
    $con->close();
    return $result;
}
function getBugInfo()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `title`, `p_name`, `v_name`, `class`, `status`, `developer_name` FROM `tb_bug`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $title, $p_name, $v_name, $class,$status,$developer_name);

    $result = array();
    //$result['status'] = false;
    $index = 0;
    while ($stmt->fetch()) {
        //$result['status'] = true;
        $item = array();
        $item['id'] = $id;
        $item['title'] = $title;
        $item['p_name'] = $p_name;
        $item['v_name'] = $v_name;
        $item['class'] = $class;
        $item['status'] = $status;
        $item['developer_name'] = $developer_name;

        $result[$index]=$item;
        $index++;
    }
    $stmt->close();
    $con->close();
    return $result;
}
function getBugSingleInfo($id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `title`, `p_name`, `v_name`, `class`, `status`, `developer_name` ,`description`,`tester_name`,`publish_time`,`solve_time`,`img_path`FROM `tb_bug` WHERE `id` = ? ";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result( $title, $p_name, $v_name, $class,$status,$developer_name,$description,$tester_name,$publish_time,$solve_time,$img_path);

    $result = array();
    //$result['status'] = false;
    //这个地方导致是一个二维数组
    $index = 0;
    while ($stmt->fetch()) {
        //$result['status'] = true;
        $item = array();
        $item['title'] = $title;
        $item['p_name'] = $p_name;
        $item['v_name'] = $v_name;
        $item['class'] = $class;
        $item['status'] = $status;
        $item['developer_name'] = $developer_name;
        $item['description'] = $description;
        $item['tester_name'] = $tester_name;
        $item['publish_time'] = $publish_time;
        $item['solve_time'] = $solve_time;
        $item['img_path'] = $img_path;

        $result[$index]=$item;
        $index++;
    }
    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @return array 为报名表页面获取项目的ID和名称列表
 */
function getProjectIdAndName()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `acpname` FROM `tb_project`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['name'] = $name;
        $result[$id] = $item;
    }

    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $token //用户的token
 * @param $pwd //待验证用户的密码
 * @return bool     //提供的密码和指定的用户（token）密码是否一致
 */
function checkPassword($token, $pwd)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_user` WHERE `token` = ? AND `password` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $token, $pwd);
    $stmt->execute();
    $stmt->store_result();

    $return = $stmt->fetch();

    $stmt->close();
    $con->close();
    return $return;
}

/**
 * @param $old_token //旧token
 * @param $name //姓名
 * @param $pwd //密码
 * @param $token //新token
 * @return int 返回影响行数
 */
function updateUserInfo($old_token, $name, $pwd, $token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "UPDATE `tb_user` SET `token` = ?, `username` = ?, `password` = ? 
WHERE `token` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssss", $token, $name, $pwd, $old_token);

    $stmt->execute();
    $stmt->store_result();
    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}
function updateBug($id, $description, $img_path,$date)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "UPDATE `tb_bug` SET `description` = ?, `img_path` = ?, `status` = ? , `solve_time` = ? 
WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $status = 'noActive';
    $stmt->bind_param("ssssi", $description, $img_path, $status, $date,$id);

    $stmt->execute();
    $stmt->store_result();
    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}

/**
 * @param $id //项目id
 * @return mixed    //该项目的详细信息
 */
function getProjectDetail($id)
{
    $con = new PDO('mysql:host=localhost;dbname=db_acp', DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");

    $sql = "SELECT * FROM `tb_project` WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(1, $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchObject();
}
