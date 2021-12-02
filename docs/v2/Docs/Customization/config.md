# 配置项

你可以配置在```window.cnblogsConfig```里。

!> Url 类型的配置，请尽量配置支持 Https 的地址！

## 示例配置

例如我原配置为：

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        info: {
            name: 'userName', // 用户名
            startDate: '2021-01-01', // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
            avatar: 'http://xxxx.png', // 用户头像
        },
    }
<script>
```

我需要新增关于主页图片的配置，新增配置为：

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        info: {
            name: 'userName', // 用户名
            startDate: '2021-01-01', // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
            avatar: 'http://xxxx.png', // 用户头像
        },
        banner: {
            home: {
                background: [
                    "https://x1.jpg",
                    "https://x2.jpg",
                    "https://x3.jpg",
                ],
            },
        }
    }
<script>
```

?> JavaScript 对象是被命名值的容器。值以名称:值对的方式来书写（名称和值由冒号分隔）。

## info - 基础信息

### name - 用户昵称

* 类型：```String```
* 默认值：```[默认抓取博客园用户名]```

用户昵称。

```javascript
window.cnblogsConfig = {
  info: {
    name: 'userName',
  },
}
```

### avatar - 用户头像

* 类型：```Url```
* 默认值：```""```

用户头像图片Url。

```javascript
window.cnblogsConfig = {
  info: {
    avatar: 'https://x1.jpg',
  },
}
```

### startDate - 入园时间

* 类型：```Date```
* 默认值：```2021-01-01```

入园时间，年-月-日，入园时间查看方法：鼠标停留园龄时间上，会显示入园时间。

```javascript
window.cnblogsConfig = {
  info: {
    startDate: '2021-01-01',
  },
}
```

### blogIcon - 网站图标

* 类型：```Url```
* 默认值：```""```

网站图标图片Url。

```javascript
window.cnblogsConfig = {
  info: {
    blogIcon: 'https://x1.jpg',
  },
}
```

## sidebar - 侧边栏

### navList - 菜单导航

* 类型：```Array```
* 相关文档：[字体图标库](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/fonticon)
* 默认值：```[]```

自定义菜单导航，显示在默认导航下方。

```javascript
window.cnblogsConfig = {
  sidebar: { // 列表数据 ['导航名称', '链接', 'icon']
    navList: [
        ['我的博客1', 'https://www.cnblogs.com/bndong/', 'icon-github'],
        ['我的博客2', 'https://www.cnblogs.com/bndong/', 'icon-github'],
    ],
  },
}
```

### customList - 菜单数据

* 类型：```Object```
* 相关文档：[字体图标库](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/fonticon)
* 默认值：```{}```

自定义菜单数据，显示在默认数据上方。

```javascript
window.cnblogsConfig = {
  sidebar: { // 列表数据 ['导航名称', '链接', 'icon']
    customList: {
        "title1": { // 标题
            "data": [ // 列表数据 ['列表', '链接']
                ['我的博客1', 'https://www.cnblogs.com/bndong/'],
                ['我的博客2', 'https://www.cnblogs.com/bndong/'],
                ['我的博客3', 'https://www.cnblogs.com/bndong/'],
                ['我的博客4', 'https://www.cnblogs.com/bndong/'],
                ['我的博客5', 'https://www.cnblogs.com/bndong/'],
            ],
            "icon": "icon-brush_fill" // 配置图标，参考文档：定制化/字体图标库
        },
        "title2": { // 标题
            "data": [ // 列表数据 ['列表', '链接']
                ['我的博客6', 'https://www.cnblogs.com/bndong/'],
                ['我的博客7', 'https://www.cnblogs.com/bndong/'],
                ['我的博客8', 'https://www.cnblogs.com/bndong/'],
                ['我的博客9', 'https://www.cnblogs.com/bndong/'],
                ['我的博客10', 'https://www.cnblogs.com/bndong/'],
            ],
            "icon": "icon-brush_fill" // 配置图标，参考文档：定制化/字体图标库
        },
    },
  },
}
```

### infoBackground - 个人信息背景

* 类型：```Url```
* 默认值：```""```

< v2.1.0 侧边栏个人信息背景图片Url。
>= v2.1.0 侧边栏背景图片。

