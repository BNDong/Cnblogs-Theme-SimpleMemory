# 钩子

通过 `window.cnblogsConfig.hooks` 在插件处理过程中执行自己的代码。配置需要放在插件脚本之前。

## 示例

```javascript
window.cnblogsConfig = {
  hooks: {
    beforeCode: (_) => {
      console.log('准备处理代码块');
    },
    afterCode: (_) => {
      console.log('代码组件已发起渲染');
    },
    beforeLoading: (_) => {
      console.log('开始加载');
    },
    afterLoading: (_) => {
      console.log('Loading 遮罩已关闭');
    },
    dayNightControl: (_, type) => {
      console.log('切换到', type); // day 或 night
    },
  },
};
```

## 调用时机

| 钩子 | 参数 | 时机 |
| --- | --- | --- |
| `beforeCode` | `_` | 代码组件开始处理之前 |
| `afterCode` | `_` | 代码组件发起渲染之后；使用 hljs 时不会等待高亮及行号的异步处理完成 |
| `beforeLoading` | `_` | 创建 Loading 遮罩之前，此时滚动和窗口事件尚未初始化 |
| `afterLoading` | `_` | 关闭 Loading 遮罩之后，不代表所有异步资源都已加载完成 |
| `dayNightControl` | `_, type` | 点击日夜切换按钮时；`type` 为 `day` 或 `night`，初始化模式不会触发 |

这些钩子目前不会等待回调返回的 Promise。不要将 `afterCode` 或 `afterLoading` 当作所有资源就绪的通知。

## 上下文参数

`_` 包含插件当前使用的配置和内部状态：

- `_.__config`：合并默认值后的配置。修改它不会自动重新渲染已经生成的页面。
- `_.__status`：当前页面状态。
- `_.__tools`：公共工具，见[源码](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2/src/utils/tools.js)。
- `_.__event`：滚动和窗口大小事件的状态与回调列表。

这些内部字段可能随实现变化，使用时应核对所用版本。

## 监听滚动或窗口大小变化

在 `afterLoading` 中，事件列表已经初始化。例如：

```javascript
window.cnblogsConfig = {
  hooks: {
    afterLoading: (_) => {
      _.__event.scroll.handle.push(() => {
        console.log('页面发生滚动');
      });
      _.__event.resize.handle.push(() => {
        console.log('窗口大小变化');
      });
    },
  },
};
```

`_.__event` 上没有 `handle.scroll()` 或 `handle.resize()` 方法。需要通知窗口监听器时可以使用浏览器事件：

```javascript
window.dispatchEvent(new Event('resize'));
```

此事件也会通知页面中其他监听器。完整实现见[事件组件](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/blob/v2/src/components/event/event.js)。
