$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date)
        var y = addZero(dt.getFullYear())
        var m = addZero(dt.getMonth() + 1)
        var d = addZero(dt.getDate())
        var hh = addZero(dt.getHours())
        var mm = addZero(dt.getMinutes())
        var ss = addZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function addZero(n) {
        return n < 10 ? '0' + n : n
    }
    function initlist() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败')
                }
                var htmlz = template('mhw', res)
                $('tbody').html(htmlz)
                renderPage(res.total)
            }
        })
    }
    initlist()
    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlz = template('kyx', res)
                $('[name=cateid]').html(htmlz)
                form.render()
            }
        })
    }
    initcate()
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val();
        q.cate_id = cate_id
        q.state = state
        initlist()
    })

    $('tbody').on('click', '.btn-remove', function () {
        var len = $('.btn-remove').length;
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }
                    initlist()
                }
            })
            layer.close(index);
        });
    })

    function renderPage(total) {
        laypage.render({
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            elem: 'page',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initlist()
                }
            }

        })
    }

})