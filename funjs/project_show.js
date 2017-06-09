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
    $.ajax({
        url: "/bug/controller/project.show.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result) {
                var html = "";
                /*
                 <tr class="even pointer">
                 <td class="a-center ">
                 <input type="checkbox" class="flat" name="table_records">
                 </td>
                 <td class=" ">121000040</td>
                 <td class=" ">May 23, 2014 11:47:56 PM </td>
                 <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
                 <td class=" ">John Blank L</td>
                 <td class=" ">Paid</td>
                 <td class="a-right a-right ">$7.45</td>
                 <td class=" last"><a href="#">View</a>
                 </td>
                 </tr>

                 <tr class="odd pointer">
                 <td class="a-center ">
                 <input type="checkbox" class="flat" name="table_records">
                 </td>
                 <td class=" ">121000039</td>
                 <td class=" ">May 23, 2014 11:30:12 PM</td>
                 <td class=" ">121000208 <i class="success fa fa-long-arrow-up"></i>
                 </td>
                 <td class=" ">John Blank L</td>
                 <td class=" ">Paid</td>
                 <td class="a-right a-right ">$741.20</td>
                 <td class=" last"><a href="#">View</a>
                 </td>
                 </tr>
                 */
                // 显示错误信息
                console.log(result);

                for (var item in result) {
                    //console.log(result[item]);
                    if (item%2 == 0) {
                        html += '<tr class="even pointer">' +
                            '<td class="a-center ">' +
                            '<input type="checkbox" class="flat" name="table_records">' +
                            '</td>' +
                            '<td>'+result[item]['id']+'</td>' +
                            '<td>'+result[item]['name']+'</td>' +
                            '<td>'+result[item]['leader_name']+'</td>' +
                            '<td>'+result[item]['description']+'</td>' +
                            '<td>'+result[item]['date']+'</td>' +
                            '<td>'+result[item]['version']+'</td>'+
                            '<td class=" last"><a href="#">View</a></td>' +
                            '</tr>';
                    } else{
                        html += '<tr class="odd pointer">' +
                            '<td class="a-center ">' +
                            '<input type="checkbox" class="flat" name="table_records">' +
                            '</td>' +
                            '<td>'+result[item]['id']+'</td>' +
                            '<td>'+result[item]['name']+'</td>' +
                            '<td>'+result[item]['leader_name']+'</td>' +
                            '<td>'+result[item]['description']+'</td>' +
                            '<td>'+result[item]['date']+'</td>' +
                            '<td>'+result[item]['version']+'</td>'+
                            '<td class=" last"><a href="#">View</a></td>' +
                            '</tr>';
                    }
                }

                //console.log(html);
                $("#project_table_body").html(html);
            }
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