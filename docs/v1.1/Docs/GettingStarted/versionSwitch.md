# 版本切换

## v1.0.0 与 v1.\*.* 之间切换版本

由于 v1.0.0 与 v1.\*.* 版本的配置方式不同，所以建议依据各版本的配置方式重新配置主题。

各版本文档：
- [v1.\*.*](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v1.1/)
- [v1.0.*](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v1.0/)

## v1.\*.* 之间切换版本

v1.\*.* 之间切换版本比较简便。

这里我举例 v1.1.2 切换至 v1.1.4:

### 切换代码版本

进入主题仓库：[GitHub](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory)

切换版本：

![install_05](../../Images/install_06.png)

### 获取需切换版本的样式文件

‼️ CSS代码位置：```/src/style/base.min.css``` 拷贝此文件代码至页面定制CSS代码文本框处。

### 修改版本配置及引入文件的版本

**原配置：**

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        GhVersions    : 'v1.1.2',
        ...
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.2/src/script/simpleMemory.min.js"></script>
```

**1) 修改版本配置**

修改配置```window.cnblogsConfig.GhVersions```为```'v1.1.4'```

**2) 更改 simpleMemory.min.js 引入的版本**

```html
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.2/src/script/simpleMemory.min.js"></script>
```

变为

```html
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.4/src/script/simpleMemory.min.js"></script>
```

**变更版本后配置：**

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        GhVersions    : 'v1.1.4',
        ...
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.4/src/script/simpleMemory.min.js"></script>
```

至此版本切换完毕！