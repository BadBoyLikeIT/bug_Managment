/**
 * Created by Lishuai on 2017/6/8.
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

    var data = GetRequest();
    // console.log("id:"+data);

    // var data = GetRequest(); //上面使其变成数组

    $.ajax({
        url: "/bug/controller/bug.show.info.php",
        type: "post",
        data: {"id":data},   //ajax data 格式
        success: function (data) {
            var result = JSON.parse(data);
            if (result) {
                //---------这个地方的数据为什么都需要是二维的？？---------------------------------------------
                var project = "";
                project += '<h4>项目名称</h4>' +
                           '<span class="value text-success">' + result[0]['p_name'] +'</span>';
                $("#project").html(project);

                var version = "";
                version += '<h4>版本号</h4>' +
                            '<span class="value text-success">' + result[0]['v_name'] +'</span>';
                $("#version").html(version);

                var bug = "";
                bug += '<h4>BUG名称</h4>' +
                    '<span class="value text-success">' + result[0]['title'] +'</span>';
                $("#bug").html(bug);

                var description  = "";
                description += result[0]['description'];
                $("#description").html(description);

                var tester = "";
            // <h4 class="heading">Desmond Davison</h4>
            //     <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
            //     <br />
            //     <p class="url">
            //         <span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
            //         <a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc </a>
            //     </p>
                tester += '<h4 class="heading">'+result[0]['tester_name']+'</h4>' +
                          '<blockquote class="message">'+result[0]['tester_name']+'创建了该BUG！创建时间:'+result[0]['publish_time']+'</blockquote>' +
                          '<p class="url">'+
                          '<span class="fs1 text-info" aria-hidden="true" data-icon=""></span>' + '</p>';
                $("#tester").html(tester);

                var leader = "";
            // <h4 class="heading">Brian Michaels</h4>
            //     <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
            //     <br />
            //     <p class="url">
            //         <span class="fs1" aria-hidden="true" data-icon=""></span>
            //         <a href="#" data-original-title="">Download</a>
            //         </p>
                leader += '<h4 class="heading">'+result[0]['developer_name']+'</h4>' +
                    '<blockquote class="message">'+'BUG被指派给'+result[0]['developer_name']+'!&nbsp&nbsp指派时间:'+result[0]['publish_time']+'</blockquote>' +
                    '<p class="url">'+
                    '<span class="fs1 text-info" aria-hidden="true" data-icon=""></span>' + '</p>';
                $("#leader").html(leader);

                var pic_image= "<img src='../images/"+result[0]['img_path']+"' width='500' height='250' />";
                $("#bug_pic").html(pic_image);
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

$("#model-form").submit(function (event) {

    event.preventDefault();
    var $form = $(this);
    var file = $('#picture').prop('files')[0];
    //传一个就是取值
    var form_data = new FormData();
    form_data.append('description1', $('#description1').val());
    form_data.append('picture',file);
    form_data.append('id',GetRequest());


    $.ajax({
        url: "/bug/controller/bug.solve.php",
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
                jumpAlert("BUG解决成功！");
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

//js 获取url get参数 单一参数
function GetRequest()
{
    var url = location.search;//获取url中"?"符后的字串
    if(url.indexOf("?")!=-1)  //判断是否有参数
    {
        var str = url.substr(1); //从第一个字符开始 因为第0个是？号 获取所有除问号的所有字串
        strs = str.split("="); //用等号进行分隔(因为知道只有一个参数 所以用等号进行分割 如果有多个参数 要用&号分割 再用等号进行分割)
        console.log(strs[1]);
        return strs[1];
    }
}