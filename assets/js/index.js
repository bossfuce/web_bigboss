$(function () {
  // 用户信息
  getUserInfo();

  // 点击退出按钮退出功能
  $("#btnLogout").on("click", function () {
    var layer = layui.layer;

    // 提示用户是否退出

    layer.confirm(
      "确认是否退出登录？",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 退出回调函数
        localStorage.removeItem("token");
        // 重新跳转页面
        location.href = "./login.html";
        // 关闭询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg("获取信息失败");
      }
      // 调用renderAvatar渲染用户头像
      renderAvatar(res.data);
    },
  });
}

// 渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
