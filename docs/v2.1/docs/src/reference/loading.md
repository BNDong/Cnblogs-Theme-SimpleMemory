# Loading

插件使用 [spring-loaders](https://github.com/claudiocalautti/spring-loaders) 显示加载动画，参数写在 `window.cnblogsConfig.loading` 中。默认参数和示例见[Loading 配置](./config/loading)。

## 页面一直显示加载动画

先检查浏览器控制台和 Network 面板，确认插件配置没有语法错误，入口脚本及后续资源能正常加载。隐藏动画不能解决加载中断的问题。

## 隐藏遮罩

如果不希望显示遮罩，可以在博客园后台「页首 HTML 代码」中添加：

```html
<style>
body {
  overflow: auto !important;
}
#loading,
a[name="top"] {
  display: none !important;
}
</style>
```

这只隐藏遮罩，插件的加载流程和钩子仍会执行。页面可能在样式加载完成前短暂显示原始内容。删除这段样式即可恢复显示。

无需读取或修改 `document.styleSheets`。当前没有 `loading.enable` 配置，不能通过添加这个字段关闭加载流程。
