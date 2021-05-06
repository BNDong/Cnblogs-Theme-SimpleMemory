# 版本映射

?> 版本 >= v1.1.6

该功能是在```v1.1.6```添加的。```v1.2.6```版本后默认关闭！

配置文件位置：```/version.conf```

主要目的用于解决 CDN 缓存不更新的问题，文件加载的版本会优先根据配置映射的版本加载！

## 使用说明


### 示例博客配置

```html
<script type="text/javascript">
    window.cnblogsConfig = {
        GhVersions    : 'v1.1.6', // 版本
        blogUser      : "userName", // 用户名
        blogAvatar    : "https://xxxx.png", // 用户头像
        blogStartDate : "2016-11-17", // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@v1.1.6/src/script/simpleMemory.min.js"></script>
```

### 示例映射配置

每个映射关系为数组：```["原版本","映射至版本（支持全哈希）"]```

### 映射配置-1

版本配置文件为：

```javascript
[
  [
    "v1.1.6",
    "v1.1.5"
  ]
]
```

此时博客主题相关的文件实际加载的版本为：```v1.1.5```

### 映射配置-2

版本配置文件为：

```javascript
[
  [
    "v1.1.6",
    "dc1ee2d31e6d649dd45dad74ade7540e990f59ca"
  ]
]
```

此时博客主题相关的文件实际加载的版本为：```dc1ee2d31e6d649dd45dad74ade7540e990f59ca```

### 映射配置-3

版本配置文件为：

```javascript
[
  [
    "v1.1.6",
    "v1.1.5"
  ]
  ,
  [
    "v1.1.5",
    "v1.1.4"
  ]
  ,
  [
    "v1.1.4",
    "v1.1.3"
  ]
]
```

配置有继承关系：```v1.1.6 -> v1.1.5 -> v1.1.4 -> v1.1.3```

此时博客主题相关的文件实际加载的版本为：```v1.1.3```