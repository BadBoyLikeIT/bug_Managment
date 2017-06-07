/**
 * Created by Lishuai on 2017/6/7.
 */
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

    $("#bug_submit").submit(function (event) {

        event.preventDefault();
        //阻断原本要进行的活动
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        // var serializedData = new FormData();
        var serializedData = $form.serialize();
        var file = $('#picture').prop('files')[0];
        var form_data = new FormData();
        form_data.append('project', $('#project').val());   //可能有问题
        console.log($('#project').val());
        form_data.append('version', $('#version').val());
        form_data.append('title', $('#title').val());
        form_data.append('date', $('#date').val());
        form_data.append('status', $('#status').val());
        form_data.append('class', $('#class').val());
        form_data.append('description', $('#description').val());
        form_data.append('picture',file);

        // console.log(serializedData+"<br>");
        //js中的调试代码信息

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);  //一旦提交就不允许再次改变这个值了


        // Fire off the request to /form.php
        $.ajax({
            url: "/bug/controller/bug.submit.php",
            type: "post",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            //上传文件的ajax会有不同的
            data:form_data,
            success: function (data) {  //这是一个回调函数，由之前的php给的信息

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    hintAlert(errorcode2errorinfo(result.status));
                } else {
                    jumpAlert("BUG发布成功！");
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

});