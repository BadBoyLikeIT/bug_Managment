/**
 * Created by Lishuai on 2017/6/9.
 */
/**
 * Created by Lishuai on 2017/6/9.
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