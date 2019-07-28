# Cnblogs-Theme-SimpleMemory

?> 该版本最后提交更新版本：[d2c2e52cfefe2c274bed21735e38827638998f0e](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/tree/d2c2e52cfefe2c274bed21735e38827638998f0e)

?> 由于该版本配置麻烦而复杂，已不推荐使用该版本，推荐版本：>= v1.1.2

?> 希望大家尽量使用最新的版本：[![GitHub release](https://img.shields.io/github/release/BNDong/Cnblogs-Theme-SimpleMemory.svg)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases)

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
2. 页面定制CSS代码 ---> [/css/base.min.css](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v1.0.0/css/base.min.css)(禁用模板默认CSS)
3. 博客侧边栏公告 ---> [/html/sidebar.html](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v1.0.0/html/sidebar.html)(需要开启JS权限)
4. 页首Html代码 ---> [/html/pageHeading.html](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v1.0.0/html/pageHeading.html)
5. 页脚Html代码 ---> [/html/pageFooter.html](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v1.0.0/html/pageFooter.html)

>本主题需要JS权限，没有的请先申请权限，然后再进行设置。初始配置在侧边栏Html代码中，请仔细配置，不理解的不要乱修改，直接默认就行。
>/css/base.min.css 的修改参考 /css/base.css，请使用压缩版本，直接使用 /css/base.css 会字符超限！

## 关于配置

!> 该版本配置没有处理缺省值，需要在侧边栏代码，添加所有的配置，不设置的配置请将值设置为空！

## 书写规范

* 富文本编辑器建议：TinyMCE
* MD编辑器建议：Markdown

|**类型**|**TinyMCE**|**Markdown**|
|:-----:|:-----:|:-----:|
|**一级标题**|```<h1>```|```#```|
|**二级标题**|```<h2>```|```##```|
|**三级标题**|```<h3>```|```###```|
|**引用文字**|```引用 or <h6>```|```>```|
|**行内代码**|```行内代码```| ```|

> 目前文章目录的生成只支持到二级目录。

## 转载文章和文章后缀

文章后缀显示的内容可以在相关配置项进行配置。如果需要其它修改，可以修改 ``/js/articleStatement.js`` 文件。
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

支持官方所有主题，样式参考：[GoTo](https://highlightjs.org/static/demo/)

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

支持官方所有主题，样式参考：[GoTo](https://rawgit.com/google/code-prettify/master/styles/index.html)

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

## 字体图标库及其拓展方法

本博客使用的图标库为阿里巴巴矢量图标库 iconfont。

### 字体图标库

> 图标下方第一行为标题，第二行为图标代码（修改图标使用此代码）

![icon_list](./Images/icon_list.png)

### 拓展方法

大家可以在 iconfont 生成自己的图标库，生成方法参考[官方教程](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.13&helptype=about)。
<br>获取样式地址后添加到加载配置文件中：``/js/config.js``

> 为了兼容，请不要删除原有的图标库，除非你能替换掉所有的图标样式引用。

```
    ...
        base: {
            deps: [
                'tools',
                'css!https://at.alicdn.com/t/***.css', // 阿里云字体图标
                // 添加至此位置，.css文件 url 前须添加 css!
            ]
        }
    ...
```

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

---
# 版本更新日志

## 2019.04.27 - v1.0.0
* v1.0.0 版本发布

> 1. 经过迭代调试，基本稳定了，发布v1.0.0
> 2. 配置项 ```GhVersions``` 可以为版本号：```v1.0.0```
> 3. 以后测试代码不会上传到此库中了，单独开库处理

---

## 2019.04.26 - 70fa051
* 删除有字库字体引用，增加谷歌字体库引用（侧边栏HTML代码处）

## 2019.04.14 - 2f74751
* 重构菜单数据处理逻辑，单个数据的处理不会影响其它数据的添加

## 2019.04.12 - a73181b
* 添加自定义菜单数据配置项
* 侧边栏菜单支持自定义数据
* 根据关注状态修改关注图标样式

## 2019.03.11 - 1bdd29a
* 修复了 MD 格式下，代码长度不限制，滚动条不出现的问题
* 随笔页图片支持多张随机设置了
* 解除了随笔目录的数量限制
* 随笔目录支持折叠了
* 解除了页面滚动条的隐藏

## 2019.01.25 - 8555b9d
* 修复遇到数字标题时，目录格式错乱的问题

## 2019.01.22 - 91b3663
* 更新配置
* 主页图片支持多张设置，每次刷新页面随机设置其中一张

## 2018.12.18 - df0ffcf
* 修改了侧边栏 HTML 代码
* 限制了页面中代码的高度
* 美化了代码滚动条的样式

## 2018.12.17 - 9d97403
* 修复主页主体内容定位不准确的问题

## 2018.12.03 - 2d64ffa
* 修改了代码高亮相关配置项
* 重构代码高亮设置的逻辑
* 增加了 highlightjs 插件来处理代码高亮渲染
* 提升代码主题处理逻辑的优先级
* 修复了点击文章目录跳转不准确的问题

## 2018.11.23 - 07d2e00
* 美化 Markdown 样式

## 2018.11.21 - 6f0e937
* 解决了设置 prettify 代码高亮时，代码换行缺失的问题

## 2018.11.18 - 6432282
* 增加代码高亮主题的设置和实现

## 2018.11.16 - 087a55f
* 调整配置项
* 修改了渲染效果配置项的名称
* 增加了文件源的配置
* 增加底部标语图标的设置
* 增加了主题作者的显示控制
* 删除了使用博客园文件系统加载文件
* 屏蔽 AmazingCounters 网站计数器设置

## 2018.10.26 - f73b3b7
* 解决了设置冲突导致应该隐藏的页面特效显示了出来
* 屏蔽了随笔页因为尺寸更改而导致 MyTween.js 里疯狂报错

## 2018.10.24 - c249ab4
* 页面自适应调整
* 菜单增加我的标签

## 2018.10.17 - f0e24ca
* 修改随笔目录样式
* 菜单中未设置的数据相对应的标题不会显示了

## 2018.10.09 - f964276
* 页面优化

## 2018.10.07 - f43b986
* 增加页面特效设置

## 2018.09.29 - da79aa5
* 菜单设置代码重构
* 菜单添加最新随笔

## 2018.09.21 - d7ebb9e
* 增加全局配置
* 限制主页图片上文字显示行数

## 2018.08.29 - d452c8e
* 修改默认入园时间
* 添加博客运行时间
* 定时清除所有定时器
* 改变统计代码获取方式

## 2018.08.27 - cb90c7d
* 修改代码注释
* 显示文章博客和分享按钮

## 2018.08.14 - 210c0c7
* 更换评论框背景
* 修改生成文章目录格式
* 添加文章标题效果

## 2018.07.30 - 00c4bc0
* 调整页脚

## 2018.07.27 - f5f276e
* 添加菜单背景
* 修改图床地址
* 添加footer图片
* 修改底部进度条样式与位置
* 添加背景彩带
* 修改页脚样式
* 修改链接默认颜色
* 取消背景网格样式
* 修改非主页动画配色
* 修改主页与非主页头图
* 取消页面背景效果
* 添加页面HTML结构
* 添加博客园文件来源

## 2018.07.26 - 2c69f82
* 项目成立