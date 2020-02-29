function myTools() {
    const tools  = this,
          colors = {
              "gray": "color: #1B2B34;font-size: 12px; line-height: 18px;",
              "red": "color: #EC5f67;font-size: 12px; line-height: 18px;",
              "orange": "color: #F99157;font-size: 12px; line-height: 18px;",
              "yellow": "color: #FAC863;font-size: 12px; line-height: 18px;",
              "green": "color: #99C794;font-size: 12px; line-height: 18px;",
              "teal": "color: #5FB3B3;font-size: 12px; line-height: 18px;",
              "blue": "color: #6699CC;font-size: 12px; line-height: 18px;",
              "purple": "color: #C594C5;font-size: 12px; line-height: 18px;",
              "brown": "color: #AB7967;font-size: 12px; line-height: 18px;"
          };

    /**
     * 加载CSS文件
     */
    this.dynamicLoadingCss = function (path) {
        if (!path || path.length === 0) { throw new Error('argument "path" is required !'); }
        var head = document.getElementsByTagName('head')[0], link = document.createElement('link');
        link.href = path; link.rel = 'stylesheet'; link.type = 'text/css'; head.appendChild(link);
    };

    /**
     * 控制台输出图片
     */
    this.consoleImg = function(url) {
        console.log('%c', 'padding:50px 300px; line-height:120px; background:url('+url+') no-repeat;');
    };

    /**
     * 控制台输出内容
     */
    this.consoleText = function(list, mode) {
        var rHref = 'https://github.com/'
            + window.cnblogsConfig.GhUserName + '/'
            + window.cnblogsConfig.GhRepositories + '/tree/'
            + window.cnblogsConfig.GhVersions,

            e = ["\n %c %c %c Theme GitHub - " + (window.cnblogsConfig.GhVersions).substring(0,7)+" %c  %c "+rHref+"  %c \n\n", "background: #fadfa3; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "background: #FCEDC9; padding:5px 0;", "background: #fadfa3; padding:5px 0;"];
        window.console.log.apply(console, e);
        switch (mode) {
            case 'random':
                var colorList = [colors.red, colors.orange, colors.yellow, colors.green, colors.teal, colors.blue, colors.purple, colors.brown];
                $.each(list, function (i) {
                    var str = (list[i]).toString();
                    var ind = tools.randomNum(0, colorList.length - 1);
                    console.log('%c'+str, colorList[ind]);
                });
                break;
            case 'banner':
                $.each(list, function (i) {
                    var fl = list[i];
                    console.log('\n' + ' %c '+(fl[0])+' %c '+(fl[1])+' ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
                });
                break;

            default:
                console.log('%c'+list.join('\n'), colors.gray);
                break;
        }
    };

    /**
     * 滚动主体滚动条到指定位置
     */
    this.actScroll = function(endScroll, time) {
        $('html,body').stop().animate({scrollTop: endScroll}, time);
    };

    /**
     * 随机数
     */
    this.randomNum = function(minNum,maxNum) {
        switch(arguments.length){
            case 1:
                return parseInt(Math.random()*minNum+1); break;
            case 2:
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum); break;
            default:
                return 0; break;
        }
    };

    /**
     * 随机字符串
     */
    this.randomString = function(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', maxPos = $chars.length, pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };

    /**
     * 获取页面滚动百分比
     */
    this.getScrollPercent = function() {
        var scrollTo      = $(window).scrollTop(),
            docHeight     = $(document).height(),
            windowHeight  = $(window).height(),
            scrollPercent = (scrollTo / (docHeight-windowHeight)) * 100;
        return scrollPercent.toFixed(0);
    };

    /**
     * 过滤HTML中JavaScript代码
     */
    this.htmlFiltrationScript = function(str) {
        var subStr = new RegExp('\<script.*\<\/script\>', 'ig');
        return str.replace(subStr,"");
    };

    /**
     * 运行时间
     * @param dateString 年-月-日
     */
    this.getRunDate = function (dateString) {
        dateString = (dateString).toString().split('-');
        var date = new Date();
        date.setUTCFullYear(dateString[0], dateString[1] - 1, dateString[2]);
        date.setUTCHours(0, 0, 0, 0);
        var birthDay = date;
        var today = new Date();
        var timeold = today.getTime() - birthDay.getTime();
        var sectimeold = timeold / 1000;
        var secondsold = Math.floor(sectimeold);
        var msPerDay = 24 * 60 * 60 * 1000;
        var e_daysold = timeold / msPerDay;
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (daysold - e_daysold) * -24;
        var hrsold = Math.floor(e_hrsold);
        var e_minsold = (hrsold - e_hrsold) * -60;
        var minsold = Math.floor((hrsold - e_hrsold) * -60);
        var seconds = Math.floor((minsold - e_minsold) * -60).toString();
        return {
            daysold: daysold,
            hrsold: hrsold,
            minsold: minsold,
            seconds: seconds
        };
    };

    /**
     * 获取日期
     * @returns {string}
     */
    this.getNowFormatDate = function() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
    };

    /**
     * html 转义
     * @return {string}
     */
    this.HTMLEncode = function(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    };

    /**
     * 产生随机颜色
     * @returns {string}
     */
    this.getRandomColor = function(){
        return  '#' + (function(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length == 6) ?  color : arguments.callee(color);
        })('');
    }
}