<?php
if (PHP_VERSION < '5.3.29') {
    exit('当前PHP版本低于5.3.29，请升级版本！');
}
define('ROOT_PATH', substr(dirname(__FILE__), 0, -6));
/*__FILE__ 得到的就是完整路径 应该是一个超全局变量      即 /home/data/demo/test.php ，而
  dirname(__FILE__)得到路径部分   即 /home/data/demo     （后面没有“/”号）
  substr(string,start,length)
 */
require ROOT_PATH . 'common\global.func.php';
require ROOT_PATH . 'common\mysql.func.php';
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', '');
define('DB_NAME', 'db_debug');


/*
define('DB_HOST', 'bdm255611201.my3w.com');
define('DB_USER', 'bdm255611201');
define('DB_PWD', 'QFynXANCxVdXm2q7');
define('DB_NAME', 'bdm255611201_db');
 * */