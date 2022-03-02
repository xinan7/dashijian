$(function () {
    $('#goreg').on('click', function () {
        $('.reg').show()
        $('.login').hide()
    })
    $('#gologin').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })

    //登录页面的验证
    var form = layui.form
    var layer = layui.layer
    //通过类UI设置验证格式
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    form.verify({
        regpwd: function (value, item) {
            //验证第二次密码的值
            if (value !== $('#pwd').val()) {
                return '两次密码不一致cnmd'
            }
        }
    })

    $('#reg_req').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg [name=username]').val(),
                password: $('.reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('注册成功')
            }

        })
    })
    $('#login_req').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                // layer.msg('登录成功') 
                //把res.token存入本地存储  localstrage中  后面验证需要用
                localStorage.setItem('token', res.token)
                location.href = 'index.html'


            }
        })
    })

})