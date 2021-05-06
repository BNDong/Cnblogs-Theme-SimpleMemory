/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 工具处理类
 */

export default function main() {
    return {

        /**
         * 模版替换
         */
        tempReplacement: (temp, par, str) => {
            let re = new RegExp('##' + par + '##',"g");
            return temp.replace(re, str);
        },

        /**
         * 批量模版替换
         */
        batchTempReplacement: (temp, list) => {
            let t = temp;
            $.each(list, function (i) {
                let par = list[i];
                let re = new RegExp('##' + par[0] + '##',"g");
                t = t.replace(re, par[1]);
            });
            return t;
        },

        /**
         * 加载CSS文件
         */
        dynamicLoadingCss: (path) => {
            if (!path || path.length === 0) { throw new Error('argument "path" is required !'); }
            let head = document.getElementsByTagName('head')[0], link = document.createElement('link');
            link.href = path; link.rel = 'stylesheet'; link.type = 'text/css'; head.appendChild(link);
        },

        /**
         * 过滤HTML中JavaScript代码
         */
        htmlFiltrationScript: (str) => {
            let subStr = new RegExp('\<script.*\<\/script\>', 'ig');
            return str.replace(subStr,"");
        },

        /**
         * 清除单个定时器
         */
        clearIntervalTimeId: (timeId) => {
            null != timeId && window.clearInterval(timeId);
        },

        /**
         * 滚动主体滚动条到指定位置
         */
        actScroll: (endScroll, time) => {
            $('html,body').stop().animate({scrollTop: endScroll}, time);
        },

        /**
         * 获取页面滚动百分比
         */
        getScrollPercent: () => {
            let scrollTo      = $(window).scrollTop(),
                docHeight     = $(document).height(),
                windowHeight  = $(window).height(),
                scrollPercent = (scrollTo / (docHeight-windowHeight)) * 100;
            return scrollPercent.toFixed(0);
        },

        /**
         * 随机数
         */
        randomNum: function(minNum, maxNum) {
            switch(arguments.length){
                case 1:
                    return parseInt(Math.random()*minNum+1);
                case 2:
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
                default:
                    return 0;
            }
        },

        /**
         * 初始化主体内容位置
         */
        setDomHomePosition: () => {
            $('#home').css('margin-top', $('.main-header').outerHeight() + 'px');
        },

        /**
         * 获取日期
         * @returns {string}
         */
        getNowFormatDate: () => {
            let date = new Date();
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            return year + seperator1 + month + seperator1 + strDate;
        },

        /**
         * 运行时间
         * @param dateString 年-月-日
         */
        getRunDate: (dateString) => {
            dateString = (dateString).toString().split('-');
            let date = new Date();
            date.setUTCFullYear(dateString[0], dateString[1] - 1, dateString[2]);
            date.setUTCHours(0, 0, 0, 0);
            let birthDay = date;
            let today = new Date();
            let timeold = today.getTime() - birthDay.getTime();
            let sectimeold = timeold / 1000;
            let secondsold = Math.floor(sectimeold);
            let msPerDay = 24 * 60 * 60 * 1000;
            let e_daysold = timeold / msPerDay;
            let daysold = Math.floor(e_daysold);
            let e_hrsold = (daysold - e_daysold) * -24;
            let hrsold = Math.floor(e_hrsold);
            let e_minsold = (hrsold - e_hrsold) * -60;
            let minsold = Math.floor((hrsold - e_hrsold) * -60);
            let seconds = Math.floor((minsold - e_minsold) * -60).toString();
            return {
                daysold: daysold,
                hrsold: hrsold,
                minsold: minsold,
                seconds: seconds
            };
        },

        /**
         * 设置 cookie
         * @param key
         * @param value
         * @param expires 过期时间，单位秒
         */
        setCookie: (key, value, expires) => {
            let exp = new Date();
            exp.setTime(exp.getTime() + expires * 1000);
            document.cookie = key + "=" + escape (value) + "; expires=" + exp.toGMTString() + "; path=/";
        },

        /**
         * 获取 cookie
         * @param key
         * @returns {string|null}
         */
        getCookie: (key) => {
            let arr, reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr) return unescape(arr[2]);
            else return null;
        },

        /**
         * 随机字符串
         */
        randomString: (len) => {
            len = len || 32;
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', maxPos = $chars.length, pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },

        /**
         * 分钟转换为时间格式
         */
        minToTime: (min) => {
            let minTime = parseInt(min);
            let second =  parseInt((min - minTime) * 60);
            second = ('' + second).length === 1 ? '0' + second : second;
            return `${minTime}:${second}`;
        },

    };
}