```javascript
window.cnblogsConfig = {
  sidebar: {
    infoBackground: 'https://x1.jpg',
  },
}
```

### titleMsg - 侧边栏title信息

?> 版本 >= v2.1.0

* 类型：```String```
* 默认值：```"欢迎访问本博客~"```

配置侧边栏title信息

```javascript
window.cnblogsConfig = {
  sidebar: {
      titleMsg: '欢迎访问本博客~',
  },
}
```

## banner - banner图

### home - 主页banner

#### background - 主页banner图片

* 类型：```Array```
* 默认值：```[]```

主页banner图片Url，推荐尺寸>= 1920*1080，支持多张，每次刷新随机设置一张。

```javascript
window.cnblogsConfig = {
    banner: {
        home: {
            background: [
                "https://x1.jpg",
                "https://x2.jpg",
                "https://x3.jpg",
            ],
        },
    },
}
```

#### title - 主页banner标语

* 类型：```String``` or ```Array```
* 默认值：```""```

主页banner上的标语，设置此选项会显示自定义文字，默认为空，自动获取一句。

1) 设置文字，会固定显示该文字。

2) 设置数组，随机从数组中获取一条文字显示。

```javascript
window.cnblogsConfig = {
    banner: {
        home: {
            title: '每一个不曾起舞的日子，都是对生命的辜负。',
        },
    },
}
```

or

```javascript
window.cnblogsConfig = {
    banner: {
        home: {
            title: [
                '每一个不曾起舞的日子，都是对生命的辜负。',
                '公主死去了，屠龙的少年还在燃烧'
            ],
        },
    },
}
```

#### titleSource - 主页banner标语获取源

* 类型：```String```
* 默认值：```"jinrishici"```

主页 banner 上的标语获取源，默认为 ```jinrishici``` 每次刷新随机获取一句古诗词。

```javascript
window.cnblogsConfig = {
    banner: {
        home: {
            titleSource: 'one',
        }
    },
}

/** 所有可配置项
jinrishici：每次刷新随机获取一句古诗词。
one：每日获取一句话
*/
```

### article - 文章页头图

#### background - 文章页banner图片

* 类型：```Array```
* 默认值：```[]```

文章页banner图片Url，推荐尺寸>= 1920*1080，支持多张，每次刷新随机设置一张。

```javascript
window.cnblogsConfig = {
    banner: {
        article: {
            background: [
                "https://x1.jpg",
                "https://x2.jpg",
                "https://x3.jpg",
            ],
        },
    },
}
```

## loading - 加载loading

* 类型：```Object```
* 相关文档：[Loading](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/loading)
* 默认值：

```json
{
    rebound: {
        tension: 16,
        friction: 5,
    },
    spinner: {
        id: 'spinner',
        radius: 90,
        sides: 3,
        depth: 4,
        colors: {
            background: '#f0f0f0',
            stroke: '#272633',
            base: null,
            child: '#272633',
        },
        alwaysForward: true, // When false the spring will reverse normally.
        restAt: 0.5,         // A number from 0.1 to 0.9 || null for full rotation
        renderBase: false,
    }
}
```

页面加载loading。

```javascript
window.cnblogsConfig = {
    loading: {
         rebound: {
             tension: 16,
         },
         spinner: {
             id: 'spinner',
             radius: 90,
         }
    },
}
```

## fontIconExtend - 字体图标库

* 类型：```Url```
* 相关文档：[字体图标库](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/fonticon)
* 默认值：```""```

字体图标库扩展Css的Url。

```javascript
window.cnblogsConfig = {
    fontIconExtend: "//at.alicdn.com/t/font_xxxxxxxxxx.css",
}
```

## progressBar - 顶部进度条

* 类型：```Object```
* 默认值：

```json
{
    id      : 'top-progress-bar', // 请勿修改该值
    color   : '#77b6ff',
    height  : '2px',
    duration: 0.2,
}
```

进度条配置，显示在页面顶部。

```javascript
window.cnblogsConfig = {
    progressBar: {
         color   : '#77b6ff',
    },
}
```

## title - 页面标签

### onblur - 失去焦点标签文字

* 类型：```String```
* 默认值：```(oﾟvﾟ)ノ Hi```

当页面失去焦点，页面title显示的文字。

```javascript
window.cnblogsConfig = {
  title: {
    onblur: '(oﾟvﾟ)ノ Hi',
  },
}
```

