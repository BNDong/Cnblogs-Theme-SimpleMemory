# 字体图标库

本主题使用的图标库为阿里巴巴矢量图标库 [iconfont](https://www.iconfont.cn/)。

## 拓展图标
大家可以在 iconfont 生成自己的图标库，生成方法参考[官方教程](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.13&helptype=about)。
<br>获取样式地址后按照下面示例方式添加到配置中

```javascript
window.cnblogsConfig = {
    fontIconExtend: "//at.alicdn.com/t/font_xxxxxxxxx.css",
}
```

### 使用教程

> 比如说在侧边栏配置中，这时候就可以愉快的使用自己拓展图标的图标进行配置了；

```
window.cnblogsConfig = {
    sidebar: { // 列表数据 ['导航名称', '链接', 'icon']
        navList: [
            ['我的博客1', 'https://www.cnblogs.com/bndong/', 'icon-xxx'],
            ['我的博客2', 'https://www.cnblogs.com/bndong/', 'icon-xxx'],
        ],
    },
}
```


## 内置图标

> 内置图标分为基本图标和文章图标， 两者加载的文件和位置均不同；


### 基本图标

?> 用于主题基本图标的配置，默认以CSS方式进行加载，主题初始化时就会加载；<br /> [预览页面>>](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/demo_index.html)


<iframe
height=850
width=98%
src="https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/demo_index.html"
frameborder=0
allowfullscreen>
</iframe>

### 文章标题图标

?> 用于文章标题前的修饰，以JS方式进行加载，开启相应的配置后只会在文章页进行加载；<br /> [预览页面>>](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/posts_index.html)

<iframe
height=850
width=98%
src="https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/iconfontDemo/posts_index.html"
frameborder=0
allowfullscreen>
</iframe>