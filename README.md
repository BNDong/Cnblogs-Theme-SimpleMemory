<div align="center">
  <img src="./src/images/simple2.png" width="420" alt="SimpleMemory Logo" />

  <p>基于博客园 SimpleMemory 皮肤的扩展美化插件</p>

  <p>
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases"><img src="https://img.shields.io/github/v/release/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=f279a8" alt="最新发布版本" /></a>
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/stargazers"><img src="https://img.shields.io/github/stars/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=71d9cf" alt="GitHub Stars" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/github/license/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=8b95a5" alt="MIT 许可证" /></a>
  </p>

  <p>
    <a href="https://www.cnblogs.com/bndong/">示例博客</a>
    &nbsp; · &nbsp;
    <a href="#安装">安装</a>
    &nbsp; · &nbsp;
    <a href="https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/">配置文档</a>
    &nbsp; · &nbsp;
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/issues">问题反馈</a>
  </p>
</div>

---

## 功能

- 自定义头像、头图、侧边栏导航、页脚和字体
- 文章目录、阅读进度、日夜模式
- 代码高亮、行号、复制和折叠
- 书单页、友链页、音乐播放器和背景动效
- 适配 PC、平板和手机

功能通过 `window.cnblogsConfig` 配置，具体见[配置文档](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/configs.html)。

## 安装

需要先开通博客园 **JS 权限**，并将博客皮肤设为 **SimpleMemory**。

1. 从 [Releases](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases) 选择版本。
2. 在后台勾选「禁用模板默认 CSS」，将该版本的 `dist/simpleMemory.css` 内容填入「页面定制 CSS 代码」。
3. 在「博客侧边栏公告」中添加 `window.cnblogsConfig` 配置，并引入同版本的 `simpleMemory.js`。

后台控件、代码高亮设置和脚本示例见[安装教程](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/install.html)。

升级时请同步更新 CSS 和 JavaScript，跨大版本升级请参考[版本切换](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/versionSwitch.html)。

## 文档

- [配置项](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/configs.html)
- [书写规范](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/writtenForm.html) · [文章目录](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/articleDirectory.html)
- [书单页](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/bookList.html) · [友链页](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/links.html)
- [Loading](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/loading.html) · [钩子](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/hook.html)
- [更新历史](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/changelog/index.html)

## 本地开发

环境：Node.js ≥ 20.9.0、npm。

```sh
# 安装依赖
npm ci

# 测试
npm test

# 构建，输出到 dist/
npm run build

# 启动资源服务，端口 3100
npm run server
```

调试时，将博客中的插件脚本地址替换为可访问的调试地址。修改源码后重新构建，再刷新博客。具体可参考[调试开发](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/codespaces.html)。

## 反馈与贡献

有问题或建议可以提 [Issue](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/issues)，也欢迎提交 Pull Request。反馈问题时请附上插件版本、浏览器、博客链接和复现步骤。

感谢参与项目的朋友：

<a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BNDong/Cnblogs-Theme-SimpleMemory" alt="SimpleMemory 项目贡献者" />
</a>

特别感谢 [wangyang0210](https://github.com/wangyang0210)。

<details>
  <summary>查看 Star History</summary>

  [![SimpleMemory Star History](https://api.star-history.com/chart?repos=bndong/cnblogs-theme-simplememory&type=date&legend=top-left)](https://www.star-history.com/?repos=bndong%2Fcnblogs-theme-simplememory&type=date&legend=top-left)

</details>

---

<div align="center">
  <p>SimpleMemory © <a href="https://github.com/BNDong">BNDong</a> · <a href="./LICENSE">MIT License</a></p>
  <p><a href="https://www.cnblogs.com/bndong/">博客</a> · <a href="https://github.com/BNDong">GitHub</a> · <a href="mailto:dbnuo@foxmail.com">Email</a></p>
</div>
