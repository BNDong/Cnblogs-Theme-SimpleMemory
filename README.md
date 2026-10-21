<div align="center">
  <img src="./src/images/simple2.png" width="420" alt="SimpleMemory Logo" />

  <h1>SimpleMemory</h1>

  <p><strong>为你的博客，留一点个性。</strong></p>
  <p>基于博客园 SimpleMemory 皮肤的扩展美化插件<br />自定义博客外观，增强文章阅读体验，适配桌面与移动设备。</p>

  <p>
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases"><img src="https://img.shields.io/github/v/release/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=f279a8" alt="最新发布版本" /></a>
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/stargazers"><img src="https://img.shields.io/github/stars/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=71d9cf" alt="GitHub Stars" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/github/license/BNDong/Cnblogs-Theme-SimpleMemory?style=flat&color=8b95a5" alt="MIT 许可证" /></a>
  </p>

  <p>
    <a href="https://www.cnblogs.com/bndong/"><strong>在线演示 ↗</strong></a>
    &nbsp; · &nbsp;
    <a href="#快速开始"><strong>快速开始</strong></a>
    &nbsp; · &nbsp;
    <a href="https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/">配置文档</a>
    &nbsp; · &nbsp;
    <a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/issues">问题反馈</a>
  </p>
</div>

---

## 让外观与阅读体验，一起升级

从首页头图到文章目录，从代码展示到日夜模式，通过 `window.cnblogsConfig` 配置自己的博客。

| 能力 | 你可以做什么 |
| :--- | :--- |
| **外观定制** | 设置头像、首页与文章头图，自定义侧边栏导航、页脚和字体 |
| **阅读体验** | 自动生成文章目录，展示阅读进度，支持日间与夜间模式切换 |
| **代码增强** | 配置代码高亮、行号、复制和折叠，让技术文章更易阅读 |
| **多端适配** | 在 PC、平板与手机上阅读博客 |
| **扩展页面** | 配置书单页、友链页，让博客承载更多内容 |
| **个性细节** | 按需配置头图轮播、背景动效和音乐播放器，通过钩子扩展行为 |

**先看看实际效果：** [访问示例博客 →](https://www.cnblogs.com/bndong/)

## 快速开始

使用前，请确认你的博客已开通 **JS 权限**，并在博客园后台选择 **SimpleMemory** 皮肤。安装到博客园无需在本地运行开发命令。

### 1. 选择版本

前往 [Releases](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases) 选择需要使用的版本，获取该版本的 `dist/simpleMemory.css` 和脚本地址。

### 2. 配置样式

打开博客园后台的「设置」，勾选「禁用模板默认 CSS」，将所选版本的 `dist/simpleMemory.css` 内容粘贴到「页面定制 CSS 代码」中。

### 3. 配置并加载插件

在「博客侧边栏公告」中填写 `window.cnblogsConfig`，再引入对应版本的 `simpleMemory.js`。保存前，按安装教程核对后台控件与代码高亮设置。

**[打开完整安装教程 →](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/install.html)** · [查看配置项](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/configs.html)

> 升级版本时，请同步更新 CSS 和 JavaScript。跨大版本升级前，请先阅读[版本切换说明](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/versionSwitch.html)。

## 按需配置

从常用功能开始，逐步调整成自己喜欢的样子。

| 我想…… | 对应文档 |
| :--- | :--- |
| 修改头像、头图、导航或日夜模式 | [配置项参考](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/configs.html) |
| 调整文章排版和目录 | [书写规范](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/writtenForm.html) · [标题与目录](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/articleDirectory.html) |
| 添加书单或友情链接 | [书单页](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/bookList.html) · [友链页](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/links.html) |
| 自定义加载效果或扩展功能 | [Loading](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/loading.html) · [钩子](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/reference/hook.html) |
| 了解版本变化 | [更新历史](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/changelog/index.html) · [版本切换](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/versionSwitch.html) |

## 本地开发

需要 **Node.js ≥ 20.9.0** 和 npm。在仓库根目录执行：

```sh
# 安装依赖
npm ci

# 运行兼容性测试
npm test

# 构建 JavaScript 与 CSS，输出到 dist/
npm run build

# 启动本地资源服务，默认端口 3100
npm run server
```

`npm run server` 提供 `dist/` 中的静态资源。调试时，需要将博客园中的插件脚本地址临时替换为可访问的调试地址；修改后重新构建并刷新博客。

更多方式见[调试开发指南](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2.1/dist/guide/codespaces.html)。

## 参与贡献

欢迎通过 [Issues](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/issues) 反馈问题、提出建议，或提交 Pull Request。

反馈问题时，请附上插件版本、浏览器信息、相关配置和复现步骤；如果方便，也请提供博客链接或截图。

感谢每一位参与改进 SimpleMemory 的贡献者：

<a href="https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BNDong/Cnblogs-Theme-SimpleMemory" alt="SimpleMemory 项目贡献者" />
</a>

特别感谢 [wangyang0210](https://github.com/wangyang0210) 对项目的支持与贡献。

<details>
  <summary>查看 Star History</summary>

  [![SimpleMemory Star History](https://api.star-history.com/chart?repos=bndong/cnblogs-theme-simplememory&type=date&legend=top-left)](https://www.star-history.com/?repos=bndong%2Fcnblogs-theme-simplememory&type=date&legend=top-left)

</details>

---

<div align="center">
  <p>SimpleMemory © <a href="https://github.com/BNDong">BNDong</a> · <a href="./LICENSE">MIT License</a></p>
  <p><a href="https://www.cnblogs.com/bndong/">博客</a> · <a href="https://github.com/BNDong">GitHub</a> · <a href="mailto:dbnuo@foxmail.com">Email</a></p>
</div>
