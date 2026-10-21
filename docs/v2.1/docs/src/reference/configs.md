# 配置项

所有配置写在 `window.cnblogsConfig` 中，并放在插件脚本之前。这里只需填写要修改的字段，其他字段使用默认值。不要多次赋值覆盖已有配置。

```javascript
window.cnblogsConfig = {
  info: {
    name: '你的昵称',
    avatar: 'https://example.com/avatar.png',
  },
  banner: {
    home: {
      background: ['https://example.com/banner.jpg'],
    },
  },
};
```

示例中的 `example.com` 地址需要替换为自己的 HTTPS 资源地址。安装位置见[安装配置](/guide/install)。

## 配置分类

- [基础配置](./config/basic)：info、sidebar、title、fonts、consoleList

- [外观配置](./config/appearance)：banner、fontIconExtend、progressBar、footer、links、rtMenu、switchDayNight

- [文章配置](./config/article)：articleDirectory、articleComment、articleContent、articleSuffix、memorialDays

- [代码配置](./config/code)：code

- [动效配置](./config/animation)：animate

- [Loading 配置](./config/loading)：loading

## 扩展用法

[书单页](./bookList) · [友链页](./links) · [转载文章](./reprinted) · [字体图标](./fonticon) · [钩子](./hook)

## 配置索引

下面按原配置名称列出入口。新增配置以当前源码为准，旧版插件不一定支持；版本变化见[更新历史](/changelog/)。

<span id="info-基础信息"></span>
<span id="name-用户昵称"></span>
<span id="avatar-用户头像"></span>
<span id="startdate-入园时间"></span>
<span id="blogicon-网站图标"></span>

[info](./config/basic#info-基础信息) · 基础配置

<span id="sidebar-侧边栏"></span>
<span id="navlist-菜单导航"></span>
<span id="customlist-菜单数据"></span>
<span id="infobackground-个人信息背景"></span>
<span id="titlemsg-侧边栏title信息"></span>
<span id="submenu-侧边栏是否展开配置-387"></span>

[sidebar](./config/basic#sidebar-侧边栏) · 基础配置

<span id="title-页面标签"></span>
<span id="onblur-失去焦点标签文字"></span>
<span id="onblurtime-失去焦点变化延时"></span>
<span id="focus-获取焦点标签文字"></span>
<span id="focustime-获取焦点变化延时"></span>

[title](./config/basic#title-页面标签) · 基础配置

<span id="consolelist-控制台输出"></span>

[consoleList](./config/basic#consolelist-控制台输出) · 基础配置

<span id="banner-banner"></span>
<span id="home-主页"></span>
<span id="background-主页-banner-图片"></span>
<span id="title-主页-banner-标语"></span>
<span id="titlesource-主页-banner-标语获取源"></span>
<span id="article-文章页"></span>
<span id="background-文章页-banner-图片"></span>

[banner](./config/appearance#banner-banner) · 外观配置

<span id="fonticonextend-字体图标库扩展"></span>

[fontIconExtend](./config/appearance#fonticonextend-字体图标库扩展) · 外观配置

<span id="progressbar-顶部进度条"></span>

[progressBar](./config/appearance#progressbar-顶部进度条) · 外观配置

<span id="footer-页脚"></span>
<span id="style-页脚样式"></span>
<span id="text-页脚标语"></span>
<span id="left-页脚标语左侧文字"></span>
<span id="right-页脚标语右侧文字"></span>
<span id="iconfont-页脚标语中间图标"></span>
<span id="aplayer-音乐播放器-388"></span>

[footer](./config/appearance#footer-页脚) · 外观配置

<span id="links-友情链接"></span>
<span id="footer-页脚友链"></span>
<span id="page-友链页"></span>

[links](./config/appearance#links-友情链接) · 外观配置

<span id="rtmenu-右下角菜单"></span>
<span id="qrcode-二维码"></span>
<span id="reward-赞赏"></span>
<span id="downscrolldom-跳至底部位置定义"></span>

[rtMenu](./config/appearance#rtmenu-右下角菜单) · 外观配置

<span id="switchdaynight-日-夜间模式"></span>

[switchDayNight](./config/appearance#switchdaynight-日-夜间模式) · 外观配置

<span id="articledirectory-文章目录"></span>
<span id="position-文章目录定位"></span>
<span id="minbodyweight-文章目录隐藏宽度"></span>
<span id="autowidthscroll-文章目录横向滚动条"></span>
<span id="number-文章目录标题编号"></span>

[articleDirectory](./config/article#articledirectory-文章目录) · 文章配置

<span id="articlecomment-文章评论"></span>
<span id="background-文章评论背景-386"></span>

[articleComment](./config/article#articlecomment-文章评论) · 文章配置

<span id="articlecontent-文章内容"></span>
<span id="prefixicon-文章标题前图标-379"></span>

[articleContent](./config/article#articlecontent-文章内容) · 文章配置

<span id="articlesuffix-文章后缀"></span>
<span id="imgurl-左侧图片"></span>
<span id="abouthtml-关于博主"></span>
<span id="copyrighthtml-版权声明"></span>
<span id="supporthtml-声援博主"></span>
<span id="copyinfo-文章复制携带版权信息-429"></span>

[articleSuffix](./config/article#articlesuffix-文章后缀) · 文章配置

<span id="memorialdays-国家公祭日和自定义缅怀的日期-439"></span>

[memorialDays](./config/article#memorialdays-国家公祭日和自定义缅怀的日期-439) · 文章配置

<span id="code-代码"></span>
<span id="type-代码渲染类型"></span>
<span id="options-代码配置"></span>
<span id="hljs-highlighting-插件样式配置"></span>
<span id="maxheight-代码框高度限制"></span>
<span id="line-代码行号渲染"></span>
<span id="macstyle-mac-风格代码框"></span>
<span id="fontsize-代码字体大小"></span>

[code](./config/code#code-代码) · 代码配置

<span id="animate-动效"></span>
<span id="homebannertitle-主页banner上name的动效"></span>
<span id="homebanner-主页-banner-动效"></span>
<span id="articletitle-文章页标题动效"></span>
<span id="articlebanner-文章页-banner-动效"></span>
<span id="background-背景动效"></span>
<span id="bannerimages-banner-背景图自动切换"></span>
<span id="backgroundmouse-背景动效"></span>
<span id="mouse-跟随鼠标动效"></span>
<span id="season-花瓣飘落动效-382"></span>
<span id="avatar-头像旋转动效-383"></span>
<span id="typing-评论框打字动效-431"></span>

[animate](./config/animation#animate-动效) · 动效配置

<span id="loading-loading"></span>

[loading](./config/loading#loading-loading) · Loading 配置
