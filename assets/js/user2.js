var form = layui.form
var layer = layui.layer
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '请规范输入（6-12位）'
    ],
    samepwd: function (value) {
        if (value == $('[name = oldPwd]').val()) {
            return layer.msg('新密码不能和旧密码近期相同')
        }
    },
    repwd: function (value) {
        if (value !== $('[name = newPwd]').val()) {
            return layer.msg('两次密码不一致')
        }
    }
})
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新失败')
            }
            layer.msg('更新成功')
            $('.layui-form')[0].reset()
        }
    })
})