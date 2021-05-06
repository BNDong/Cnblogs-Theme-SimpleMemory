# 播放器

播放器使用开源项目：[metowolf/MetingJS](https://github.com/metowolf/MetingJS)

如需使用播放器，请根据项目文档配置代码，添加至页脚Html代码中。

!> 已知问题：使用此播放器插件，会导致博客园原有的页面锚点链接失效（主题设置的不受影响）！不影响基本使用，请大家权衡是否使用！

!> 目前发现受影响的有：1) Markdown 文章中 ```[toc]``` 生成的目录链接跳转。2) 博客园原有的返回顶部链接跳转。

```html
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
<!-- require MetingJS -->
<script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>
<meting-js
        id="594243151"
        lrc-type="0"
        server="netease"
        order="random"
        type="playlist"
        fixed="true"
        list-olded="true">
</meting-js>
```