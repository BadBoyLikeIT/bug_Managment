/**
 * Created by liuyang on 2016/10/22.
 */
$(document).ready(function () {
    $("#login-form").submit(function (event) {

        event.preventDefault();

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        //验证会员名
        if (!checkUsername($("#username1").val())) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码
        if (!checkPassword($("#password1").val())) {
            $inputs.prop("disabled", false);
            return false;
        }
        $.ajax({
            url: "/bug/controller/login.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    hintAlert(errorcode2errorinfo(result.status));
                } else {
                    jumpAlert("登录成功，正在跳转...");
                }

            },
            error: function (request) {

            },
            complete: function (data) {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });

    });
    //失去焦点时判断 input 的合法性
    $("#username1").blur(function () {
        checkUsername($(this).val());
    });
    $("#password1").blur(function () {
        checkPassword($(this).val())
    });
});