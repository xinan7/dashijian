//JQ提供的ajax方法 
$(function () {
    //options 方法里所有的属性  
    $.ajaxPrefilter(function (options) {
        console.log(options.url);
        options.url = 'http://www.liulongbin.top:3007' + options.url
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        options.compleat = function (res) {
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                location.href = '/login.html'
            }
        }
    })
})