### onblurTime - 失去焦点变化延时

* 类型：```Number```
* 默认值：```500```

当页面失去焦点，页面title变化的延时时间，单位毫秒。

该配置值为 -1 时，当页面失去焦点，页面title显示的文字不会变化。

```javascript
window.cnblogsConfig = {
  title: {
    onblurTime: 500,
  },
}
```

### focus - 获取焦点标签文字

* 类型：```String```
* 默认值：```(*´∇｀*) 欢迎回来！```

当页面获取焦点，页面title显示的文字；显示后，延时恢复原title。

```javascript
window.cnblogsConfig = {
  title: {
    focus: '(*´∇｀*) 欢迎回来！',
  },
}
```

### focusTime - 获取焦点变化延时

* 类型：```Number```
* 默认值：```1000```

当页面获取焦点，页面title变化的延时时间，单位毫秒。

该配置值为 -1 时，当页面获取焦点，页面title显示的文字不会变化。

```javascript
window.cnblogsConfig = {
  title: {
    focusTime: 1000,
  },
}
```

## footer - 页脚

### style - 页脚样式

* 类型：```Number```
* 默认值：```2```

页脚样式：

style: 1

![footer_01](../../Images/footer_01.png)

style: 2

![footer_02](../../Images/footer_02.png)

```javascript
window.cnblogsConfig = {
  footer: {
    style: 1,
  },
}
```

### text - 页脚标语

#### left - 页脚标语左侧文字

* 类型：```String```
* 默认值：```""```

页脚标语左侧文字。

```javascript
window.cnblogsConfig = {
  footer: {
    text: {
      left: '好好学习',
    },
  },
}
```

#### right - 页脚标语右侧文字

* 类型：```String```
* 默认值：```""```

页脚标语右侧文字。

```javascript
window.cnblogsConfig = {
  footer: {
    text: {
      right: '天天向上',
    },
  },
}
```


#### iconFont - 字体图标

* 类型：```Object```
* 默认值：```""```

```json
{
    icon:  "icon-xl", // iconfont 图标名称
    color: "red", // 图标颜色
    fontSize: "16px" // 图标大小
}
```

页脚标语字体图标。

```javascript
window.cnblogsConfig = {
  footer: {
    text: {
      iconFont: {
        icon:  "icon-xl",
        color: "red",
        fontSize: "16px"
      }
    },
  },
}
```

## links - 友情链接

### footer - 页脚友链

* 类型：```Array```
* 默认值：```[]```

页脚友链。

```javascript
window.cnblogsConfig = {
  links: {
    footer: [
        ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
        ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
        ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
        ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
        ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
    ],
  },
}
```

### page - 友链页

* 类型：```Array```
* 相关文档：[友链](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/links)
* 默认值：```[]```

友链页。需要在页面源码中添加 `<input id="linkListFlg" type="hidden" />`

```javascript
window.cnblogsConfig = {
  links: {
    page: [
      {
        name: 'BNDong', // 昵称
        introduction: 'IT技术类博客', // 简介
        avatar: 'https://blog.dbnuo.com/images/avatar.gif', // 头像
        url: 'https://blog.dbnuo.com' // 友链地址
      },
    ],
  },
}
```

## rtMenu - 右下角菜单

### qrCode - 二维码

* 类型：```Url```
* 默认值：```""```

二维码图片Url。

```javascript
window.cnblogsConfig = {
  rtMenu: {
    qrCode: 'https://x1.jpg',
  },
}
```

### reward - 赞赏

* 类型：```Object```
* 默认值：

```json
{
  alipay: '', // 支付宝收款码
  wechatpay: '' // 微信收款码
}
```

赞赏。

```javascript
window.cnblogsConfig = {
  rtMenu: {
    reward: {
      alipay: 'https://x1.jpg',
      wechatpay: 'https://x2.jpg'
    },
  },
}
```

### downScrollDom - 跳至底部位置定义

* 类型：```String```
* 默认值：```""```

跳至底部位置定义，配置为 JQuery 选择器。

```javascript
window.cnblogsConfig = {
  rtMenu: {
    downScrollDom: '#blog_post_info_block',
  },
}
```

## switchDayNight - 日/夜间模式

* 类型：```Object```
* 默认值：

