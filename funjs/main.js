var CORRECT = 100; //正确

var USERNAME_ERROR = 201; //用户名错误
//-------------------------------------------------------
var USERNAME_BLANK_ERROR = 2010; //用户名为空
var USERNAME_LENGTH_ERROR = 2011; //用户名长度不符合要求
var USERNAME_FORMAT_ERROR = 2012; //用户名格式错误
var USERNAME_REPEAT_ERROR = 2013; //用户名重复
var USERNAME_NOT_FOUND_ERROR = 2014; //没有找到该用户

var PASSWORD_ERROR = 202; //密码错误
//-------------------------------------------------------
var PASSWORD_BLANK_ERROR = 2020; //密码为空
var PASSWORD_LENGTH_ERROR = 2021; //密码长度不符合要求
var PASSWORD_INCONSISTENT_ERROR = 2022; //密码输入不一致
var PASSWORD_INCORRECT_ERROR = 2023; //密码错误

var INVITATION_CODE_ERROR = 203; //无效的邀请码

var DB_INSERT_ERROR = 301; //未知的INSERT错误
var DB_SELECT_ERROR = 302;     //数据库查询错误

var NOT_LOGIN = 400;   //没有登录
var NO_PERMISSION = 401;   //没有权限访问该页面
var TOKEN_INCORRECT = 402; //__token 不符合
var GROUPOF_GET_ERROR = 403; //GROUPOF获取失败

function errorcode2errorinfo(errorcode) {
    switch (errorcode) {
        case USERNAME_ERROR:
            return "用户名错误";
        case USERNAME_BLANK_ERROR:
            return "用户名为空";
        case USERNAME_LENGTH_ERROR:
            return "用户名长度不符合要求";
        case USERNAME_FORMAT_ERROR:
            return "用户名格式错误";
        case USERNAME_REPEAT_ERROR:
            return "用户名已存在";
        case USERNAME_NOT_FOUND_ERROR:
            return "该用户不存在";
        case PASSWORD_ERROR:
            return "密码错误";
        case PASSWORD_BLANK_ERROR:
            return "密码为空";
        case PASSWORD_LENGTH_ERROR:
            return "密码长度不符合要求";
        case PASSWORD_INCONSISTENT_ERROR:
            return "确认密码输入不一致";
        case PASSWORD_INCORRECT_ERROR:
            return "密码错误";
        case INVITATION_CODE_ERROR:
            return "无效的邀请码";
        case DB_INSERT_ERROR:
            return "未知的INSERT错误";
        case DB_SELECT_ERROR:
            return "未知的SELECT错误";
        case NOT_LOGIN:
            return "未登录";
        case NO_PERMISSION:
            return "没有权限访问该页面";
        case TOKEN_INCORRECT:
            return "TOKEN不正确";
        case GROUPOF_GET_ERROR:
            return "GROUPOF获取失败";
    }
}