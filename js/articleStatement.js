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
}

function focusFunction(){
    var _targetTop = $('#comment_form_container').offset().top;//获取位置
    jQuery("html,body").animate({scrollTop:_targetTop},300);//跳转
}

function focusFollow(){
    var _targetTop = $('#profile_block').offset().top;//获取位置
    jQuery("html,body").animate({scrollTop:_targetTop},300);//跳转
}

$(document).ready(function(){
    $("<div id='toTop'style='zoom:0;'></div>").appendTo($("body")).bind("click", function(){
        $("body,html").animate({ scrollTop: 0 }, 150);
    });

    $('#cnblogs_post_body pre').find('>code').parent().css({'border':'dashed 1px #aaa','border-left':'solid 2px #6CE26C'});
    var url = window.location.href; // 获取完整URL地址
    var tmp = new Array();          // 临时变量，用于保存分割字符串
    tmp = url.split("/");           // 按照"/"分割
    var cc = tmp[tmp.length-1];     // 获取最后一部分，即文件名和参数
    cc = cc.split("#")[0];
    var fileid = cc.split("?");     // 把参数和文件名分割开
    var uid = fileid[0].replace('.html', '');
    var bottom_html = '<br><p style="font-weight:  bold;font-size: 16px;text-align:  center;color: #ddd;text-indent: 0;">__EOF__</p>';
    bottom_html += '<p style="font-family: Microsoft YaHei,微软雅黑,MicrosoftJhengHei,华文细黑,STHeiti,MingLiu;font-size: 14px;background: hsl(220, 23%, 98%)!important;padding: 17px;border: 1px solid hsl(220, 16%, 94%)!important;border-radius: 3px;color: #414857;text-indent: 0;">';
    bottom_html += '<span style="font-weight: bold; white-space:nowrap;">作　　者</span>：<strong><span style="font-size: 12px; color: red;">';
    var articleAuthor = $('#articleAuthor').val();
    var articleSource = $('#articleSource').val();

    // 设置作者和出处
    if (articleAuthor != undefined && articleSource != undefined) {
        bottom_html += '<a href="'+articleSource+'" target="_blank">'+articleAuthor+'</a></span></strong> <br>';
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">出　　处</span>：<a href="'+articleSource+'" target="_blank">'+articleSource+'</a>';
    } else if ( window.location.href.search("www.cnblogs.com/bndong") != -1 ) {
        bottom_html += '<a href="http://www.cnblogs.com/bndong/" target="_blank">BNDong</a></span></strong> <br>';
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">出　　处</span>：<a href="http://www.cnblogs.com/bndong/" target="_blank">http://www.cnblogs.com/bndong/</a>';
    } else {
        var str = window.cnblogsConfig.blogUser;
        var homeUrl = tmp;
        homeUrl.pop();
        homeUrl.pop();
        homeUrl = homeUrl.join("/");
        bottom_html += '<a href="'+homeUrl+'" target="_blank">'+ (str != '' ? str : tmp[3]) +'</a></span></strong><br>';
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">出　　处</span>：<a href="'+url+'" target="_blank">'+url+'</a>';
    }

    bottom_html += '<br>';
    if (window.cnblogsConfig.essaySuffix.aboutHtml != "") {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">关于博主</span>：'+window.cnblogsConfig.essaySuffix.aboutHtml;
    } else {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">关于博主</span>：编程路上的小学生，热爱技术，喜欢专研。评论和私信会在第一时间回复。或者<a href="http://msg.cnblogs.com/msg/send/'+tmp[3]+'" target="_blank">直接私信</a>我。';
    }
    bottom_html += '<br>';
    if (window.cnblogsConfig.essaySuffix.copyrightHtml != "") {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">版权声明</span>：'+window.cnblogsConfig.essaySuffix.copyrightHtml;
    } else {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">版权声明</span>：署名 - 非商业性使用 - 禁止演绎，<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" alt="协议普通文本" title="协议普通文本" target="_blank">协议普通文本</a> | <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode" alt="协议法律文本" title="协议法律文本" target="_blank">协议法律文本</a>。';
    }
    bottom_html += '<br>';
    if (window.cnblogsConfig.essaySuffix.supportHtml != "") {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">声援博主</span>：'+window.cnblogsConfig.essaySuffix.supportHtml;
    } else {
        bottom_html += '<span style="font-weight: bold; white-space:nowrap;">声援博主</span>：如果您觉得文章对您有帮助，可以点击文章右下角<strong><span style="color: #ff0000; font-size: 12pt;">【<a id="post-up" onclick="votePost('+uid+',\'Digg\')" href="javascript:void(0);">推荐</a>】</span></strong>一下。您的鼓励是博主的最大动力！';
    }
    bottom_html += '<br>';
    bottom_html += '</p>';
    $("#cnblogs_post_body").append(bottom_html);
});

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}