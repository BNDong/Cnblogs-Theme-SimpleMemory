# 钩子

用于用户在主题处理周期中扩展自己的行为。

## 配置方式

示例配置：

```javascript

    window.cnblogsConfig = {
        // ...  主配置
    };

    // 钩子配置
    window.cnblogsConfig.hooks = {

          beforeCode: (_) => {
            // console.log('code 渲染开始前');
          },
          afterCode: (_) => {
            // console.log('code 渲染结束后');
          },
          beforeLoading: (_) => {
            // console.log('loading 开始前');
          },
          afterLoading: (_) => {
            // console.log('loading 结束后');
          },
          dayNightControl: (_, type) => {
            // console.log(type);
            // console.log('日/夜间模式');
          },
    };

```

## 钩子方法

|**方法**|**参数**|**描述**|
|:-----:|:-----:|:-----:|
|**beforeCode**|(_)|code 渲染开始前调用此方法|
|**afterCode**|(_)|code 渲染结束后调用此方法|
|**beforeLoading**|(_)|loading 开始前调用此方法|
|**afterLoading**|(_)|loading 结束后调用此方法|
|**dayNightControl**|(_, type)|日/夜间模式切换调用此方法|

## 关于参数"_"

里面包含了主题渲染使用的配置、工具方法、页面状态、事件监听等。

### 查看/修改配置

当前主题渲染使用的配置都在 `_.__config` 中，可以查看当前配置，也可以直接修改使用的配置。

### 调用主题公共方法

当前主题公共方法都在 `_.__tools` 中，关于所有的公共方法可查看[此文件](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2.0.0/src/utils/tools.js)

### 查看页面状态信息

当前主题渲染使用的配置都在 `_.__status` 中。

### 查看/触发事件

当前主题公共事件处理都在 `_.__event` 中，目前只有滚动事件和窗口大小事件的监听处理，源码可参考[此文件](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2.0.0/src/components/event/event.js)。

* 触发事件

只能触发已经注册的事件，根据主题加载，会陆续注册进来新的事件处理handle。

示例：

```javascript
_.__event.handle.scroll(); // 触发滚动处理
_.__event.handle.resize(); // 触发窗口大小变化处理
```

* 添加新的事件处理

示例：

```javascript
_.__event.scroll.handle.push(() => {
    console.log('当页面滚动时，我被执行！');
});
```
