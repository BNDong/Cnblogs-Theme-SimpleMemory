# 资源托管

可以将主题托管到自己的云资源或CDN加速节点节点上。

例如我的网站为 `www.dbnuo.com`（IP或其它host），我将编译后的文件夹 `dist` 放到了网站的根目录。

这样我可以通过加载 `https://www.dbnuo.com/dist/simpleMemory.js` 来加载主题：

```html
<script type="text/javascript">
    window.cnblogsConfig = {
      info: {
        name: 'userName', // 用户名
        startDate: '2021-01-01', // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
        avatar: 'http://xxxx.png', // 用户头像
      },
    }
</script>
<script src="https://www.dbnuo.com/dist/simpleMemory.js" defer></script>
```



