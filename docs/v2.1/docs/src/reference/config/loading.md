# Loading 配置

## loading - Loading {#loading-loading}

* 类型：`Object`
* 默认值：

```json5
{
    rebound: {
        tension: 16,
        friction: 5,
    },
    spinner: {
        id: 'spinner',
        radius: 90,
        sides: 3,
        depth: 4,
        colors: {
            background: '#f0f0f0',
            stroke: '#272633',
            base: null,
            child: '#272633',
        },
        alwaysForward: true, // When false the spring will reverse normally.
        restAt: 0.5,         // A number from 0.1 to 0.9 || null for full rotation
        renderBase: false,
    }
}
```

页面加载 Loading。

```javascript
window.cnblogsConfig = {
    loading: {
         rebound: {
             tension: 16,
         },
         spinner: {
             id: 'spinner',
             radius: 90,
         }
    },
}
```
