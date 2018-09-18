/*!
 * DATE: 2018-03-13
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 **/
function Base() {
    var bndongJs     = this

        /** 全局变量 **/
        ,tools       = new myTools
        ,progressBar = new ToProgress({ // 进度条插件配置
            id: 'top-progress-bar',
            color: '#77b6ff',
            height: '2px',
            duration: 0.2
        }, '#bottomProgressBar')
        ,temScroll       = 0           // 上一次页面滚动位置

        /** 定时器 **/
        ,setMenuDataTId  = ''          // 菜单设置数据定时器ID
        ,setRightMenuTId = ''          // 右下角菜单设置定时器ID
        ,setCnzzTId      = ''          // 网站统计Cnzz设置定时器ID
        ,setAmazingTId   = ''          // 网站统计Amazing设置定时器ID
        ,setCatalogTId   = ''          // 文章目录设置定时器ID

    ;

    /**
     * 初始化
     */
    this.init = function () {
        // Loading前初始化
        bndongJs.loadingBeforeInit();
        // 页面初始化
        if ($('#topics').length > 0) { bndongJs.notHomeInit(); } else { bndongJs.homeInit(); }
        // Loading结束
        bndongJs.endLoading();
        // Loading后初始化
        bndongJs.loadingAfterInit();
        // 延时清除全部定时器
        setTimeout(bndongJs.clearIntervalAll, 30000);
    };

    /**
     * Loading前初始化
     */
    this.loadingBeforeInit = function () {
        // 背景动画
		require(['RibbonsEffect']);
    };

    /**
     * Loading后初始化
     */
    this.loadingAfterInit = function () {
        // 初始化菜单滚动条样式
        $('#menuWrap').optiscroll({ forceScrollbars: true, maxTrackSize: 20, preventParentScroll: true });

        // 音乐播放器初始化
        bndongJs.musicInit();

        // 滚动监听
        $(window).scroll( function() { bndongJs.scrollMonitor(); });

        // 窗口变化监听
        $(window).resize( function() { bndongJs.resizeMonitor(); });

        // 更换网站图标
        var linkObject = document.createElement('link');
        linkObject.rel = "shortcut icon";
        linkObject.href = "https://files.cnblogs.com/files/bndong/blog_logo.gif";
        document.getElementsByTagName("head")[0].appendChild(linkObject);

        // 添加网站PV量监控
        bndongJs.addWebPv();

        // 设置菜单侧边栏内容
        setMenuDataTId = window.setInterval( bndongJs.setMenuData, 1000 );

        // html5-title
        bndongJs.htmlTitle();

        // 控制台输出
        tools.consoleText([], 'banner');

        // (function () {
        //     var re = /x/;
        //     var i = 0;
        //     console.log(re);
        //
        //     re.toString = function () {
        //         return '第 ' + (++i) + ' 次打开控制台';
        //     };
        // })();
    };

    /**
     * 清除全部定时器
     */
    this.clearIntervalAll = function () {
        window.clearInterval(setMenuDataTId);
        window.clearInterval(setRightMenuTId);
        window.clearInterval(setCnzzTId);
        window.clearInterval(setAmazingTId);
        window.clearInterval(setCatalogTId);
    };

    /**
     * HTML-TITLE
     */
    this.htmlTitle = function() {
        var RelTitle = document.title;
        var hidden,
            visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") { // Firefox up to v17
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") { // Chrome up to v32, Android up to v4.4, Blackberry up to v10
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        function handleVisibilityChange() {
            if (document[hidden]) {
                $('#myTopCanvas').hide();
                var str = $('.main-header-content h1').eq(0).text();
                document.title = ' (◍´꒳`◍) Hi, ' + (str != '' ? str : 'BNDong') + ' - ' + RelTitle.split(' - ')[0];
            } else {
                $('#myTopCanvas').fadeIn(3000);
                document.title = RelTitle;
            }
        }
        if (typeof document.addEventListener !== "undefined" || typeof document[hidden] !== "undefined") {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
    };

    /**
     * 主页初始化
     */
    this.homeInit = function() {

        // 头部大图点击滚动到内容位置
        $('.scroll-down').click(function () { var endScroll = $('#home').offset().top + 10; tools.actScroll(endScroll, 1000);});

        // 设置右下角菜单
        setRightMenuTId = window.setInterval( bndongJs.addHomeRightMenu, 1000 );

        bndongJs.setHitokoto();
        bndongJs.scrollMonitor();
        bndongJs.topBgAnimation();
    };

    /**
     * 非主页初始化
     */
    this.notHomeInit = function() {

        require(['baguetteBox', 'marvin', 'articleStatement'], function(baguetteBox) {

            // 设置图片点击查看
            var cpb     = $('#cnblogs_post_body');
            var imgList = $('#cnblogs_post_body img');

            if (cpb.length > 0 && imgList.length > 0) {
                $.each(imgList, function (i) {
                    var tem = $(imgList[i]);
                    var flg = tem.attr('id');
                    if (typeof flg == 'undefined' && tem.outerWidth() > 50) {
                        tem.wrap("<a class='lightbox' href='"+tem.attr('src')+"'></a>");
                    }
                });
                baguetteBox.run('.lightbox');
            }

            // 初始化文章目录位置
            setCatalogTId = window.setInterval( bndongJs.initCatalog, 1000 );

            bndongJs.scrollMonitor();
        });

        // 设置右下角菜单
        setRightMenuTId = window.setInterval( bndongJs.addNotHomeRightMenu, 1000 );

        bndongJs.setNotHomeTopImg();
        bndongJs.setCommentStyle();
    };

    /**
     * 初始化文章目录插件位置
     */
    this.initCatalog = function() {
        var sideToolbar = $('#sideToolbar');
        if (sideToolbar.length > 0) {
            var sideToolbarTop   = $('.main-header').outerHeight();
            sideToolbar.css('top', (sideToolbarTop + 20) + 'px');
            bndongJs.resizeMonitor();
            sideToolbar.fadeIn(300);
            window.clearInterval(setCatalogTId);
        }
    };

    /**
     * 设置主页标语
     */
    this.setHitokoto = function() {

        var topTitleList = [
            '每一个不曾起舞的日子，都是对生命的辜负。',
            '公主死去了，屠龙的少年还在燃烧',
            '我们听过无数的道理，却仍旧过不好这一生。',
            '生如夏花之绚烂，死如秋叶之静美。',
            '但凡不能杀死你的，最终都会使你更强大。',
            '好看的皮囊千篇一律，有趣的灵魂万里挑一。',
            '青春是一本太仓促的书，我们含着泪，一读再读。',
            '教育就是当一个人把在学校所学全部忘光之后剩下的东西。',
            '孤独不是一种脾性，而是一种无奈。',
            '有时候你以为天要塌下来了，其实是自己站歪了。',
            '温柔正确的人总是难以生存，因为这世界既不温柔，也不正确。',
            '死并非生的对立面，而作为生的一部分永存。',
            '不要努力成为一个成功者，要努力成为一个有价值的人。',
            '不要因为走得太远，忘了我们为什么出发。',
            '你的问题主要在于读书不多而想得太多。',
            '岁月不饶人，我亦未曾饶过岁月。',
            '当你凝视深渊时，深渊也在凝视着你。',
            '有的人25岁就死了，只是到75岁才埋葬'
        ];

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.hibai.cn/api/index/index",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                "TransCode": "030111",
                "OpenId": "123456789",
                "Body": ""
            }
        };

        $.ajax(settings).done(function (response) {
            if (response.ResultCode == 1) {
                $('#hitokoto').text(response.Body.word).show();
                $('#hitokotoAuthor').text('- '+response.Body.word_from).show();
            } else {
                var listIndex = tools.randomNum(0, topTitleList.length - 1);
                $('#hitokoto').text(topTitleList[listIndex]).show();
            }
            return false;
        });
    };

    /**
     * 设置主页动画
     */
    this.topBgAnimation = function() {
        require(['circleMagic'], function() {
            $('.main-header').circleMagic({
                radius: 15,
                density: 0.2,
                color: 'rgba(255,255,255, .2)',
//                    color: 'random',
                clearOffset: 0.3
            });
        });
    };

    /**
     * 设置非主页头图
     */
    this.setNotHomeTopImg = function() {
        $('.main-header').css('height', '40vh');
        $('.main-header').css('background', '#222 url(https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-569548.png)  center center no-repeat');
        $('.main-header').css('background-size', 'cover');
        $('.vertical').css('display', 'none');
        $('.scroll-down').css('display', 'none');
        $('#home').css('margin-top', '40vh');
        $('#cb_post_title_url').addClass('post-del-title');

        require(['TweenMax', 'MyTween'], function() {
            initCanvas('myTopCanvas');
            start();
        });
    };

    /**
     * 设置评论框样式
     */
    this.setCommentStyle = function() {

        var commentAvatar = function(commentList) {
            commentList.each(function (i) {
                var p = $(commentList[i]).attr('id').split('_');
                if (p.length > 0) {
                    var idIndex = p.length - 1;
                    var id = p[idIndex];
                    var op = $('#comment_'+id+'_avatar');
                    if (op.length > 0 && op.text() != '') {
                        var patch = op.text();
                        var html = '<img class="comment-avatar" src="'+patch+'"/>';
                    } else {
                        var html = '<img class="comment-avatar" src="https://files.cnblogs.com/files/bndong/no_avatar.gif"/>';
                    }
                    $(commentList[i]).before(html);
                }
            });
        };

        var commentList = $('.blog_comment_body');
        commentAvatar(commentList);
        commentList.addClass('hvr-bob');

        //气泡效果
        var commentTime = setInterval(function(){if($("#comments_pager_bottom").length>0){CommentBubble();clearTimeout(commentTime);}},50);
        function CommentBubble()
        {
            var w1 = '<div class="list">' +
                '<table class="out" border="0" cellspacing="0" cellpadding="0"> ' +
                '<tr>' +
                '<td align="left" valign="bottom" class="q">' +
                '<table border="0" cellpadding="0" cellspacing="0" style=""> ' +
                '<tr><td class="topleft"></td><td class="top"></td><td class="topright"></td></tr> ' +
                '<tr><td class="left"></td> <td align="left" class="conmts"><p>';


            var w2 = '</p> </td> <td class="right"></td></tr> ' +
                '<tr><td class="bottomleft"></td><td class="bottom"></td><td class="bottomright"></td></tr> ' +
                '</table>' +
                '</td> ' +
                '</tr> ' +
                '</table> ' +
                '</div>';

            $.each($(".blog_comment_body"), function(i, t) {
                $(t).html(w1 + $(t).html() + w2);
            });
            $(".louzhu").closest(".feedbackItem").find(".out").removeClass("out").addClass("inc");
        }
    };

    /**
     * 播放器初始化
     */
    this.musicInit = function() {};

    /**
     * 结束Loading页面
     */
    this.endLoading = function() {
        $('body').css('overflow', 'auto');
        demo.spinner.setComplete();
        $('#loading').fadeOut(300);
    };

    /**
     * 滚动处理
     */
    this.scrollMonitor = function() {

        var homeScroll     = $('#home').offset().top - 40,
            docScroll      = $(document).scrollTop(),
            openButton     = $('#open-button'),
            sideToolbar    = $('#sideToolbar'),
            sideToolbarTop = $('.main-header').outerHeight(),
            scrollPercent  = tools.getScrollPercent(),
            toUpDown       = $("#toUpDown"),
            toUpDownI      = $("#toUpDownI"),
            toUpDownSpan   = $('.toUpDownSpan');

        // 设置底部滚动条
        progressBar.setProgress(scrollPercent);

        // 设置文章目录位置
        if (sideToolbarTop <= docScroll) {
            if (!sideToolbar.hasClass('sideToolbarFix')) {
                sideToolbar.addClass('sideToolbarFix');
            }
        } else {
            sideToolbar.removeClass('sideToolbarFix');
        }

        // 设置头部底部按钮
        if (homeScroll <= docScroll) {
            toUpDownI.rotate({animateTo:0});
            toUpDown.attr('data', 'up');
            toUpDownSpan.text('返回顶部');
        } else {
            toUpDownI.rotate({animateTo:-180});
            toUpDown.attr('data', 'down');
            toUpDownSpan.text('跳至底部');
        }

        // 设置上下滚动
        if (temScroll < docScroll) { // 向下滚动

            if (homeScroll <= docScroll) { // 滚过头图

                // 设置菜单按钮
                if (!openButton.hasClass('menu-button-scroll')) {
                    openButton.addClass('menu-button-scroll');
                    openButton.text('');
                }
            }

        } else { // 向上滚动

            if (homeScroll >= docScroll) { // 滚入头图

                // 设置菜单按钮
                if (openButton.hasClass('menu-button-scroll')) {
                    openButton.removeClass('menu-button-scroll');
                    openButton.text('MENU');
                }
            }
        }
        temScroll = docScroll;
    };

    /**
     * 屏幕大小变化处理
     */
    this.resizeMonitor = function() {
        var bodyWidth = parseFloat(document.body.clientWidth);

        // 设置目录插件左右位置
        if ($('#sideToolbar').length > 0) {
            var mainContentWidth = $('#mainContent').outerWidth(true);
            var listWidth        = $('#sideCatalog').outerWidth(true);
            listWidth = listWidth > 220 ? listWidth : 242;
            var bothWidth        = (bodyWidth - mainContentWidth) / 2;
            var rightPx          = bothWidth - listWidth - 50;

            $('#sideCatalog').css('right', (rightPx > 0 ? rightPx : 0) + 'px');
            if (bothWidth > listWidth + 50 && bodyWidth > 1230) {
                $('#sideToolbar').css('visibility', 'visible');
            } else {
                $('#sideToolbar').css('visibility', 'hidden');
            }
        }
    };

    /**
     * 右下角菜单事件处理
     */
    this.rightMenuMous = function(l, s) {
        $(l).on({
            mouseover : function(){
                if (s == '.rightBuryitSpan') {
                    // 鼠标移入，更新踩值
                    var c = $('#bury_count').text();
                    if ($(s).text() != c) {$(l).attr('clickflg', 'false');$(s).text(c);}
                }

                if (s == '.rightDiggitSpan') {
                    // 鼠标移入，更新顶值
                    var c = $('#digg_count').text();
                    if ($(s).text() != c) {$(l).attr('clickflg', 'false');$(s).text(c);}
                }
                $(s).show();
            },
            mouseout : function(){
                $(s).hide();
            },
            click: function () {
                if (s == '.rightBuryitSpan' || s == '.rightDiggitSpan') {
                    // 点击顶踩，数值变化
                    if ($(this).attr('clickflg') == 'false') {
                        var rightSpan = $(s);
                        var i = parseInt(rightSpan.text()) + 1;
                        rightSpan.text(i);
                        $(this).attr('clickflg', 'true');
                    }
                }

                if (s == '.attentionSpan') {
                    // 点击关注
                    if ($('#p_b_follow').text() == '' || $(l + ' a').text().indexOf('成功') > 0) {
                        $(s).text('已关注');
                    } else {
                        $(s).text('关注');
                    }
                }

                if (s == '.toUpDownSpan') {
                    // 点击滚动
                    var ac = $(this).attr('data');
                    if (ac == 'down') {
                        var docHeight    = $(document).height();
                        var windowHeight = $(window).height();
                        tools.actScroll(docHeight-windowHeight, 2000)
                    } else {
                        tools.actScroll(0, 2000)
                    }
                }
            }
        }) ;
    };

    /**
     * 添加网站监控
     */
    this.addWebPv = function() {
        var pvHtml =  '<i class="iconfont icon-odps-data cnzz" style="position: relative;top: 2px;left: 3px;cursor: pointer;"></i>';
        pvHtml += '<span id="amazingStatSpan"></span>';
        pvHtml += '<div>【事实并非理所当然<span id="footerTextIcon">❤️</span>世界总是欲盖弥彰】</div>';
        pvHtml += "<div><span id='blogRunTimeSpan'></span><span class='my-face'>ღゝ◡╹)ノ♡</span></div>";
        pvHtml += '<div id="cnzzInfo"></div>';
        $('#footer').append(pvHtml);
        $('#footer').prepend('<div class="footer-image"></div>');

        if (window.location.href.search("www.cnblogs.com/bndong") == -1 ) {
            bndongJs.setTheme();
        }

        window.setInterval( bndongJs.setRunTime, 500 );
        setCnzzTId    = window.setInterval( bndongJs.setCnzz, 1000 );
        setAmazingTId = window.setInterval( bndongJs.setAmazing, 1000 );
    };
    this.setRunTime = function () {
        var str = $('#blogStartTimeInput').val();
        str = str ? str : '2016-11-17';
        var runDate = tools.getRunDate(str);
        $('#blogRunTimeSpan').text('This blog has running : '+runDate.daysold+' d '+runDate.hrsold+' h '+runDate.minsold+' m '+runDate.seconds+' s');
    };
    this.setCnzz = function() {
        // 请去 CNZZ 配置自己的，谢谢！！
        var cnzzStat = $('.id_cnzz_stat_icon a');
        if (cnzzStat.length > 0) {
            var cnzzInfo = [];
            var cnzzArr  = $(cnzzStat[1]).text().split('|');
            $.each(cnzzArr, function (i) {
                var str = $.trim(cnzzArr[i]);
                if (str != '') {
                    str = str.replace('今日','Today').replace('昨日','Yesterday').replace('[',':').replace(']','');
                    cnzzInfo.push(str)
                }
            });
            cnzzInfo.push($(cnzzStat[2]).text().replace('当前在线','Online').replace('[',':').replace(']',''));
            $('#cnzzInfo').text(cnzzInfo.join(' | '));
            window.clearInterval(setCnzzTId);
        }
    };
    this.setAmazing = function () {
        // 请去 AmazingCounters.com 配置自己的，谢谢！！
        if ($('#amazingStat').length > 0) {
            $('#amazingStat').appendTo('#amazingStatSpan').show();
            window.clearInterval(setAmazingTId);
        }
    };
    this.setTheme = function () {
        $('#footer').prepend('<div class="footer-image"></div>');
        setInterval(function(){
            var footer = $('#footer');
            var themeHtml = '<p id="ThemeAuthors" style="color: #444;z-index: 999;">- Theme Authors：<a href="https://www.cnblogs.com/bndong/" target="_blank" style="color:#444;">BNDong</a> -</p></div>';
            $('#ThemeAuthors').show();
            if ($('#ThemeAuthors').length == 0) {
                $('#footer').append(themeHtml);
            }
        },3000);
    };

    /**
     * 设置菜单数据
     */
    this.setMenuData = function() {
        var sbClassifyHtml = $('#sidebar_postcategory').html(); // 随笔分类
        var introduceHtml  = $('#profile_block').html();        // 个人信息
        var sbRecordHtml   = $('#sidebar_postarchive').html();  // 随笔档案
        var sbTopview      = $('#TopViewPostsBlock ul li');     // 阅读排行
        var topDiggPosts   = $('#TopDiggPostsBlock ul li');     // 推荐排行

        // 添加随笔分类
        if ((typeof sbClassifyHtml == 'string') && $('#sb-classify').html() == '') {
            $('#sb-classify').html(tools.htmlFiltrationScript(sbClassifyHtml));
        }

        // 添加个人信息
        if ((typeof introduceHtml == 'string') && $('#introduce').html() == '') {
            $('#introduce').html(tools.htmlFiltrationScript(introduceHtml));
        }

        // 添加随笔档案
        if ((typeof sbRecordHtml == 'string') && $('#sb-record').html() == '') {
            $('#sb-record').html(tools.htmlFiltrationScript(sbRecordHtml));
        }

        // 添加阅读排行
        if (sbTopview.length > 0 && $('#sb-topview').html() == '') {
            var sbTopviewHtml = '<div><ul>';
            sbTopview.each(function (i) {
                var o = $($(sbTopview[i]).html());
                var textArr = o.text().split('.');
                textArr.splice(0,1);
                var text = $.trim(textArr.join('.'));
                o.text(text);
                sbTopviewHtml += '<li>' + o.prop("outerHTML") + '</li>';
            });
            sbTopviewHtml += '</ul></div>';
            $('#sb-topview').html(sbTopviewHtml);
        }

        // 添加推荐排行
        if (topDiggPosts.length > 0 && $('#sb-topDiggPosts').html() == '') {
            var topDiggPostsHtml = '<div><ul>';
            topDiggPosts.each(function (i) {
                var o = $($(topDiggPosts[i]).html());
                var textArr = o.text().split('.');
                textArr.splice(0,1);
                var text = $.trim(textArr.join('.'));
                o.text(text);
                topDiggPostsHtml += '<li>' + o.prop("outerHTML") + '</li>';
            });
            topDiggPostsHtml += '</ul></div>';
            $('#sb-topDiggPosts').html(topDiggPostsHtml);
        }

        // 清除定时器
        if ((typeof sbClassifyHtml == 'string') && (typeof introduceHtml == 'string') && (typeof sbRecordHtml == 'string') && sbTopview.length > 0 && topDiggPosts.length > 0) {
            window.clearInterval(setMenuDataTId);
        }
    };

    /**
     * 添加主页右下角菜单
     */
    this.addHomeRightMenu = function() {
        var rightMenu = $('#rightMenu');
        if (rightMenu.length > 0) {

            // 添加上下滚动
            var upDownHtml = '<div id="toUpDown" data="up"><span class="rightMenuSpan toUpDownSpan">返回顶部</span><div id="toUpDownI"><i class="iconfont icon-zhiding"></i></div></div>';
            rightMenu.prepend(upDownHtml);
            bndongJs.rightMenuMous('#toUpDown', '.toUpDownSpan');

            // 添加关注
            var clickStr = '';
            if ($('#p_b_follow').text() != '') {
                clickStr = $('#p_b_follow a').attr('onclick');
            }

            if (clickStr.indexOf('unfollow') > 0 || clickStr == '') {
                var attHtml = '<div id="attention" clickflg="true"><span class="rightMenuSpan attentionSpan">已关注</span><i class="iconfont icon-dianzan"></i></div>';
            } else {
                var attHtml = '<div id="attention" onclick="' + clickStr.replace('unfollow', 'follow') + '" clickflg="false"><span class="rightMenuSpan attentionSpan">关注</span><i class="iconfont icon-dianzan"></i></div>';
            }

            rightMenu.prepend(attHtml);
            bndongJs.rightMenuMous('#attention', '.attentionSpan');
            bndongJs.scrollMonitor(); // 触发一次滚动处理，防止未有对象，初始化失败
            window.clearInterval(setRightMenuTId);
        }
    };

    /**
     * 添加非主页右下角菜单
     */
    this.addNotHomeRightMenu = function() {
        var rightMenu = $('#rightMenu');
        if (rightMenu.length > 0 && $('#div_digg').length > 0) {

            bndongJs.addHomeRightMenu();

            // 添加踩
            var rightBuryitHtml = '<div id="rightBuryit" clickflg="false" onclick="' + ($(".buryit").attr("onclick")) + '"><span class="rightMenuSpan rightBuryitSpan">' + $('#bury_count').text() + '</span><i class="iconfont icon-buzan"></i></div>';
            rightMenu.prepend(rightBuryitHtml);
            bndongJs.rightMenuMous('#rightBuryit', '.rightBuryitSpan');

            // 添加顶
            var rightDiggitHtml = '<div id="rightDiggit" clickflg="false" onclick="' + ($(".diggit").attr("onclick")) + '"><span class="rightMenuSpan rightDiggitSpan">' + $('#digg_count').text() + '</span><i class="iconfont icon-zan1"></i></div>';
            rightMenu.prepend(rightDiggitHtml);
            bndongJs.rightMenuMous('#rightDiggit', '.rightDiggitSpan');

            window.clearInterval(setRightMenuTId);
        }
    }
}