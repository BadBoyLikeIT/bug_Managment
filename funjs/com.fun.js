/**
 * Created by liuyang on 2016/10/22.
 */
function checkUsername(username) {
    var pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;   //\u4e00-\u9fa5 是一个编码的格式问题

    if (username == "") {
        hintAlert("用户名不能为空");
        return false;
    } else if (username.length > 20) {
        hintAlert("用户名长度不符合要求");
        return false;
    } else if (!pattern.test(username)) {
        hintAlert("不能包括除下划线以外的特殊字符");
        return false;
    } else {
        return true;
    }
}

function checkPassword(password) {
    if (password == "") {
        hintAlert("密码不能为空");
        return false;
    } else if (password.length < 6) {
        hintAlert("密码不能少于6位");
        return false;
    } else {
        return true;
    }
}

function checkPasswordConfirm(password_confirm, password) {
    if (password_confirm == "") {
        hintAlert("确认密码不能为空");
        return false;
    } else if (password_confirm != password) {
        hintAlert("两次输入不一致");
        return false;
    } else {
        return true;
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getProjectFirstPic(string) {
    return string.toString().split("@")[0];
}
function hintAlert(string) {
    swal({
        title:string,
        type:"warning",
        timer:1200,
        showConfirmButton:false
    });
}
function jumpAlert(string) {
    swal({
        title: string,
        type: "info",
        timer: 1000,
        showCancelButton: false,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        location.href = "/bug/production/index.html"
    });
}
