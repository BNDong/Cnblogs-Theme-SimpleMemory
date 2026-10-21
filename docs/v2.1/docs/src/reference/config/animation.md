# 动效配置

## animate - 动效 {#animate-动效}

v2.0.3 及之后，动效默认关闭。按需开启即可，移动设备上建议减少同时运行的动效。

### homeBannerTitle - 主页banner上name的动效 <Badge type="tip" text="v2.1.3" /> {#homebannertitle-主页banner上name的动效}

* 类型：`Object`
* 默认值：

```json5
{
    enable: false // 是否开启动效
}
```

主页 banner 上 name 的动效（鼠标移入显示）

```javascript
window.cnblogsConfig = {
    animate: {
        homeBannerTitle: {
            enable: true
        },
    },
}
```

### homeBanner - 主页 Banner 动效 {#homebanner-主页-banner-动效}

* 类型：`Object`
* 默认值：

```json5
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

主页 Banner 动效配置。

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

### articleTitle - 文章页标题动效 <Badge type="tip" text="v2.0.7" /> {#articletitle-文章页标题动效}

* 类型：`Object`
* 默认值：

```json5
{
    enable: false // 是否开启动效
}
```

文章页标题动效配置。

```javascript
window.cnblogsConfig = {
  animate: {
    articleTitle: {
      enable: true
    },
  }
}
```

### articleBanner - 文章页 Banner 动效 {#articlebanner-文章页-banner-动效}

* 类型：`Object`
* 默认值：

```json5
{
    enable: false // 是否开启动效
}
```

文章页 Banner 动效配置。

```javascript
window.cnblogsConfig = {
  animate: {
    articleBanner: {
      enable: true
    },
  }
}
```

### background - 背景动效 {#background-背景动效}

* 类型：`Object`
* 默认值：

```json5
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

### bannerImages - Banner 背景图自动切换 <Badge type="tip" text="v2.0.8" /> {#bannerimages-banner-背景图自动切换}

* 类型：```Object```
* 默认值：

```json5
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

Banner 背景图自动切换动效。

```javascript
window.cnblogsConfig = {
  animate: {
    bannerImages: {
      enable: true,
    },
  }
}
```

### backgroundMouse - 背景动效 <Badge type="tip" text="v2.0.8" /> {#backgroundmouse-背景动效}

* 类型：`Object`
* 默认值：

```json5
{
  enable: false // 是否开启
}
```

背景动效，颜色比较浅不影响阅读，鼠标移动有简单动偏移动画。

```javascript
window.cnblogsConfig = {
  animate: {
    backgroundMouse: {
      enable: true
    },
  }
}
```

### mouse - 跟随鼠标动效 <Badge type="tip" text="v2.0.8" /> {#mouse-跟随鼠标动效}

* 类型：`Object`
* 默认值：

```json5
{
  enable: false, // 是否开启
  options: {
    size: 8, // 中心圆点的大小，单位 px
    sizeF: 36 // 外部边框的大小，单位 px
  }
}
```

跟随鼠标动效。

::: tip 提示
不会隐藏原鼠标，如果想隐藏原鼠标可以自行添加css样式 `html {cursor: none;}`
:::

```javascript
window.cnblogsConfig = {
  animate: {
    mouse: {
      enable: true,
    },
  }
}
```

### season - 花瓣飘落动效 <Badge type="tip" text="v2.1.3" /> [(#382)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/382) {#season-花瓣飘落动效-382}

-   类型：`Object`
-   配置结构（图片地址为示例）：

```json5
{
    "enable": false,
    "options": {
      // 可选：自定义透明背景图片，不填时使用内置花瓣
      "img": "https://example.com/petal.png",
      "size": 40
    }
}
```

::: tip 提示
`img` 可以使用 HTTPS 图片地址或 Data URL，建议使用透明背景素材。保留内置图片时只设置 `enable`，无需复制图片数据。
:::

```javascript
window.cnblogsConfig = {
  animate: {
    season: {
        enable: false
    }
  }
}
```

### avatar - 头像旋转动效 <Badge type="tip" text="v2.1.3" /> [(#383)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/383) {#avatar-头像旋转动效-383}

-   类型：`Object`
-   默认值：

```json5
{
  enable: false // 是否开启
}
```

```javascript
window.cnblogsConfig = {
    animate: {
        avatar: {
            enable: false
        },
    },
}
```

### typing - 评论框打字动效 <Badge type="tip" text="v2.1.5" /> [(#431)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/431) {#typing-评论框打字动效-431}

-   类型：`Object`
-   默认值：

```json5
{
    enable: false, // 是否开启
    options: {
        colorful: true,  // 是否多彩
        shake: false, // 是否震动
    }
}
```

```javascript
window.cnblogsConfig = {
    animate: {
        typing: {
            enable: false
        },
    },
}
```
