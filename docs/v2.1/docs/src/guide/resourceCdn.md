# 资源托管

可以将插件托管到自己的云资源或其它 CDN 加速节点上。

例如：我的网站为 `www.dbnuo.com`（实际根据情况可以是 IP 或其它 host）

然后我将编译后的文件夹 `dist` 放到了网站的根目录。

这样我可以通过加载 `https://www.dbnuo.com/dist/simpleMemory.js` 来安装插件：

```html
<script type="text/javascript">
    window.cnblogsConfig = {
      // ...
    }
</script>
<script src="https://www.dbnuo.com/dist/simpleMemory.js" defer></script>
```