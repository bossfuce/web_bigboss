// 每次调用ajsx是，会优先调用本函数
$.ajaxPrefilter(function (options) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
  // 全局同一挂在complete函数
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  // 无论是否成功接受数据都会回调complete函数
  options.complete = function (res) {
    // console.log("shipai");
    // console.log(res);
    // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 强制清空token且强制跳转到登录页面
      localStorage.removeItem("token");
      location.href = "./login.html";
    }
  };
});
