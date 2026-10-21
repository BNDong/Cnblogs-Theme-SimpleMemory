# 基础配置

## info - 基础信息 {#info-基础信息}

### name - 用户昵称 {#name-用户昵称}

* 类型：`String`
* 默认值：`{默认抓取博客园用户名}`

用户昵称。

```javascript
window.cnblogsConfig = {
  info: {
    name: 'userName',
  },
}
```

### avatar - 用户头像 {#avatar-用户头像}

* 类型：`Url`
* 默认值：`""`

用户头像图片 Url。

```javascript
window.cnblogsConfig = {
  info: {
    avatar: 'https://example.com/image-1.jpg',
  },
}
```

### startDate - 入园时间 {#startdate-入园时间}

* 类型：`String`
* 默认值：`2021-01-01`

入园时间，年-月-日，入园时间查看方法：鼠标停留园龄时间上，会显示入园时间。

```javascript
window.cnblogsConfig = {
  info: {
    startDate: '2021-01-01',
  },
}
```

### blogIcon - 网站图标 {#blogicon-网站图标}

* 类型：`Url`
* 默认值：`""`

网站图标图片 Url。

```javascript
window.cnblogsConfig = {
  info: {
    blogIcon: 'https://example.com/image-1.jpg',
  },
}
```

## sidebar - 侧边栏 {#sidebar-侧边栏}

### navList - 菜单导航 {#navlist-菜单导航}

* 类型：`Array`
* 默认值：`[]`

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

### customList - 菜单数据 {#customlist-菜单数据}

* 类型：`Object`
* 默认值：`{}`

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
            "icon": "simple-memory-icon-brush_fill" // 配置图标，参考文档：字体图标
        },
        "title2": { // 标题
            "data": [ // 列表数据 ['列表', '链接']
                ['我的博客6', 'https://www.cnblogs.com/bndong/'],
                ['我的博客7', 'https://www.cnblogs.com/bndong/'],
                ['我的博客8', 'https://www.cnblogs.com/bndong/'],
                ['我的博客9', 'https://www.cnblogs.com/bndong/'],
                ['我的博客10', 'https://www.cnblogs.com/bndong/'],
            ],
            "icon": "simple-memory-icon-brush_fill" // 配置图标，参考文档：字体图标
        },
    },
  },
}
```

### infoBackground - 个人信息背景 {#infobackground-个人信息背景}

* 类型：`Url`
* 默认值：`""`

<Badge type="tip" text="< v2.1.0" /> 为侧边栏个人信息背景图片Url。
<br>
<Badge type="tip" text=">= v2.1.0" />  为侧边栏背景图片。

```javascript
window.cnblogsConfig = {
  sidebar: {
    infoBackground: 'https://example.com/image-1.jpg',
  },
}
```

### titleMsg - 侧边栏title信息 <Badge type="tip" text="v2.1.0" /> {#titlemsg-侧边栏title信息}

* 类型：`String`
* 默认值：`"欢迎访问本博客~"`

配置侧边栏 title 信息。

```javascript
window.cnblogsConfig = {
  sidebar: {
      titleMsg: '欢迎访问本博客~',
  },
}
```

### submenu - 侧边栏是否展开配置 <Badge type="tip" text="v2.1.3" /> [(#387)](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/387) {#submenu-侧边栏是否展开配置-387}

-   类型：`Object`
-   默认值：所有栏目的展开状态均为 `false`

默认都不展开，设置为 true 则展开。

```javascript
window.cnblogsConfig = {
    sidebar: {
        submenu: {
            // 积分排行
            pointsRank: false,
            // 最新随笔
            latestPosts: false,
            // 我的标签
            myTags: false,
            // 随笔分类
            postsClassify: false,
            // 文章分类
            articleClassify: false,
            // 阅读排行
            readRank: false,
            // 推荐排行
            recommendRank: false,
            // 帖子档案
            postsArchive: false,
            // 文章档案
            articleArchive: false,
            // 自定义列表
            customList: false,
            // 最新评论
            latestComment: false,
        },
    },
}
```

## title - 页面标签 {#title-页面标签}

### onblur - 失去焦点标签文字 {#onblur-失去焦点标签文字}

* 类型：`String`
* 默认值：`(oﾟvﾟ)ノ Hi`

当页面失去焦点，页面 title 显示的文字。

```javascript
window.cnblogsConfig = {
  title: {
    onblur: '(oﾟvﾟ)ノ Hi',
  },
}
```

### onblurTime - 失去焦点变化延时 {#onblurtime-失去焦点变化延时}

* 类型：`Number`
* 默认值：`500`

当页面失去焦点，页面 title 变化的延时时间，单位毫秒。

该配置值为 -1 时，当页面失去焦点，页面 title 显示的文字不会变化。

```javascript
window.cnblogsConfig = {
  title: {
    onblurTime: 500,
  },
}
```

### focus - 获取焦点标签文字 {#focus-获取焦点标签文字}

* 类型：`String`
* 默认值：`(*´∇｀*) 欢迎回来！`

当页面获取焦点，页面 title 显示的文字；显示后，延时恢复原 title。

```javascript
window.cnblogsConfig = {
  title: {
    focus: '(*´∇｀*) 欢迎回来！',
  },
}
```

### focusTime - 获取焦点变化延时 {#focustime-获取焦点变化延时}

* 类型：`Number`
* 默认值：`1000`

当页面获取焦点，页面 title 变化的延时时间，单位毫秒。

该配置值为 -1 时，当页面获取焦点，页面 title 显示的文字不会变化。

```javascript
window.cnblogsConfig = {
  title: {
    focusTime: 1000,
  },
}
```

## fonts - 字体

### families - 加载的字体

* 类型：`Array<String>`
* 默认值：`[]`

当前源码支持按需加载字体。未配置或空数组会加载全部内置字体；包含不支持的名称时也会回退到全部字体。这个配置控制资源加载，不会修改页面各处的 CSS 字体选择。

可用名称为 `Long Cang`、`Noto Sans SC`、`Noto Serif SC`、`Playball`、`Ubuntu Mono` 和 `ZCOOL XiaoWei`，注意大小写。

```javascript
window.cnblogsConfig = {
  fonts: {
    families: ['Playball', 'Ubuntu Mono'],
  },
};
```

## consoleList - 控制台输出 {#consolelist-控制台输出}

* 类型：`Array`
* 默认值：`[]`

控制台输出。

```javascript
window.cnblogsConfig = {
    consoleList: [
         ['BNDong CNBlogs', 'https://www.cnblogs.com/bndong'],
         ['BNDong GitHub', 'https://github.com/BNDong'],
         ['BNDong Email', 'dbnuo@foxmail.com'],
    ],
}
```
