---
outline: [2, 4]
---

# 外观配置

## banner - Banner {#banner-banner}

### home - 主页 {#home-主页}
<br>

#### background - 主页 Banner 图片 {#background-主页-banner-图片}

* 类型：`Array`
* 默认值：`[]`

主页 Banner 图片 URL，推荐尺寸 >= 1920*1080，支持多张，每次刷新随机设置一张。

```javascript
window.cnblogsConfig = {
    banner: {
        home: {
            background: [
                "https://example.com/image-1.jpg",
                "https://example.com/image-2.jpg",
                "https://example.com/image-3.jpg",
            ],
        },
    },
}
```

#### title - 主页 Banner 标语 {#title-主页-banner-标语}

* 类型：`String` or `Array`
* 默认值：`[]`

主页 Banner 上的标语，设置此选项会显示自定义文字，默认为空，自动获取一句。

1. 设置文字，会固定显示该文字。
2. 设置数组，随机从数组中获取一条文字显示。

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

#### titleSource - 主页 Banner 标语获取源 {#titlesource-主页-banner-标语获取源}

* 类型：`String`
* 默认值：`"jinrishici"`

主页 Banner 上的标语获取源，默认为 `jinrishici` 每次刷新随机获取一句古诗词。

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

### article - 文章页 {#article-文章页}
<br>

#### background - 文章页 Banner 图片 {#background-文章页-banner-图片}

* 类型：`Array`
* 默认值：`[]`

文章页 Banner 图片 URL，推荐尺寸 >= 1920*1080，支持多张，每次刷新随机设置一张。

```javascript
window.cnblogsConfig = {
    banner: {
        article: {
            background: [
                "https://example.com/image-1.jpg",
                "https://example.com/image-2.jpg",
                "https://example.com/image-3.jpg",
            ],
        },
    },
}
```

## fontIconExtend - 字体图标库扩展 {#fonticonextend-字体图标库扩展}

* 类型：`Url`
* 默认值：`""`

字体图标库扩展Css的Url。

```javascript
window.cnblogsConfig = {
    fontIconExtend: "https://at.alicdn.com/t/font_xxxxxxxxxx.css",
}
```

## progressBar - 顶部进度条 {#progressbar-顶部进度条}

* 类型：`Object`
* 默认值：

```json5
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

## footer - 页脚 {#footer-页脚}

### style - 页脚样式 {#style-页脚样式}

* 类型：`Number`
* 默认值：`2`

页脚样式：

style: 1

![img](/images/footer/footer_01.png)

style: 2

![img](/images/footer/footer_02.png)

```javascript
window.cnblogsConfig = {
  footer: {
    style: 1,
  },
}
```

### text - 页脚标语 {#text-页脚标语}

#### left - 页脚标语左侧文字 {#left-页脚标语左侧文字}

* 类型：`String`
* 默认值：`""`

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

#### right - 页脚标语右侧文字 {#right-页脚标语右侧文字}

* 类型：`String`
* 默认值：`""`

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

#### iconFont - 页脚标语中间图标 {#iconfont-页脚标语中间图标}

* 类型：`Object`
* 默认值：

```json5
{
    icon:  "icon-xl", // iconfont 图标名称
    color: "red", // 图标颜色
    fontSize: "16px" // 图标大小
}
```

页脚标语中间字体图标。

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

### aplayer - 音乐播放器 <Badge type="tip" text="v2.1.3" /> [(#388)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/388) {#aplayer-音乐播放器-388}

-   类型：`Object`
-   默认值：

```json5
{
    enable: false,
    cdn: {
        aplayer: 'https://cdn.staticfile.net/aplayer/1.10.1/APlayer.min.js',
        aplayercss: 'https://cdn.staticfile.net/aplayer/1.10.1/APlayer.min.css',
        meting: 'https://cdn.staticfile.org/meting/2.0.1/Meting.min.js',
    },
    options: {
        id: '3778678',
        api: '',
        server: 'netease',
        type: 'playlist',
        auto: 'netease',
        fixed: 'true',
        mini: 'true',
        autoplay: 'false',
        theme: '#2980b9',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: '0.7',
        mutex: 'true',
        lrcType: '0',
        listFolded: 'true',
        listMaxHeight: '340px',
        storageName: 'cnblogsTheme',
    }
}
```

音乐播放器依赖外部脚本和音乐接口。配置示例不保证所有平台、歌单或自动播放都可用；请检查所用接口的响应和浏览器播放限制。

* aplayer.cdn

引入的外部播放器脚本文件地址，可自行修改。

* aplayer.options:

| option        | default                                                                   | description                                                                                                                  |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| id            | **require**                                                               | song id / playlist id / album id / search keyword                                                                            |
| server        | **require**                                                               | 音乐平台标识，是否可用取决于所使用的 Meting 服务                                                              |
| type          | **require**                                                               | `song`, `playlist`, `album`, `search`, `artist`                                                                              |
| auto          | options                                                                   | 音乐链接自动识别，支持范围取决于 Meting 服务                                                                           |
| fixed         | `true`                                                                    | enable fixed mode                                                                                                            |
| mini          | `true`                                                                   | enable mini mode                                                                                                             |
| autoplay      | `false`                                                                   | audio autoplay                                                                                                               |
| theme         | `#2980b9`                                                                 | main color                                                                                                                   |
| loop          | `all`                                                                     | player loop play, values: 'all', 'one', 'none'                                                                               |
| order         | `random`                                                                  | player play order, values: 'list', 'random'                                                                                  |
| preload       | `auto`                                                                    | values: 'none', 'metadata', 'auto'                                                                                           |
| volume        | `0.7`                                                                     | default volume, notice that player will remember user setting, default volume will not work after user set volume themselves |
| mutex         | `true`                                                                    | prevent to play multiple player at the same time, pause other players when this player start play                            |
| lrcType       | `0`                                                                       | lyric type , Don't display lyrics when the value is 0                                                                        |
| listFolded    | `true`                                                                    | indicate whether list should folded at first                                                                                 |
| listMaxHeight | `340px`                                                                   | list max height                                                                                                              |
| storageName   | `cnblogsTheme`                                                            | localStorage key that store player setting                                                                                   |
| api | `""` | 自定义 Meting API 模板；空值时由加载的 Meting 脚本决定默认接口 |