```json
{
    enable: true,       // 是否开启日/夜间模式切换按钮
    nightMode: false,   // 强制夜间模式 （版本 >= v2.0.6）
    auto: {             // 自动切换相关配置
        enable: false,  // 开启自动切换
        dayHour: 5,     // 日间模式开始时间，整数型，24小时制
        nightHour: 19   // 夜间模式开始时间，整数型，24小时制
    }
}
```
?> nightMode 配置项要求，版本 >= v2.0.1

日/夜间模式配置。页面使用日/夜间模式优先级：用户设置 > 自动切换 > 默认。

```javascript
window.cnblogsConfig = {
    switchDayNight: {
        enable: true,
        auto: {
            enable: true
        }
    },
}
```

## animate - 动效

?> 版本 v2.0.3 及之后，所有动效默认配置为关闭。

?> 动效会消耗GPU，请大家按需选择开启

### homeBanner - 主页banner动效

* 类型：```Object```
* 默认值：

```json
{
    enable: false, // 是否开启动效
    options: {
        radius: 15,
        density: 0.2,
        color: 'rgba(255,255,255, .2)', // 颜色设置，“random” 为随机颜色
        clearOffset: 0.3
    }
}
```

主页banner动效配置。

```javascript
window.cnblogsConfig = {
  animate: {
    homeBanner: {
      enable: true,
      options: {
        radius: 15,
      }
    },
  }
}
```

### articleTitle - 文章页标题动效

?> 版本 >= v2.0.7

* 类型：```Object```
* 默认值：

```json
{
    enable: true // 是否开启动效
}
```

文章页标题动效配置。

```javascript
window.cnblogsConfig = {
  animate: {
    articleTitle: {
      enable: true,
    },
  }
}
```

### articleBanner - 文章页banner动效

* 类型：```Object```
* 默认值：

```json
{
    enable: false // 是否开启动效
}
```

文章页banner动效配置。

```javascript
window.cnblogsConfig = {
  animate: {
    articleBanner: {
      enable: true,
    },
  }
}
```

### background - 背景动效

* 类型：```Object```
* 默认值：

```json
{
  enable: false,
  options: {
    colorSaturation: "60%",
    colorBrightness: "50%",
    colorAlpha: 0.5,
    colorCycleSpeed: 5,
    verticalPosition: "random",
    horizontalSpeed: 200,
    ribbonCount: 3,
    strokeSize: 0,
    parallaxAmount: -0.2,
    animateSections: true
  }
}
```

背景动效。

```javascript
window.cnblogsConfig = {
  animate: {
    background: {
      enable: true,
    },
  }
}
```

### bannerImages - banner背景图自动切换动效

?> 版本 >= v2.0.8

* 类型：```Object```
* 默认值：

```json
{
  enable: false, // 是否开启
  options: {
    itemNum: 5, // 图片拆分成几列
    current: 0, // 初始图片的下标，如果为负数则为随机
    sort: 1, // 1 代表每次向下加载一个图片，-1 代表每次向上加载一个图片
    time: 30000 // 每次切换间隔时间，单位：毫秒
  }
}
```

banner背景图自动切换动效。

```javascript
window.cnblogsConfig = {
  animate: {
    bannerImages: {
      enable: true,
    },
  }
}
```

### backgroundMouse - 背景动效

?> 版本 >= v2.0.8

* 类型：```Object```
* 默认值：

```json
{
  enable: false // 是否开启
}
```

背景动效，颜色比较浅不影响阅读，鼠标移动有简单动偏移动画。

```javascript
window.cnblogsConfig = {
  animate: {
    backgroundMouse: {
      enable: true,
    },
  }
}
```

### mouse - 背景动效

?> 版本 >= v2.0.8

* 类型：```Object```
* 默认值：

```json
{
  enable: false, // 是否开启
  options: {
    size: 8, // 中心圆点的大小，单位 px
    sizeF: 36 // 外部边框的大小，单位 px
  }
}
```

跟随鼠标动效。

> 不会隐藏原鼠标，如果想隐藏原鼠标可以自行添加css样式 `html {cursor: none;}`

```javascript
window.cnblogsConfig = {
  animate: {
    mouse: {
      enable: true,
    },
  }
}
```

## code - 代码

### type - 渲染类型

* 类型：```String```
* 默认值：```""```

