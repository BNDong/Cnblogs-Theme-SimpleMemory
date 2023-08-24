# 调试开发

## 使用 jsDelivr 调试开发

fork 仓库后，你依然可以使用 jsDelivr 加载自己仓库的插件，支持针对某个 commits 进行加载。

jsDelivr 的 URL 详细规则参考[官方网站](https://www.jsdelivr.com/)。

## 使用 Codespaces 调试开发

::: info 信息
该方案由网友 [fzxiang](https://github.com/fzxiang) 提供，感谢！
:::

::: tip 提示
GitHub Codespaces 每个月免费时长为 120 core/h，2 核数 CPU 可以使用 60h。
:::

> Codespaces 是一个基于云的开发环境，可以让开发人员从任何地方通过浏览器访问代码、编辑器和开发工具。它提供了一个完整的开发环境，包括代码编辑器、调试器、终端等，可以帮助开发人员更方便地进行代码编写、合作和调试。

- 在 GitHub 上创建一个 Codespaces
  
![img](/images/codespaces/codespaces_01.jpg)

- `control + shift + ~` 打开终端，执行命令语句 `npm run server`

![img](/images/codespaces/codespaces_02.png)

- 切换到端口面板, 右键链接地址，更改端口可见性为 `public`

![img](/images/codespaces/codespaces_03.png)

- 打开链接地址，就能看到 `dist` 为目录的站点

![img](/images/codespaces/codespaces_04.png)
  
- 最后在博客园博客设置中，临时将插件地址替换

```html{6}
<script type="text/javascript">
    window.cnblogsConfig = {
      // ...
    }
</script>
<script src="https://literate-space-meme-g4ggqgpxpw5hwgx-3100.app.github.dev/simpleMemory.js" defer></script>
```

在 Codespaces 编译后，在刷新博客园网站就能看到更改后的内容。