```javascript
window.cnblogsConfig = {
    footer: {
        aplayer: {
            enable: false,
        },
    },
}
```

## links - 友情链接 {#links-友情链接}

### footer - 页脚友链 {#footer-页脚友链}

* 类型：`Array`
* 默认值：`[]`

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

### page - 友链页 {#page-友链页}

* 类型：`Array`
* 默认值：`[]`

按分类设置友链，每组包含 `title`、`icon`、`style` 和 `links` 数组。完整示例和页面标记见[友链页](/reference/links)。

```javascript
window.cnblogsConfig = {
  links: {
    page: [{
      title: '友情链接',
      icon: 'icon-weibiaoti22',
      style: '',
      links: [{
        name: 'BNDong',
        introduction: 'IT 技术博客',
        avatar: 'https://example.com/avatar.png',
        url: 'https://www.cnblogs.com/bndong/',
      }],
    }],
  },
};
```

## rtMenu - 右下角菜单 {#rtmenu-右下角菜单}

### qrCode - 二维码 {#qrcode-二维码}

* 类型：`Url`
* 默认值：`""`

二维码图片 URL。

```javascript
window.cnblogsConfig = {
  rtMenu: {
    qrCode: 'https://example.com/image-1.jpg',
  },
}
```
### reward - 赞赏 {#reward-赞赏}

* 类型：`Object`
* 默认值：

```json5
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
      alipay: 'https://example.com/image-1.jpg',
      wechatpay: 'https://example.com/image-2.jpg'
    },
  },
}
```

### downScrollDom - 跳至底部位置定义 {#downscrolldom-跳至底部位置定义}

* 类型：`String`
* 默认值：`""`

跳至底部位置定义，配置为 JQuery 选择器。

```javascript
window.cnblogsConfig = {
  rtMenu: {
    downScrollDom: '#blog_post_info_block',
  },
}
```

## switchDayNight - 日/夜间模式 {#switchdaynight-日-夜间模式}

* 类型：`Object`
* 默认值：

```json5
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

::: tip 提示
nightMode 配置项要求，版本 >= v2.0.6
:::

`enable: false` 会关闭整个日夜切换功能。初始化时先读取手动切换留下的 Cookie，没有记录时按自动时段或默认日间模式选择；`nightMode: true` 会覆盖上述选择，强制以夜间模式初始化。手动选择记录保留 4 小时。自动时段在页面初始化时判断，不是后台定时切换。

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
