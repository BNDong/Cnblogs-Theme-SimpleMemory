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
|**beforeLoading**|(pageLoading loading)|loading 开始前调用此方法|
|**afterLoading**|(Base e, pageLoading loading)|loading 结束后调用此方法|
|**pageLabelChanges**|(Base e, String text)|页面标签变化后调用此方法, 参数 text 为标签变化文字|
|**beforeCodeHighlighting**|(Base e)|渲染代码开始前调用此方法|
|**afterCodeHighlighting**|(Base e)|渲染代码结束后调用此方法|
|**dayNightControl**|(Base e, String type)|点击日夜间模式切换按钮调用此方法，参数 type 为日夜间类型|
|**pageInitEnd**|(Base e)|页面初始化结束后调用此方法|