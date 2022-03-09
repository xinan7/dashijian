$(function () {
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    var layer = layui.layer
    var form = layui.form
    initlist()
    function initlist() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败')
                }
                layer.msg('获取列表成功')
                var htmlstr = template('bls', res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }
    $("#btnxz").on('click', function () {
        $('#coverfile').click()
    })
    $('#coverfile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域   
    })

    //发布文章功能实现
    //需要得到五个参数  先确定第一个state 状态 
    //当点击了草稿按钮  把变量 改值
    var statess = "已发布"
    $('#btncg').on('click', function () {
        statess = "草稿"
    })
    $('#formdata').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', statess)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // fd.forEach(function (v, k) {
                //     console.log(k, v);
                // })
                fswz(fd)
            })
    })
    function fswz(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章发布失败')
                }
                layer.msg('文章发布成功')
                location.href = '/assets/wz/wz2.html'
            }
        })
    }
})