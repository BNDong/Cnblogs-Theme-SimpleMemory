# Cnblogs-Theme-SimpleMemory
基于博皮：SimpleMemory，进行的修改，使用插件较多，所以文件较多。[页面效果](https://www.cnblogs.com/bndong/)
<br>支持响应，三个尺寸分别为：(768px,∞px)，(500px,768px]，(0px,500px]
## 目录结构
```
├─ css
│  ├─ baguetteBox.min.css
│  ├─ base.css - 页面定制CSS代码未压缩版本（字符超限）
│  ├─ base.min.css - 页面定制CSS代码压缩版本（使用此版本，禁用默认）
│  ├─ gallery-clean.css
│  ├─ marvin.nav2.css
│  ├─ menu_bubble.css
│  └─ optiscroll.css
├─ html
│  ├─ pageFooter.html - 页脚HTML
│  ├─ pageHeading.html - 页首HTML
│  └─ sidebar.html - 侧边栏HTML
├─ js
│  ├─ MyTween.js
│  ├─ ToProgress.min.js
│  ├─ TweenMax.min.js
│  ├─ articleStatement.js - 文章后缀JS
│  ├─ baguetteBox.min.js
│  ├─ base.js - 基础JS
│  ├─ bootstrap.min.js
│  ├─ circleMagic.js
│  ├─ classie.js
│  ├─ config.js - 加载配置文件
│  ├─ css.min.js
│  ├─ jquery.optiscroll.js
│  ├─ jquery.rotate.min.js
│  ├─ loading.js
│  ├─ main4.js
│  ├─ marvin.nav2.js - 文章目录
│  ├─ require.min.js
│  ├─ snap.svg-min.js
│  └─ tools.js
└─ README.md
```
## 使用说明
### 设置
进入管理后台设置界面依次设置
* 博客皮肤 ---> SimpleMemory
* 页面定制CSS代码 ---> /css/base.min.css(禁用模板默认CSS)
* 博客侧边栏公告 ---> /html/sidebar.html
* 页首Html代码 ---> /html/pageHeading.html
* 页脚Html代码 ---> /html/pageFooter.html

***/css/base.min.css 的修改参考 /css/base.css，请使用压缩版本，直接使用 /css/base.css 会字符超限！***
### 标题与引用
* 一级标题 `<h1>`
* 二级标题 `<h2>`
* 引入 `<h6>`
* 关键字 `行内代码`
### 转载文章和文章后缀
关于每篇文章的后缀在 articleStatement.js 文件中，大家根据需求修改这个文件就行了
关于转载文章在HTML源码中加入如下代码来指定文章作者和来源：
```
<input id="articleAuthor" type="hidden" value="作者" />
<input id="articleSource" type="hidden" value="来源URL" />
```
### 菜单数据显示
如果个别栏目数据没有，请去博客设置中开启对应显示！
选项 ---> 控件显示设置
### 播放器
播放器设置可以参考作者的[GitHub](https://github.com/metowolf/Meting)
## 关于
关于优化和建议大家可以私信我，毕竟不是搞前端的，如有不足！请多担待！
>面对大河我无限惭愧，我年华虚度 空有一身疲倦，和所有以梦为马的诗人一样，岁月易逝，一滴不剩。