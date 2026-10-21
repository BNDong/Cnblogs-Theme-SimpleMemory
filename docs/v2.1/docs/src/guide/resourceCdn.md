# 资源托管

可以将插件放到自己的静态资源服务上，通过 HTTPS 加载。

## 上传资源

上传编译后的整个 `dist/` 目录，保留目录结构。插件会继续加载其中的脚本分包、CSS、字体和图片，只有 `simpleMemory.js` 不能正常运行。

例如上传到网站的 `/simplememory/v2.1.7/` 目录后：

```html
<script>
window.cnblogsConfig = {
  // 填写自己的配置
};
</script>
<script src="https://example.com/simplememory/v2.1.7/simpleMemory.js" defer></script>
```

后台「页面定制 CSS」仍需填写同一版本的 `simpleMemory.css` 内容。跨域提供字体时，还需要资源服务允许相应的跨域请求。

## 检查加载

在博客页面打开浏览器开发者工具，检查 Network 面板：

- 入口脚本及后续资源没有 404、403 或证书错误。
- JavaScript、CSS 和字体请求返回对应文件，不能是网站的 HTML 错误页。
- 资源地址可以公开访问，不需要登录。

## 更新

建议每个版本使用独立目录。更新时上传完整资源、替换后台 CSS，再修改脚本地址。不要立即删除旧版本文件，详见[版本切换](./versionSwitch)。
