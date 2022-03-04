$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称过长  请规范'
            }
        }
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求用户信息失败')
                }
                //渲染页面
                form.val('form-userinfo', res.data)

            }
        })
    }
    $('#btn-reset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                layer.msg('提交成功')
                window.parent.getUser()
            }
        })
    })
})