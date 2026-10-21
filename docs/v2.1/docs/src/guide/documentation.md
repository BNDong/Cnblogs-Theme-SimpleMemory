# 文档维护

当前文档源码在 `docs/v2.1/docs/src/`，导航和站点设置在 `docs/v2.1/docs/.vitepress/`。

在仓库根目录执行：

```sh
cd docs/v2.1
npm ci
npm run docs:dev
```

开发服务使用站点根路径，按终端输出的地址访问，例如 `http://localhost:5173/`。构建和预览使用线上子路径 `/Cnblogs-Theme-SimpleMemory/v2.1/dist/`。

## 检查与构建

```sh
npm run docs:check
npm run docs:build
npm run docs:preview
```

- `docs:check` 检查配置和脚本示例的语法、内部链接与锚点、本地图片，以及配置参考的覆盖情况。
- `docs:build` 构建站点，同时检查失效的内部页面链接。
- `docs:preview` 预览刚构建的站点，终端会输出访问地址。

构建直接输出到 `docs/v2.1/dist/`，与当前文档访问路径对应，不需要再手动复制另一份构建目录。

## 提交文档

1. 修改源码；增加页面时同步更新导航。
2. 执行检查和构建，预览页面。
3. 将源码、必要的依赖锁文件和 `docs/v2.1/dist/` 构建结果一同提交。

不要直接编辑 `dist/` 中的 HTML、JavaScript 或 CSS，它们会在下次构建时被覆盖。CI 会检查并构建文档，但不会自动提交构建结果或修改 Pages 的发布设置。

图片放在 `docs/v2.1/docs/src/public/images/` 下，使用 Markdown 图片语法引用，例如 `![说明](/images/install/install_03.png)`。VitePress 在构建时会补上发布路径，不要在 Markdown 中手动写死线上前缀。

配置默认值以 `src/components/config/config.json5` 和实际使用代码为准；新增配置时应同时补充文档。
