$(function () {
    getUser()
    function getUser() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('认证信息失败')
                }
                //渲染用户头像
                renderAvater(res.data)
            },
            complete:function(res){
                // console.log(res);
                //权限管理
                if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！"){
                        location.href='/login.html'
                }
            }
        })
    }
    //封装函数 渲染头像 
    function renderAvater(data) {
        var name = data.nickname || data.username
        $('#welcome').html('欢迎&nbsp;&nbsp:' + name)
        if (data.user_pic !== null) {
            $('.layui-nav-img').prop('src', data.user_pic).show()
            $('.text_avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            $('.text_avatar').html(name[0].toUpperCase()).show()
        }
    }
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })

})
