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
│  ├─ baguetteBox.min.css
│  ├─ base.css - 页面定制CSS代码未压缩版本（字符超限）
│  ├─ base.min.css - 页面定制CSS代码压缩版本（使用此版本，禁用默认）
│  ├─ gallery-clean.css
│  ├─ codeDesert.css
│  ├─ codeDoxy.css
│  ├─ codeObsidian.css
│  ├─ codePrettify.css
│  ├─ codeSunburst.css
│  ├─ marvin.nav2.css
│  ├─ menu_bubble.css
│  └─ optiscroll.css
├─ html
│  ├─ pageFooter.html - 页脚HTML
│  ├─ pageHeading.html - 页首HTML
│  └─ sidebar.html - 侧边栏HTML（请开启JS权限）
├─ js
│  ├─ MyTween.js
│  ├─ ToProgress.min.js
│  ├─ TweenMax.min.js
│  ├─ run_prettify.js
│  ├─ articleStatement.js - 文章后缀JS
│  ├─ baguetteBox.min.js
│  ├─ base.js - 基础JS
│  ├─ bootstrap.min.js
│  ├─ circleMagic.js
│  ├─ classie.js
│  ├─ RibbonsEffect.js
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
# 使用说明
## 设置
进入管理后台设置界面依次设置
1. 博客皮肤 ---> SimpleMemory
2. 页面定制CSS代码 ---> /css/base.min.css(禁用模板默认CSS)
3. 博客侧边栏公告 ---> /html/sidebar.html(需要开启JS权限)
4. 页首Html代码 ---> /html/pageHeading.html
5. 页脚Html代码 ---> /html/pageFooter.html
>本主题需要JS权限，没有的请先申请权限，然后再进行设置。初始配置在侧边栏代码中，请仔细配置，不理解的不要乱修改，直接默认就行。
>/css/base.min.css 的修改参考 /css/base.css，请使用压缩版本，直接使用 /css/base.css 会字符超限！
## 标题与引用
* 一级标题 `<h1>`
* 二级标题 `<h2>`
* 引入文字 `<h6>`
* 关键字 `行内代码`
## 转载文章和文章后缀
文章后缀显示的内容可以在相关配置项进行配置。如果需要其它修改，可以修改 articleStatement.js 文件。
<br>关于转载文章在HTML源码中加入如下代码来指定文章作者和来源：
```
<input id="articleAuthor" type="hidden" value="作者" />
<input id="articleSource" type="hidden" value="来源URL" />
```
## 代码高亮
整合了 google 的 [code-prettify](https://github.com/google/code-prettify) 代码高亮插件。
### 关于主题使用的 code-prettify：
1. 版本：453bd5f51e61245339b738b1bbdd42d7848722ba
2. 因为国内原因，修改了源码中加载 CDN 的网站『cdn.rawgit.com』--->『cdn.jsdelivr.net』
3. 去除了源码中默认样式的加载。
### 主题：
将插件的几个主题全部整合了进来，做了稍微调整，以兼容博客园。官方参考网站：[themes gallery](https://rawgit.com/google/code-prettify/master/styles/index.html)
主题的配置项为：essayCodeHighlighting
| 配置 | 说明 |
| ------ | ------ |
| cnblogs | 博客园默认主题 |
| prettify | prettify 主题 Default|
| desert | prettify 主题 Desert |
| sunburst | prettify 主题 Sunburst |
| obsidian | prettify 主题 Sons-Of-Obsidian |
| doxy | prettify 主题 Doxy |
## 播放器
播放器的设置，可以参考作者的[GitHub](https://github.com/metowolf/Meting)
## Loading
Loading的设置，可以参考作者的[GitHub](https://github.com/claudiocalautti/spring-loaders)
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
```
<h3 class="catListTitle">
```
注释掉CLASS `catListTitle` 的CSS设置`display: none!important`
<br>这时你会发现在页面右下方，默认样式的侧边数据栏显示了出来，找一找有没有菜单没显示那栏数据。
* 如果这里没有，那么抱歉！不是我的问题，我是从这里抓的数据，检查下自己的设置问题。
* 如果这里有，(；´д｀)ゞ，我代码出BUG了，私我解决吧！（勤奋的好人都自己解决了，然后提交代码给我）
# 未来更新计划
- [X] ~~随笔页面整体协调性调整。~~
- [X] ~~美化代码高亮。~~
- [X] ~~增加配置项，尽可能使每个位置都可以定义。~~
- [X] ~~优化菜单数据设置的处理逻辑。~~
- [ ] 美化Markdown。
# 感谢网友
* [Alexander](https://github.com/alessandrocyc)
* [ElderJames](https://github.com/ElderJames)
# 关于
本主题的初始打算只是自己使用，并没有想公开出来（我前端水平实在是Low），后来求的人多了，索性就发出来了；所以，有不足之处和不合理的地方，请大家多担待！
关于优化和建议大家可以私信我，同时也欢迎大家上传代码给我。
本人学习计划一直排的挺满的，写这个纯是业余消遣，所以可能会出现维护更新和回答不及时的情况。
感谢阅读使用，拜谢！