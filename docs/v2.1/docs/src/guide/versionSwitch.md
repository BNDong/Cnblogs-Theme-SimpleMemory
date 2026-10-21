# 版本切换

升级前先备份博客园后台的 CSS 和侧边栏公告。**CSS 与 JavaScript 必须使用同一版本。**

## v2 内升级

### 使用 jsDelivr

1. 从 [Releases](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases) 选择目标版本，阅读对应变更。
2. 用目标版本的 `dist/simpleMemory.css` 完整替换后台的页面定制 CSS。
3. 修改插件脚本地址中的版本号。保留自己的 `window.cnblogsConfig` 配置。

例如，从 `v2.1.6` 升级到 `v2.1.7`：

```html
<!-- 升级前 -->
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v2.1.6/dist/simpleMemory.js" defer></script>
```

```html
<!-- 升级后，同时替换 CSS -->
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v2.1.7/dist/simpleMemory.js" defer></script>
```

### 使用自己的资源服务

上传目标版本的整个 `dist/` 目录，包含脚本、样式、图片和字体。不要只替换入口 JS，也不要混用不同构建生成的资源。

建议将各版本放入独立目录，再切换入口地址，例如：

```html
<script src="https://example.com/simplememory/v2.1.7/simpleMemory.js" defer></script>
```

同一路径覆盖文件时，可以通过查询参数更新入口缓存：

```html
<script src="https://example.com/dist/simpleMemory.js?v=2.1.7" defer></script>
```

查询参数只影响入口文件，不能代替上传其余资源。新版本确认正常前保留旧资源，避免已打开的页面继续请求旧文件时出现 404。资源目录要求见[资源托管](./resourceCdn)。

## v1 与 v2 之间切换

两个大版本的配置不兼容，需要按目标版本的文档重新配置。不要只修改脚本地址。

## 升级后异常

先核对 CSS、JS 的版本和资源是否完整，再检查控制台与 Network 面板。需要回退时，同时恢复备份的 CSS、脚本地址和配置。
