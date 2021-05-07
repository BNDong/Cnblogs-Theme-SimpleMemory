# Loading

Loading 使用开源项目：[claudiocalautti/spring-loaders](https://github.com/claudiocalautti/spring-loaders)

大家可以根据该项目文档修改```window.cnblogsConfig.loading```的配置。

## 关于网页快照显示空白页

?> 此方案由网友 [蓝天上的云℡](https://www.cnblogs.com/yucloud/) 提供。

!> 应用此方案，会导致进入网页有闪屏的现象，大家自己权衡使用。

在页首HTML里添加

```html
<style>
body  {overflow: auto}
div#loading, a[name=top] {    display: none   }
</style>
```

即可关闭Loading，然后在侧边栏公告JS的顶部里添加

```html
<script type="text/javascript">
  let css0 = document.styleSheets[0];
  let css0Last = css0.cssRules.length;
  css0.insertRule("body {overflow: hidden;}", css0Last+0);
  css0.insertRule("div#loading, a[name=top] {  display: auto }", css0Last+1);
</script>
```