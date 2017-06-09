/**
 * Created by Lishuai on 2017/6/6.
 */
$(document).ready(function () {

    $.ajax({
        url: "/bug/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status != CORRECT) {
                // 显示错误信息
                hintAlert(errorcode2errorinfo(result.status));
                setTimeout(function () {
                    location.href = "/bug/production/login.html";
                }, 2000);
            }
            var html1 = '';
            var html2 = '';
            html1 +='<span>Welcome,</span>'+
                '<h2 >'+result.username+'</h2>';
            html2 += '<img src="images/img.jpg"alt="">' +
                result.username +
                '<span class=" fa fa-angle-down"></span>';
            $('#username1').html(html1);
            $('#username2').html(html2);
        }

    });

    $("#project_submit").submit(function (event) {

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


        // Fire off the request to /form.php
        $.ajax({
            url: "/bug/controller/project.submit.php",
            type: "post",
            data: serializedData,
            success: function (data) {  //这是一个回调函数，由之前的php给的信息

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    hintAlert(errorcode2errorinfo(result.status));
                } else {
                    jumpAlert("项目发布成功！");
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

    $("#cu-logout").click(function () {
        $.ajax({
            url: "/bug/controller/logout.con.php",
            success: function (data) {
                var result = JSON.parse(data);

                if (result.status == CORRECT) {
                    location.href = "/bug/production/login.html";
                }
            }
        })
    });

});