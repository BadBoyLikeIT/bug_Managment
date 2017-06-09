/**
 * Created by liuyang on 2016/10/21.
 */
$(document).ready(function () {
    // Bind to the submit event of our form
    $("#register-form").submit(function (event) {

        event.preventDefault();
        //阻断原本要进行的活动

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();
        // console.log(serializedData+"<br>");
        //js中的调试代码信息


        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);  //一旦提交就不允许再次改变这个值了

        //验证会员名
        if (!checkUsername($("#username").val())) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码
        if (!checkPassword($("#password").val())) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码确认
        if (!checkPasswordConfirm($("#password_confirm").val(), $("#password").val())) {
            $inputs.prop("disabled", false);
            return false;
        }


        // Fire off the request to /form.php
        $.ajax({
            url: "/bug/controller/register.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {  //这是一个回调函数，由之前的php给的信息

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    hintAlert(errorcode2errorinfo(result.status));
                } else {
                    jumpAlert("注册成功，正在登录...");
                }

            },
            error: function (request) {
            },
            complete: function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });

    });

    //失去焦点时判断 input 的合法性
    $("#username").blur(function () {
        checkUsername($(this).val());
    });
    $("#password").blur(function () {
        checkPassword($(this).val())
    });
    $("#password_confirm").blur(function () {
        checkPasswordConfirm($(this).val(), $("#password").val());
    });

});