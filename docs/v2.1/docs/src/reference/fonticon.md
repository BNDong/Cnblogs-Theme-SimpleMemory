# 字体图标

主题使用 [iconfont](https://www.iconfont.cn/) 图标库。

## 内置图标

- [基本图标预览](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/demo_index.html)：用于导航、页脚等位置，初始化时加载 CSS。
- [文章标题图标预览](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/posts_index.html)：用于正文标题前的装饰，开启 `articleContent.prefixIcon` 后在文章页加载。

v2.1.3 及以后，内置基本图标使用 `simple-memory-` 前缀。不同配置字段的写法有所区别：

| 位置 | 示例 | 说明 |
| --- | --- | --- |
| `sidebar.navList` 第三个值 | `icon-github` | 插件会添加内置前缀，同时保留扩展图标类名 |
| `sidebar.customList` 的 `icon` | `simple-memory-icon-brush_fill` | 直接输出类名，使用内置图标时要写完整前缀 |
| `footer.text.iconFont.icon` | `icon-xl` | 插件会添加内置前缀 |
| 友链分类的 `icon` | `icon-weibiaoti22` | 插件会添加内置前缀 |

## 扩展图标库

在 iconfont 创建自己的图标库并获取 CSS 地址，方法见[官方教程](https://www.iconfont.cn/help/detail?helptype=about)。保留默认的 `icon-` 类名前缀，然后配置：

```javascript
window.cnblogsConfig = {
  fontIconExtend: 'https://at.alicdn.com/t/你的图标库.css',
  sidebar: {
    navList: [
      ['我的链接', 'https://example.com/', 'icon-xxx'],
    ],
  },
};
```

将地址和 `icon-xxx` 替换为图标库实际生成的值。扩展图标与内置图标同名时，扩展样式可能覆盖相应图标，建议为自己的图标使用不重复的名称。
