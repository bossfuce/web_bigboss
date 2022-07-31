// 每次调用ajsx是，会优先调用本函数
$.ajaxPrefilter(function (options) {
    options.url='http://www.liulongbin.top:3007'+options.url
})