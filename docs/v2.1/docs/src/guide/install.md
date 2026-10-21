# 安装配置

需要先开通博客园 **JS 权限**。以下说明适用于 v2；v1 的配置不能直接沿用。

## 选择版本

在 [Releases](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/releases) 中选择版本，使用该版本的 CSS 和 JavaScript。下面以 `v2.1.7` 为例，安装其他版本时请同步替换版本号。

## 博客园后台设置

打开[博客园设置](https://i.cnblogs.com/Configure.aspx)。

### 皮肤和控件

- 博客皮肤选择 `SimpleMemory`。
- 在「选项 → 控件显示设置」中开启需要显示的侧边栏栏目，例如随笔分类、我的标签和随笔档案。
- 栏目没有数据时，可能不会显示；具体见[侧边栏数据](./menuData)。

![后台控件显示设置](/images/install/install_03.png)

### 代码高亮

后台的代码高亮设置如下：

- 渲染引擎：`highlight.js`。
- 关闭「显示行号」和「Mac 风格」，由插件配置控制。
- 浅色主题选择 `cnblogs`，关闭跟随系统自动切换深浅主题。
- 不勾选「禁用默认代码高亮」。

插件也可以使用自己的高亮主题，见[代码配置](/reference/config/code)。

![后台代码高亮设置](/images/install/install_02.png)

### 页面定制 CSS

1. 勾选「禁用模板默认 CSS」。
2. 打开 [v2.1.7 的 simpleMemory.css](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2.1.7/dist/simpleMemory.css)，复制完整文件内容。
3. 将内容填入「页面定制 CSS 代码」。安装其他版本时，先切换到对应版本再复制。

![页面定制 CSS 输入位置](/images/install/install_05.png)

### 博客侧边栏公告

将下面的代码填入「博客侧边栏公告」。昵称、入园日期和头像需要改成自己的信息，头像使用可公开访问的 HTTPS 图片地址。

```html
<script>
window.cnblogsConfig = {
  info: {
    name: '你的昵称',
    startDate: '2021-01-01',
    avatar: 'https://example.com/avatar.png',
  },
};
</script>
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v2.1.7/dist/simpleMemory.js" defer></script>
```

配置应放在插件脚本之前。页面只引入一次插件；添加其他配置时，合并到同一个 `window.cnblogsConfig` 对象中。

也可以[托管完整的插件资源](./resourceCdn)，然后替换脚本地址。

## 保存并检查

保存设置，刷新博客，确认头图、侧边栏和文章页正常显示。接着可以按[配置参考](/reference/configs)调整外观和功能。

如果没有变化，先看[常见问题](./faq)。升级已有安装请看[版本切换](./versionSwitch)。
