# 文章配置

## articleDirectory - 文章目录 {#articledirectory-文章目录}

### position - 文章目录定位 <Badge type="tip" text="v2.0.6" /> {#position-文章目录定位}

* 类型：`String`
* 默认值：`"right"`

用于设置文章目录显示在文章的左侧还是右侧，配置项：`right`、`left`

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        position: 'right',
    },
}
```

### minBodyWeight - 文章目录隐藏宽度 <Badge type="tip" text="v2.0.7" /> {#minbodyweight-文章目录隐藏宽度}

* 类型：`Number`
* 默认值：`900`

文章目录在屏幕宽度到多少像素及以内时开始隐藏；例如：配置成 1000，当屏幕宽度 <= 1000 时，隐藏目录（可通过右下角按钮显示）。即使未达到阈值，正文两侧可用空间不足时也会隐藏

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        minBodyWeight: 1400,
    },
}
```

### autoWidthScroll - 文章目录横向滚动条 <Badge type="tip" text="v2.0.8" /> {#autowidthscroll-文章目录横向滚动条}

* 类型：`Boolean`
* 默认值：`false`

文章目录中标题过长时候是否显示横向滚动条。

```javascript
window.cnblogsConfig = {
    articleDirectory: {
        autoWidthScroll: true,
    },
}
```
### number - 文章目录标题编号 <Badge type="tip" text="v2.1.7" /> {#number-文章目录标题编号}

* 类型：`Boolean`
* 默认值：`false`

文章目录中标题是否显示编号。

```javascript
window.cnblogsConfig = {
    articleDirectory: {
         number: false,
    },
}
```

## articleComment - 文章评论 {#articlecomment-文章评论}

### background - 文章评论背景 <Badge type="tip" text="v2.1.3" /> [(#386)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/386) {#background-文章评论背景-386}

* 类型：`Object`
* 配置结构（图片地址为自定义示例）：

```json5
    {
      enable: false,
      options: {
        day: 'url("https://example.com/comment-day.png") no-repeat right center / 35%',
        night: 'url("https://example.com/comment-night.png") no-repeat right center / 35%',
      },
    }
```

不设置 `options` 时使用插件内置图片；只有替换图片时才需要填写自己的完整 HTTPS 地址。

```javascript
window.cnblogsConfig = {
    articleComment: {
        background: {
            enable: false,
        },
    },
}
```

## articleContent - 文章内容 {#articlecontent-文章内容}

### prefixIcon - 文章标题前图标 <Badge type="tip" text="v2.1.3" /> [(#379)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/379) {#prefixicon-文章标题前图标-379}

* 类型：`Object`
* 配置结构（图标列表为节选）：

```json5
{
    enable: false,
    options: {
        // iconfont 地址
        link: "https://at.alicdn.com/t/c/font_3628204_t6n3fw8b1zn.js",
        // 用于展示的iconfont名称
        iconfontArr: ['hebaodan', 'bingtanghulu', 'kesong'], // 示例，填写图标库中的名称
    }
}
```

标题前的图标。默认使用内置图标集合；`iconfontArr` 上方只列出部分名称，完整默认列表见[默认配置源码](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2/src/components/config/config.json5)。

```javascript
window.cnblogsConfig = {
    articleContent: {
        prefixIcon: {
            enable: true, // 使用内置图标库和默认图标集合
        }
    },
}
```

## articleSuffix - 文章后缀 {#articlesuffix-文章后缀}

### imgUrl - 左侧图片 <Badge type="tip" text="v2.0.1" /> {#imgurl-左侧图片}

* 类型：`Url`
* 默认值：`""`

文章后缀左侧图片，不配置使用用户头像配置 `info.avatar`，用户头像没配置使用主题默认头像。

```javascript
window.cnblogsConfig = {
  articleSuffix: {
    imgUrl: 'https://example.com/image-1.jpg',
  },
}
```

### aboutHtml - 关于博主 {#abouthtml-关于博主}

* 类型：`String`
* 默认值：`""`

关于博主，支持 HTML 代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        aboutHtml: "I am a good person",
    },
}
```

### copyrightHtml - 版权声明 {#copyrighthtml-版权声明}

* 类型：`String`
* 默认值：`""`

版权声明，支持 HTML 代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        copyrightHtml: "版权...",
    },
}
```

### supportHtml - 声援博主 {#supporthtml-声援博主}

* 类型：`String`
* 默认值：`""`

声援博主，支持 HTML 代码，不配置使用默认。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        supportHtml: "声援...",
    },
}
```

### copyInfo - 文章复制携带版权信息 <Badge type="tip" text="v2.1.5" /> [(#429)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/429) {#copyinfo-文章复制携带版权信息-429}

* 类型：`Object`
* 默认值：

```json5
{
    enable: false, // 是否开启
    length: 100, // 当文章页面上选中多少文字后开始生效
    copyright: '', //  复制携带版权信息，默认为 copyrightHtml
}
```

文章页上，鼠标选中文字进行复制携带版权信息。

```javascript
window.cnblogsConfig = {
    articleSuffix: {
        copyInfo: {
            enable: true,
            length: 100,
            copyright: '',
        }
    }
}
```

## memorialDays - 国家公祭日和自定义缅怀的日期 <Badge type="tip" text="v2.1.5" /> [(#439)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/439) {#memorialdays-国家公祭日和自定义缅怀的日期-439}

* 类型：`Array`
* 默认值：`[]`

12 月 13 日固定显示灰度页面；`memorialDays` 用于添加其他日期，空数组不会关闭 12 月 13 日的灰度效果。日期使用带前导零的月日，格式为 `MM-DD`。

```javascript
window.cnblogsConfig = {
    memorialDays: [
        '07-04',
        '12-13'
    ],
}
```
