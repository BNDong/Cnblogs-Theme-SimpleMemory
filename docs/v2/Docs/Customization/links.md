# 友链

样式参考：[https://www.cnblogs.com/bndong/p/14708992.html](https://www.cnblogs.com/bndong/p/14708992.html)

## 配置方式

### 标识页面为友链页面

首先需要在页面源码中加入以下代码，来标识该页面为友链页面：

```html
<input id="linkListFlg" type="hidden" />
```

!> 注意：是添加到Html源码中，博客园文章的富文本编辑器和 Markdown 都有添加Html代码的方式！

#### 富文本编辑器

![reprinted_01](../../Images/reprinted_01.png)

#### Markdown

直接拷贝到文本即可。

### 配置友链数据

友链的配置，可以参考其他[配置](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/config)的方式。例如：

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

此配置可以单独出来。例如：

```javascript

    //  正常配置
    window.cnblogsConfig = {
      links: {},
    };

    // 友链配置
    window.cnblogsConfig.links.page = [
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
      },
      {
        name: 'BNDong',
        introduction: 'IT技术类博客',
        avatar: 'https://blog.dbnuo.com/images/avatar.gif',
        url: 'https://blog.dbnuo.com'
      },
    ];
```

?> 请按照此格式配置。

|**Key**|**Description**|
|:-----:|:-----:|
|**name**|昵称|
|**introduction**|简介|
|**avatar**|头像|
|**url**|友链地址|