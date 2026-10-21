# 调试开发

需要 Node.js ≥ 20.9.0 和 npm。以下命令在仓库根目录执行。

## 本地构建

```sh
npm ci
npm test
npm run build
npm run server
```

构建结果位于 `dist/`，资源服务默认使用 3100 端口。这个服务只提供插件资源，不包含博客园页面。

将博客园侧边栏公告中的插件地址临时换成可公开访问的 **HTTPS 调试地址**。HTTPS 博客页面可能阻止 HTTP 本地资源，不能直接把任意本地地址当作远程调试地址。

每次修改后执行 `npm run build`，再刷新博客。改动基础样式时，同步更新后台「页面定制 CSS」中的内容。调试结束后恢复正式版本的 CSS 和脚本地址。

## 使用 Codespaces

该方式由 [fzxiang](https://github.com/fzxiang) 提供。

1. 在自己的 fork 中创建 Codespace。
2. 打开终端，执行上面的依赖安装、测试、构建和启动命令。
3. 在端口面板找到 3100 端口，将可见性设为 `Public`，以便博客页面无需登录即可加载资源。
4. 复制该端口的 HTTPS 地址，确认可以访问其中的 `simpleMemory.js`。
5. 临时替换博客的插件地址，例如：

```html
<script src="https://你的-codespace-名称-3100.app.github.dev/simpleMemory.js" defer></script>
```

只公开用于调试插件资源的端口。调试结束后停止资源服务并恢复博客配置。Codespaces 的额度和收费以自己的 GitHub 账户页面为准。

![Codespaces 创建入口](/images/codespaces/codespaces_01.jpg)

![端口可见性设置](/images/codespaces/codespaces_03.png)

## 使用 jsDelivr

也可以将构建结果提交到自己的公开 fork，通过 commit SHA 加载固定版本。修改源码后需要重新构建并提交 `dist/`，仅提交源码不会改变插件文件。

```html
<script src="https://cdn.jsdelivr.net/gh/你的用户名/Cnblogs-Theme-SimpleMemory@COMMIT_SHA/dist/simpleMemory.js" defer></script>
```

将用户名和 `COMMIT_SHA` 换成自己的值。CDN 有缓存，频繁调试时优先使用自己的资源服务。

## 修改文档

文档的安装、检查和发布目录说明见[文档维护](./documentation)。
