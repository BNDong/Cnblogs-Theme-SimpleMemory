# 钩子

?> 版本 >= v1.3.1

用于用户在主题处理周期中扩展自己的行为。

## 配置方式

示例配置：

```javascript

    window.cnblogsConfig = {
        // ...  主配置
    };

    // 钩子配置
    window.cnblogsConfig.hook = {

        // loading 开始前
        beforeLoading: function (loading) {
            console.log('beforeLoading');
        },

        // loading 结束后
        afterLoading: function (e, loading) {
            console.log('afterLoading');
        },

        // 页面标签变化
        pageLabelChanges: function (e, text) {
            console.log('pageLabelChanges');
        },

        // 渲染代码开始前
        beforeCodeHighlighting: function (e) {
            console.log('beforeCodeHighlighting');
        },

        // 渲染代码结束后
        afterCodeHighlighting: function (e) {
            console.log('afterCodeHighlighting');
        },

        // 日夜间模式设置
        dayNightControl: function (e, type) {
            console.log('dayNightControl');
        },

        // 页面初始化结束
        pageInitEnd: function (e) {
           console.log('pageInitEnd');
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