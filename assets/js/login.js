$(function () {
    $('#goreg').on('click', function () {
        $('.reg').show()
        $('.login').hide()
    })
    $('#gologin').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })
})