使用何种方式渲染代码。

```javascript
window.cnblogsConfig = {
  code: {
    type: 'hljs',
  }
}

/** 所有可配置项
cnblogs: 使用博客园默认代码高亮样式。
hljs: 使用 Highlighting 插件渲染代码高亮样式。
*/
```

### options - 渲染配置

#### hljs - Highlighting 插件样式配置

* 类型：```Object```
* 默认值：

```json
{
    theme: 'atom-one-dark-reasonable',
    languages: []
}
```

只有 `code.type` 为 `hljs` 时，此配置才生效。

* theme：代码高亮主题。

```
/** 所有可配置项
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
*/
```

* languages：语言识别范围，不配置默认不限制，[支持语言](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)。

```javascript
window.cnblogsConfig = {
  code: {
    type: 'hljs',
    options: {
      hljs: {
        theme: 'atom-one-dark-reasonable',
        languages: ['Bash', 'CSS', 'Dockerfile', 'Go', 'HTML', 'XML', 'HTTP']
      },
    },
  },
}
```

#### maxHeight - 代码框高度限制

* 类型：```String```
* 默认值：```""```

限制高度。例如：70vh、70%

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      maxHeight: '70vh',
    },
  },
}
```

#### line - 代码行号渲染

* 类型：```Boolean```
* 默认值：```false```

是否渲染代码行号，如开启会在代码框左侧增加行号显示，默认不开启。
不与博客园行号渲染兼容，如果博客园添加代码时勾选显示行号并同时开启此配置，会出现双行号的现象。大家自己权衡使用此配置。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      line: true,
    },
  },
}
```

#### macStyle - mac风格代码框

* 类型：```Boolean```
* 默认值：```true```

mac风格代码框样式。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      macStyle: true,
    },
  },
}
```

## articleDirectory - 文章目录

### position - 文章目录定位

?> 版本 >= v2.0.6

* 类型：```String```
* 默认值：```"right"```

用于设置文章目录显示在文章的左侧还是右侧，配置项：`right`、`left`

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        position: 'right',
    },
}
```

### minBodyWeight - 文章目录隐藏宽度

?> 版本 >= v2.0.7

* 类型：```Int```
* 默认值：```900```

文章目录在屏幕宽度到多少像素及以内时开始隐藏；例如：配置成 1000，当屏幕宽度 <= 1000 时，隐藏目录（可通过右下角按钮显示）

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        minBodyWeight: 1400,
    },
}
```

### autoWidthScroll - 文章目录横向滚动条

?> 版本 >= v2.0.8

* 类型：```Boolean```
* 默认值：```false```

文章目录中标题过长时候是否显示横向滚动条。

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        autoWidthScroll: true,
    },
}
```

## articleSuffix - 文章后缀

### imgUrl - 左侧图片

?> 版本 >= v2.0.1

* 类型：```Url```
* 默认值：```""```

文章后缀左侧图片，不配置使用用户头像配置 `info.avatar`，用户头像没配置使用主题默认头像。

```javascript
window.cnblogsConfig = {
  articleSuffix: {
    imgUrl: 'https://x1.jpg',
  },
}
```

### aboutHtml - 关于博主

* 类型：```String```
* 默认值：```""```

关于博主，支持HTML代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        aboutHtml: "I am a good person",
    },
}
```

### copyrightHtml - 版权声明

* 类型：```String```
* 默认值：```""```

版权声明，支持HTML代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        copyrightHtml: "版权...",
    },
}
```

### supportHtml - 声援博主

* 类型：```String```
* 默认值：```""```

声援博主，支持HTML代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        supportHtml: "声援...",
    },
}
```

## consoleList - 控制台输出

* 类型：```Array```
* 默认值：```[]```

控制台输出。

```javascript
window.cnblogsConfig = {
    consoleList: [
         ['BNDong CNBlogs', 'https://www.cnblogs.com/bndong'],
         ['BNDong GitHub', 'https://github.com/BNDong'],
         ['BNDong Email', 'dbuo@foxmail.com'],
    ],
}
```

## cnzz - 网站统计

* 类型：```String```
* 相关文档：[网站统计](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/statistical)
* 默认值：```""```

cnzz网站ID。

```javascript
window.cnblogsConfig = {
    cnzz: "123456",
}
```