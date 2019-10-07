jQuery.fn.wait = function (func, times, interval) {
    var _times = times || -1,
        //100次
        _interval = interval || 20,
        //20毫秒每次
        _self = this,
        _selector = this.selector,
        //选择器
        _iIntervalID; //定时器id
    if (this.length) { //如果已经获取到了，就直接执行函数
        func && func.call(this);
    } else {
        _iIntervalID = setInterval(function query() {
            if (!_times) { //是0就退出
                clearInterval(_iIntervalID);
            }
            _times <= 0 || _times--; //如果是正数就 --
            _self = $(_selector); //再次选择
            if (_self.length) { //判断是否取到
                func && func.call(_self);
                clearInterval(_iIntervalID);
            }
        }, _interval);
    }
    return this;
};

$(document).ready(function(){


    $('#cnblogs_post_body pre').find('>code').parent().css({'border':'dashed 1px #aaa','border-left':'solid 2px #6CE26C'});

    var url = window.location.href;      // 获取完整URL地址
    var tmp = url.split("/");   // 按照"/"分割
    var cc = tmp[tmp.length-1];          // 获取最后一部分，即文件名和参数
    cc = cc.split("#")[0];      // 过滤#之后部分
    var fileid = cc.split("?"); // 过滤参数
    var uid = fileid[0].replace('.html', ''); // 获取文章ID


    var bottom_html = '<br><p class="essaySuffix-eof">__EOF__</p>';
    bottom_html += '<div class="essaySuffix-box">';


    // =============== 二维码部分 ===============
    var imgUrl = window.cnblogsConfig.essaySuffix.codeImgUrl ? window.cnblogsConfig.essaySuffix.codeImgUrl : window.cnblogsConfig.blogAvatar;
    bottom_html += '<div class="essaySuffix-box-left"><img src="'+imgUrl+'" alt=""/></div>';

    // =============== 信息部分 ===============
    bottom_html += '<div class="essaySuffix-box-right">';

    // 设置作者和出处
    var author = '',
        source ='',
        articleAuthor = $('#articleAuthor').val(),
        articleSource = $('#articleSource').val();

    if (articleAuthor !== undefined && articleSource !== undefined) {

        author  = articleAuthor;
        source  = articleSource;
    } else {

        var str     = window.cnblogsConfig.blogUser ? window.cnblogsConfig.blogUser : '',
            homeUrl = tmp;

        homeUrl.pop();
        homeUrl.pop();
        homeUrl = homeUrl.join("/");

        author  = str ? str : tmp[3];
        source  = homeUrl;
    }

    bottom_html += '<span class="essaySuffix-right-title">作　　者</span>：<strong><span style="font-size: 12px;">';
    bottom_html += '<a href="'+source+'" target="_blank">'+author+'</a></span></strong> <br>';
    bottom_html += '<span style="font-weight: bold; white-space:nowrap;">出　　处</span>：<a href="'+source+'" target="_blank">'+source+'</a><br>';

    // 设置关于作者
    var aboutHtml = window.cnblogsConfig.essaySuffix.aboutHtml
        ? window.cnblogsConfig.essaySuffix.aboutHtml
        : '热爱生活，爱读书/旅游，乐于专研。评论和私信会在第一时间回复。或者<a href="https://msg.cnblogs.com/msg/send/'+tmp[3]+'" target="_blank">直接私信</a>我。';

    bottom_html += '<span class="essaySuffix-right-title">关于博主</span>：' + aboutHtml + '<br>';

    // 设置版权声明
    var copyrightHtml = window.cnblogsConfig.essaySuffix.copyrightHtml
        ? window.cnblogsConfig.essaySuffix.copyrightHtml
        : '署名 - 非商业性使用 - 禁止演绎，<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" alt="协议普通文本" title="协议普通文本" target="_blank">协议普通文本</a> | <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode" alt="协议法律文本" title="协议法律文本" target="_blank">协议法律文本</a>。';

    bottom_html += '<span class="essaySuffix-right-title">版权声明</span>：' + copyrightHtml + '<br>';

    // 设置声援博主
    var supportHtml = window.cnblogsConfig.essaySuffix.supportHtml
        ? window.cnblogsConfig.essaySuffix.supportHtml
        : '如果您觉得文章对您有帮助，可以点击文章右下角<strong><span style="color: #ff0000; font-size: 12pt;">【<a id="post-up" onclick="votePost('+uid+',\'Digg\')" href="javascript:void(0);">推荐</a>】</span></strong>一下。您的鼓励是博主的最大动力！';

    bottom_html += '<span class="essaySuffix-right-title">声援博主</span>：' + supportHtml + '<br>';

    bottom_html += '</div>';
    bottom_html += '<div style="clear: both;"></div>';
    bottom_html += '</div>';

    $("#cnblogs_post_body").append(bottom_html);
});