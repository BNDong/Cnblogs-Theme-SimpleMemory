# 安装配置

!> 本主题需要JS权限，没有的请先申请权限。

进入管理后台设置界面：[管理后台](https://i.cnblogs.com/Configure.aspx)

<img src="./Images/install_01.png" width="750" />

## 设置博客皮肤

博客皮肤：SimpleMemory

![install_02](../../Images/install_02.png)

## 设置CSS代码

设置页面定制CSS代码：[/src/style/base.min.css](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/master/src/style/base.min.css)
（拷贝此文件代码至页面，禁用模板默认CSS）

!> /css/base.min.css 的修改参考 /css/base.css。博客设置请使用压缩版本，直接使用 /css/base.css 会字符超限！

![install_03](../../Images/install_03.png)

## 配置及JS文件引入

?> 推荐版本 >= v1.1.2，建议使用最新版本：[![GitHub release](https://img.shields.io/github/release/BNDong/Cnblogs-Theme-SimpleMemory.svg)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases)

在侧边栏HTML代码中设置以下代码：

详细配置参考相关[文档](http://doc.dbnuo.org/cnblogs-theme-docs/v1.1.0/#/Docs/Customization/config)。

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        GhVersions    : 'v1.1.4', // 版本
        blogUser      : "userName", // 用户名
        blogAvatar    : "https://xxxx.png", // 用户头像
        blogStartDate : "2016-11-17", // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.4/src/script/simpleMemory.min.js"></script>
```

![install_04](../../Images/install_04.png)

配置完成保存即可成功应用博皮！

---

CND jsdelivr 的 URL 详细规则参考[官方网站](https://www.jsdelivr.com/)。