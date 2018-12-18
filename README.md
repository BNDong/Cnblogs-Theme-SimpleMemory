# Cnblogs-Theme-SimpleMemory
[![GitHub issues](https://img.shields.io/github/issues/BNDong/Cnblogs-Theme-SimpleMemory.svg)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/issues)
[![GitHub forks](https://img.shields.io/github/forks/BNDong/Cnblogs-Theme-SimpleMemory.svg)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/network)
[![GitHub stars](https://img.shields.io/github/stars/BNDong/Cnblogs-Theme-SimpleMemory.svg)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/stargazers)
[![BNDong](https://img.shields.io/badge/bndong-%E2%9D%A4%EF%B8%8F-%23ff69b4.svg)](http://www.dbnuo.org)

本主题以阅读为核心，尽可能的美化博客园的显示效果，提高用户体验。
<br>基于博皮“SimpleMemor”进行的修改，使用插件较多，所以文件较多。[页面效果](https://www.cnblogs.com/bndong/)
<br>支持响应，尺寸分别为：(1200px,∞px)，(960px,1200px]，(720px,960px]，(0px,720px]
# 目录结构
```
├─ css
│  ├─ base.css - 页面定制CSS代码未压缩版本（字符超限）
│  ├─ base.min.css - 页面定制CSS代码压缩版本（使用此版本，禁用默认）
│  ├─ marvin.nav2.css - 文章目录样式文件
│  ├─ menu_bubble.css - 侧边栏样式文件
│  └─ ...
├─ html
│  ├─ pageFooter.html - 页脚HTML
│  ├─ pageHeading.html - 页首HTML
│  └─ sidebar.html - 侧边栏HTML（请开启JS权限）
├─ js
│  ├─ articleStatement.js - 文章后缀JS
│  ├─ baguetteBox.min.js - 图片灯箱JS
│  ├─ base.js - 基础JS
│  ├─ config.js - 加载配置
│  ├─ marvin.nav2.js - 文章目录JS
│  └─ ...
└─ README.md
```
# 使用说明
## 设置
进入管理后台设置界面依次设置
1. 博客皮肤 ---> SimpleMemory
2. 页面定制CSS代码 ---> /css/base.min.css(禁用模板默认CSS)
3. 博客侧边栏公告 ---> /html/sidebar.html(需要开启JS权限)
4. 页首Html代码 ---> /html/pageHeading.html
5. 页脚Html代码 ---> /html/pageFooter.html
>本主题需要JS权限，没有的请先申请权限，然后再进行设置。初始配置在侧边栏Html代码中，请仔细配置，不理解的不要乱修改，直接默认就行。
>/css/base.min.css 的修改参考 /css/base.css，请使用压缩版本，直接使用 /css/base.css 会字符超限！
## 标题与引用
* 一级标题 `<h1>`
* 二级标题 `<h2>`
* 引入文字 `<h6>`
* 关键字 `行内代码`
## 转载文章和文章后缀
文章后缀显示的内容可以在相关配置项进行配置。如果需要其它修改，可以修改 articleStatement.js 文件。
<br>关于转载文章在HTML源码中加入如下代码来指定文章作者和来源：
```html
<input id="articleAuthor" type="hidden" value="作者" />
<input id="articleSource" type="hidden" value="来源URL" />
```
## 代码高亮
本主题整合了两个代码高亮插件分别是：
* [code-prettify](https://github.com/google/code-prettify) 
* [highlightjs](https://highlightjs.org/) 
>大家添加代码，按博客园默认的方式添加就行，不用做任何调整！
>使用第三方代码高亮插件，对页面加载速度有一定影响，大家自己权衡！
### 关于主题使用的插件说明
#### highlightjs
* 版本：v9.13.1
#### code-prettify
* 版本：453bd5f51e61245339b738b1bbdd42d7848722ba
* 因为国内原因，修改了源码中加载 CDN 的网站『cdn.rawgit.com』--->『cdn.jsdelivr.net』
* 去除了源码中默认样式的加载。
### 高亮主题的配置
#### 配置代码高亮插件
代码高亮主题的类型配置：```essayCodeHighlightingType```

|value        |description|
|:------------|:----------|
|cnblogs      |使用博客园样式，介意加载速度的可以使用此配置。|
|highlightjs  |使用 **highlightjs** 对代码进行渲染。|
|prettify     |使用 **code-prettify** 对代码进行渲染。|
#### 配置代码高亮主题
配置代码高亮主题的配置为：```essayCodeHighlighting```
* essayCodeHighlightingType: 'cnblogs'
```
essayCodeHighlighting 可配置范围：
任意，此配置不会对渲染产生影响。
```
* essayCodeHighlightingType: 'highlightjs'
<br>支持官方所有主题，样式参考：[GoTo](https://highlightjs.org/static/demo/)
```
essayCodeHighlighting 可配置范围：
default、a11y-dark、a11y-light、agate、an-old-hope、androidstudio、arduino-light、arta、ascetic
、atelier-cave-dark、atelier-cave-light、atelier-dune-dark、atelier-dune-light、atelier-estuary-dark
、atelier-estuary-light、atelier-forest-dark、atelier-forest-light、atelier-heath-dark
、atelier-heath-light、atelier-lakeside-dark、atelier-lakeside-light、atelier-plateau-dark、atelier-plateau-light
、atelier-savanna-dark、atelier-savanna-light、atelier-seaside-dark、atelier-seaside-light
、atelier-sulphurpool-dark、atelier-sulphurpool-light、atom-one-dark-reasonable、atom-one-dark、atom-one-light
、brown-paper、codepen-embed、color-brewer、darcula、dark、darkula、docco、dracula、far
、foundation、github-gist、github、gml、googlecode、grayscale、gruvbox-dark、gruvbox-light、hopscotch
、hybrid、idea、ir-black、isbl-editor-dark、isbl-editor-light、kimbie.dark、kimbie.light、lightfair
、magula、mono-blue、monokai-sublime、monokai、nord、obsidian、ocean、paraiso-dark、paraiso-light、pojoaque
、purebasic、qtcreator_dark、qtcreator_light、railscasts、rainbow、routeros、school-book、shades-of-purple
、solarized-dark、solarized-light、sunburst、tomorrow-night-blue、tomorrow-night-bright
、tomorrow-night-eighties、tomorrow-night、tomorrow、vs、vs2015、xcode、xt256、zenburn
```
* essayCodeHighlightingType: 'prettify'
<br>支持官方所有主题，样式参考：[GoTo](https://rawgit.com/google/code-prettify/master/styles/index.html)
```
essayCodeHighlighting 可配置范围：
prettify、desert、sunburst、obsidian、doxy
```
## 网站统计
本主题整合 CNZZ 网站统计，并对样式进行了优化。如果需要本功能，请首先去 CNZZ 配置网站的统计，然后修改下面的代码，添加至页脚Html代码中。
```html
<div id="cnzzProtocol"  style="display: none;">
    <span class="id_cnzz_stat_icon" id='cnzz_stat_icon_你的统计ID'></span>
    <script src='https://s19.cnzz.com/z_stat.php?id=你的统计ID&online=1&show=line' type='text/javascript'></script>
</div>
```
## 播放器
播放器的设置，可以参考作者的 [GitHub](https://github.com/metowolf/MetingJS)
## Loading
Loading的设置，可以参考作者的 [GitHub](https://github.com/claudiocalautti/spring-loaders)
# 常见问题
## 菜单数据不显示
这个是大家遇到最多的问题，请以下面的方式进行处理。
### Solution:开启对应显示设置
『博客设置』--->『选项』--->『控件显示设置』--->『SAVE』
>由于博客园有缓存机制，设置后稍等几分钟才会生效。
### Solution:设置对应数据
如果没有相应的数据，即使设置了显示，博客园也不会返回对应的栏目的数据，这样也会造成不显示的问题。
* 随笔分类：『博客设置』--->『随笔』--->『分类』
* 推荐排行：如果没有推荐，此类别不会显示，解决办法只能是别人给你点个推荐。
### Solution:利用工具调试
如果以上两种方式都不能解决问题，使用此方法进行尝试！
<br>使用浏览器的『开发者工具』搜索HTML代码：
```html
<h3 class="catListTitle">
```
注释掉CLASS `catListTitle` 的CSS设置`display: none!important`
<br>这时你会发现在页面右下方，默认样式的侧边数据栏显示了出来，找一找有没有菜单没显示那栏数据。
* 如果这里没有，那么抱歉！不是我的问题，我是从这里抓的数据，检查下自己的设置问题。
* 如果这里有，(；´д｀)ゞ，我代码出BUG了，私我解决吧！（勤奋的好人都自己解决了，然后提交代码给我）
## Markdown排版错乱
我测试时候发现，博客园的 Markdown 排版有点问题，特别涉及到列表，`<li>`标签的生产会将下面的元素也包裹起来。这个等官方修复吧！
# 感谢网友
* [Alexander](https://github.com/alessandrocyc)
* [ElderJames](https://github.com/ElderJames)
# 关于
本主题的初始打算只是自己使用，并没有想公开出来（我前端水平实在是Low），后来求的人多了，索性就发出来了；所以，有不足之处和不合理的地方，请大家多担待！
关于优化和建议大家可以私信我，同时也欢迎大家上传代码给我。
本人学习计划一直排的挺满的，写这个纯是业余消遣，所以可能会出现维护更新和回答不及时的情况。
感谢阅读使用，拜谢！
