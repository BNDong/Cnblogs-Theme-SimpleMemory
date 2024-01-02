# 安装配置

::: danger 注意
1. 本文档为 v2 版本的安装配置教程，请核对使用版本。
2. 应用插件需要 JS 权限，没有的请先申请权限。
:::

## 获取插件

::: tip 提示
建议使用最新版本，历史版本随着博客园不断迭代，会出现兼容性问题。
:::

进入插件仓库：[点击进入](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory)

切换需要使用的版本：

![img](/images/install/install_04.png)

## 博客园后台配置

### 进入管理后台

首先进入管理后台：[点击访问](https://i.cnblogs.com/Configure.aspx)

### 选项页

进入管理后台/选项页。

#### 控件确认

确认博客需要开启/关闭哪些控件：

![img](/images/install/install_03.png)

### 设置页

进入管理后台/设置页。

#### 设置博客皮肤

博客皮肤：```SimpleMemory```

#### 代码高亮配置

请同步图片上的代码高亮设置：

![img](/images/install/install_02.png)

#### 页面定制 CSS 代码

* 勾选`禁用模板默认CSS`

* 拷贝插件的 CSS 代码
  * CSS 代码在插件仓库目录位置：`/dist/simpleMemory.css`
  * 拷贝此文件代码至页面定制 CSS 代码文本框处。

![img](/images/install/install_05.png)

#### 博客侧边栏公告

在侧边栏HTML代码中设置以下代码：

```html
<script type="text/javascript">
    window.cnblogsConfig = {
      info: {
        name: 'userName', // 您的用户名
        startDate: '2021-01-01', // 您的入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
        avatar: 'http://xxxx.png', // 您的头像 URL 地址
      },
    }
</script>
<!-- 插件文件引入 -->
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@{VERSION}/dist/simpleMemory.js" defer></script>

<!-- 也可以使用下面的地址进行加载，CDN 使用哪家，大家自己权衡 -->
<!--<script src="https://jsd.cdn.zzko.cn/gh/BNDong/Cnblogs-Theme-SimpleMemory@{VERSION}/dist/simpleMemory.js" defer></script>-->
```

**关于插件文件的说明**

- `jsdelivr`: jsDelivr 是一个免费的开源 CDN（内容分发网络）加速服务。插件文件引入的地址目的是引入插件库上的 JS 文件，如果有其它合适的 CDN 亦可根据规则进行替换。
   - jsDelivr 的 URL 详细规则参考[官方网站](https://www.jsdelivr.com/)。
- `VERSION`: 插件文件引入地址中的 `{VERSION}`，代表了插件版本的占位，可以根据使用版本进行修改。示例：`v2.1.3`

## 配置完成

配置完成，保存即可成功应用插件！