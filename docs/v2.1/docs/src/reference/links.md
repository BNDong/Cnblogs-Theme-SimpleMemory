# 友链页

样式参考：[https://www.cnblogs.com/bndong/p/14708992.html](https://www.cnblogs.com/bndong/p/14708992.html)

## 配置方式

### 标识页面为友链页面

首先需要在页面源码中加入以下代码，来标识该页面为友链页面：

```html
<input id="linkListFlg" type="hidden" />
```

::: danger 注意
是添加到 HTML 源码中，博客园文章的富文本编辑器和 Markdown 都有添加 HTML 代码的方式！
:::

#### 富文本编辑器

![img](/images/reprinted/reprinted_01.png)

#### Markdown

直接拷贝到文本即可。

### 配置友链数据

友链的配置，可以参考其他[配置](/reference/configs)的方式。例如：

```javascript
window.cnblogsConfig = [
  links: {
    page: [
      {
        "title": "友情链接", // 标题
        "icon": "icon-weibiaoti22", // 标题图标
        "style": "color: #a78bfa;", // 标题样式
        "links": [
          {
            name: 'BNDong', // 昵称
            introduction: 'IT技术类博客', // 简介
            avatar: 'https://blog.dbnuo.com/images/avatar.gif', // 头像
            url: 'https://blog.dbnuo.com' // 友链地址
          }
        ]
      }
    ]
  }
];
```

此配置可以单独出来。例如：

```javascript

//  正常配置
window.cnblogsConfig = {
  links: {},
};

// 友链页配置
window.cnblogsConfig.links.page = [
  {
    "title": "友情链接",
    "icon": "icon-weibiaoti22",
    "style": "color: #a78bfa;",
    "links": [
      {
        name: 'BNDong',
        introduction: 'IT技术类博客',
        avatar: 'https://blog.dbnuo.com/images/avatar.gif',
        url: 'https://blog.dbnuo.com'
      },
            {
        name: 'BNDong',
        introduction: 'IT技术类博客',
        avatar: 'https://blog.dbnuo.com/images/avatar.gif',
        url: 'https://blog.dbnuo.com'
      },
      {
        name: 'BNDong',
        introduction: 'IT技术类博客',
        avatar: 'https://blog.dbnuo.com/images/avatar.gif',
        url: 'https://blog.dbnuo.com'
      }
    ]
  }
];
```

请按照此格式配置。

| **Key**                          | **Description** |
| :------------------------------- | :-------------- |
| **title**                        | 友链标题        |
| **icon**                         | 标题图标        |
| **style**                        | 标题扩展样式    |
| **links**                        | 标题下友链配置  |
| **links[<i>n</i>].name**         | 昵称            |
| **links[<i>n</i>].introduction** | 简介            |
| **links[<i>n</i>].avatar**       | 头像            |
| **links[<i>n</i>].url**          | 友链地址        |