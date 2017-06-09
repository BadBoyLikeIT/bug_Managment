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
        url: "/bug/controller/bug.show.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result) {
                var html = "";

                console.log(result);

                for (var item in result) {
                // <tr >
                //     <td>#</td>
                //     <td>
                //     <a>Pesamakini Backend UI</a>
                //     <br />
                //     <small>Created 01.01.2015</small>
                //     </td>
                //     <td>
                //     </td>
                //     <td>
                //     </td>
                //     <td class="project_progress">
                //
                //         </td>
                //         <td>
                //         <button type="button" class="btn btn- btn-xs">Success</button>
                //         </td>
                //         <td>
                //
                //         </td>
                //         <td>
                //         <a href="#" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>
                //         <a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>
                //         <a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>
                //     </td>
                //     </tr>
                    switch (result[item]['class'])
                    {
                        case 1:
                            if(result[item]['status'] == "isActive"){
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-danger">'+'致命级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-success btn-xs">'+'isActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';}
                            else {
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-danger">'+'致命级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-danger btn-xs">'+'NoActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';
                            }break;
                        case 2:
                            if(result[item]['status'] == "isActive"){
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-warning">'+'严重级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-success btn-xs">'+'isActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';}
                            else {
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-warning">'+'严重级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-danger btn-xs">'+'NoActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';
                            }break;
                        case 3:
                            if(result[item]['status'] == "isActive"){
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-info">'+'一般级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-success btn-xs">'+'isActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';}
                            else {
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-info">'+'一般级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-danger btn-xs">'+'NoActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';
                            }break;
                        case 4:
                            if(result[item]['status'] == "isActive"){
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-success">'+'提示级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-success btn-xs">'+'isActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';}
                            else {
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-success">'+'提示级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-danger btn-xs">'+'NoActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';
                            }break;
                        case 5:
                            if(result[item]['status'] == "isActive"){
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-primary">'+'轻微级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-success btn-xs">'+'isActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';}
                            else {
                                html += '<tr>' +
                                    '<td class="id">' + result[item]['id'] +'</td>' +
                                    '<td>'+'<a>'+result[item]['title']+'<a>'+'</td>' +
                                    '<td>'+result[item]['p_name']+'</td>' +
                                    '<td>'+result[item]['v_name']+'</td>' +
                                    '<td>'+'<span class="label label-primary">'+'轻微级'+'</span>'+'</td>' +
                                    '<td>'+'<button type="button" class="btn btn-danger btn-xs">'+'NoActive'+'</button>'+'</td>' +
                                    '<td>'+result[item]['developer_name']+'</td>'+
                                    '<td>'+
                                    '<Button href="#" class="btn btn-primary btn-xs" onClick="jump_BugInfo(this)"><i class="fa fa-folder"></i> View </Button>'+
                                    '<a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>'+
                                    '<a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>'+
                                    '</td>' +
                                    '</tr>';
                            }

                    }

                }

                //console.log(html);
                $("#bug_show_table").html(html);
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


//如何获取表格的当前行对应列的(通过id)值
function jump_BugInfo(obj)
{
    var bugId = $(obj).parents("tr").find(".id").text();
    // alert(bugId);
    console.log(bugId);
    location.href= "/bug/production/bug_show_info.html?id="+bugId;
    
}

//一个界面给另一个界面传递参数可以利用get方法