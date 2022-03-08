$(function () {

    var layer = layui.layer
    var form = layui.form
    wzlb()
    //封装函数  获取文章类别的数据 渲染页面
    function wzlb() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('文章列表获取成功')
                var wzlist = template('wztable', res)
                $('tbody').html(wzlist)
            }
        })
    }
    $('#btnadd').on('click', function () {
        layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#wzadd').html(),
        });

    })
    var gbxx = null
    var gbindex = null
    $('body').on('submit', '#xinan', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加文章失败')
                }
                wzlb()
                layer.msg('添加文章成功')
                layer.close(gbxx)
            }
        })
    })
    $('tbody').on('click', '#btn-add', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#qrxg').html()
        })
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章获取分类失败')
                }
                layer.msg('文章获取成功')
                form.val('form-add', res.data)
            }

        })

    })
    $('body').on('submit', '#tc', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章更新失败')
                }
                layer.close(gbindex)
                layer.msg('文章更新成功')
                wzlb()
            }
        })
    })

    $('tbody').on('click', '#btn-remove', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    wzlb()
                }
            })

            layer.close(index);
        });
    })
})