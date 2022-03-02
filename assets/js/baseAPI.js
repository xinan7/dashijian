//JQ提供的ajax方法 
$(function () {
    //options 方法里所有的属性  
    $.ajaxPrefilter(function (options) {
        console.log(options.url);
        options.url = 'http://www.liulongbin.top:3007' + options.url
    })
})