# 友链页

[查看示例](https://www.cnblogs.com/bndong/p/14708992.html)

## 标识页面

在文章正文的 HTML 中添加：

```html
<input id="linkListFlg" type="hidden" />
```

Markdown 编辑器可以直接粘贴；富文本编辑器需要切换到 HTML 源码模式。

![富文本编辑器的 HTML 源码按钮](/images/reprinted/reprinted_01.png)

## 配置数据

将 `links.page` 合并到全局配置中，放在插件脚本之前。每组友链包含一个 `links` 数组：

```javascript
window.cnblogsConfig = {
  links: {
    page: [{
      title: '友情链接',
      icon: 'icon-weibiaoti22',
      style: 'color: #a78bfa;',
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

头像需要替换为自己的图片地址。添加更多分类时，在 `page` 数组中新增分类对象；添加同分类的好友时，在该分类的 `links` 数组中新增好友对象。

| 字段 | 说明 |
| --- | --- |
| `title` | 分类标题，可以留空 |
| `icon` | 分类标题图标，填写 `icon-` 开头的名称 |
| `style` | 分类标题的额外 CSS 样式，可以留空 |
| `links` | 该分类的好友数组 |
| `links[n].name` | 昵称 |
| `links[n].introduction` | 简介 |
| `links[n].avatar` | 头像地址 |
| `links[n].url` | 博客地址 |

需要将友链数据单独维护时，先定义完整配置，再赋值给 `window.cnblogsConfig.links.page`。保留原有的其他配置，不要再次覆盖整个 `window.cnblogsConfig`。更多字段见[外观配置](./config/appearance#links-友情链接)。
