/*!
 * DATE: 2018-03-13
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 **/
function Base() {

    var bndongJs    = this,
        tools       = new myTools,
        progressBar = new ToProgress(window.cnblogsConfig.progressBar, '#bottomProgressBar'), // 进度条
        temScroll   = 0,  // 上一次页面滚动位置

        /** 定时器 **/
        timeIds    = {
            setMenuDataTId         : null, // 菜单设置数据定时器ID
            setHomeRightMenuTId    : null, // 主页右下角菜单设置定时器ID
            setNotHomeRightMenuTId : null, // 非主页右下角菜单设置定时器ID
            setCnzzTId             : null, // 网站统计Cnzz设置定时器ID
            setAmazingTId          : null, // 网站统计Amazing设置定时器ID
            setCatalogTId          : null, // 文章目录设置定时器ID
        }
    ;

    /**
     * 初始化
     */
    this.init = function () {

        // Loading前初始化
        bndongJs.loadingBeforeInit();

        // Loading结束
        bndongJs.endLoading();

        // Loading后初始化
        bndongJs.loadingAfterInit();
    };

    /**
     * Loading前初始化
     */
    this.loadingBeforeInit = function () {

        // 设置名称
        $('#homeTopTitle').text(window.cnblogsConfig.blogUser);

        // 设置菜单个人简介头像
        $('#menuBlogAvatar').append("<img src='"+window.cnblogsConfig.blogAvatar+"'>");

        // 背景动画
		if (window.cnblogsConfig.bgAnimationRendered) require(['RibbonsEffect']);

        // 页面初始化
        ($('#topics').length > 0) ? bndongJs.notHomeInit() : bndongJs.homeInit();
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
        var linkObject  = document.createElement('link');
        linkObject.rel  = "shortcut icon";
        linkObject.href = window.cnblogsConfig.webpageIcon;
        document.getElementsByTagName("head")[0].appendChild(linkObject);

        // 添加页脚
        bndongJs.addFooter();

        // 设置菜单侧边栏内容
        timeIds.setMenuDataTId = window.setInterval( bndongJs.setMenuData, 1000 );

        // html5-title
        bndongJs.htmlTitle();

        // 添加页面特效控制
        bndongJs.setPageAnimationControl();

        // 控制台输出
        tools.consoleText(window.cnblogsConfig.consoleList, 'banner');

        (function () {
            var re = /x/
                ,i = 0;
            console.log(re);

            re.toString = function () {
                return '欢迎访问本博客，这是您第 ' + (++i) + ' 次打开控制台。';
            };
        })();

        // 延时清除全部定时器
        setTimeout(bndongJs.clearIntervalAll, 30000);
    };

    /**
     * 清除全部定时器
     */
    this.clearIntervalAll = function () {
        $.each(timeIds, function (e) {
            null != e && window.clearInterval(e);
        });
    };

    /**
     * 清除单个定时器
     */
    this.clearIntervalTimeId = function (timeId) {
        null != timeId && window.clearInterval(timeId);
    };

    /**
     * HTML-TITLE
     */
    this.htmlTitle = function() {
        var RelTitle = document.title,
            hidden,
            visibilityChange,
            timer;
        
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
            if (timer) clearTimeout(timer);
            if (document[hidden]) {
                timer = setTimeout(function () {
                     document.title = window.cnblogsConfig.webpageTitleOnblur + ' - ' + RelTitle.split(' - ')[0];
                }, window.cnblogsConfig.webpageTitleOnblurTimeOut);
            } else {
                document.title = window.cnblogsConfig.webpageTitleFocus;
                timer = setTimeout(function () {
                    document.title = RelTitle;
                }, window.cnblogsConfig.webpageTitleFocusTimeOut);
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

        // 设置主页图片
        $('.main-header').css({
            'background': '#222 url('+window.cnblogsConfig.homeTopImg+')  center center no-repeat',
            'background-size': 'cover'
        });

        // 头图点击滚动到内容位置
        $('.scroll-down').click(function () { var endScroll = $('#home').offset().top + 10; tools.actScroll(endScroll, 1000);});

        // 设置右下角菜单
        timeIds.setHomeRightMenuTId = window.setInterval( bndongJs.addHomeRightMenu, 1000 );

        bndongJs.setHitokoto();
        bndongJs.scrollMonitor();
        bndongJs.setDomHomePosition();

        if (window.cnblogsConfig.homeTopAnimationRendered)
            require(['circleMagic'], function() {
                $('.main-header').circleMagic(window.cnblogsConfig.homeTopAnimation);
        });
    };

    /**
     * 非主页初始化
     */
    this.notHomeInit = function() {

        // 设置随笔标题
        var sbTitle = $('#cb_post_title_url').text();
        $('.main-header-content').append('<h1 class="sb-title">'+sbTitle+'</h1>');
        $('.inner').css('max-width', '100vw');

        bndongJs.setDomHomePosition();
        bndongJs.setCodeHighlighting();

        require(['baguetteBox', 'marvin', 'articleStatement'], function(baguetteBox) {

            // 设置图片点击查看
            var cpb     = $('#cnblogs_post_body')
                ,imgList = $('#cnblogs_post_body img');

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
            timeIds.setCatalogTId = window.setInterval( bndongJs.initCatalog, 1000 );

            bndongJs.scrollMonitor();
        });

        // 设置右下角菜单
        timeIds.setNotHomeRightMenuTId = window.setInterval( bndongJs.addNotHomeRightMenu, 1000 );

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
            bndongJs.clearIntervalTimeId(timeIds.setCatalogTId);
        }
    };

    /**
     * 设置主页标语
     */
    this.setHitokoto = function() {

        if (window.cnblogsConfig.homeBannerText != "") {
            $('#hitokoto').text(window.cnblogsConfig.homeBannerText).css('display', '-webkit-box');
            bndongJs.setDomHomePosition();
            return true;
        }

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

        // ===================  ONE . 每日一句  =================================
        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://api.hibai.cn/api/index/index",
        //     "method": "POST",
        //     "headers": {
        //         "content-type": "application/x-www-form-urlencoded",
        //     },
        //     "data": {
        //         "TransCode": "030111",
        //         "OpenId": "123456789",
        //         "Body": ""
        //     }
        // };
        //
        // $.ajax(settings).done(function (response) {
        //     if (response.ResultCode == 1) {
        //         $('#hitokoto').text(response.Body.word).css('display', '-webkit-box');
        //         $('#hitokotoAuthor').text('- '+response.Body.word_from).show();
        //     } else {
        //         var listIndex = tools.randomNum(0, topTitleList.length - 1);
        //         $('#hitokoto').text(topTitleList[listIndex]).css('display', '-webkit-box');
        //     }
        //     bndongJs.setDomHomePosition();
        //     return false;
        // });

        // ===================  今日诗词  =================================
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://v2.jinrishici.com/one.json",
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            if (response && response.status == "success") {
                $('#hitokoto').text(response.data.content).css('display', '-webkit-box');
                $('#hitokotoAuthor').text('《'+response.data.origin.title+'》 - '+response.data.origin.dynasty+' - '+response.data.origin.author).show();
            } else {
                var listIndex = tools.randomNum(0, topTitleList.length - 1);
                $('#hitokoto').text(topTitleList[listIndex]).css('display', '-webkit-box');
            }
            bndongJs.setDomHomePosition();
            return false;
        });
    };

    /**
     * 设置非主页头图
     */
    this.setNotHomeTopImg = function() {
        $('.main-header').css({
            'height': '40vh',
            'background': '#222 url('+window.cnblogsConfig.essayTopImg+')  center center no-repeat',
            'background-size': 'cover'
        });
        $('#homeTopTitle').hide();
        $('.scroll-down').hide();
        $('#home').css('margin-top', '40vh');
        $('#cb_post_title_url').addClass('post-del-title');

        if (window.cnblogsConfig.essayTopAnimationRendered)
            require(['TweenMax', 'MyTween'], function() {
            initCanvas('notHomeTopCanvas');
            start();
        });
    };

    /**
     * 初始化主体内容位置
     */
    this.setDomHomePosition = function () {
        $('#home').css('margin-top', $('.main-header').outerHeight() + 'px');
    };

    /**
     * 页面特效控制
     */
    this.setPageAnimationControl = function () {
        if (window.cnblogsConfig.homeTopAnimationRendered
            || window.cnblogsConfig.essayTopAnimationRendered
            || window.cnblogsConfig.bgAnimationRendered
        ) {
            var html = '<div id="pageAnimationOffOn" data="off" style="z-index:  999;position:  absolute;top: 15px;right: 20px;font-size: 14px;color: #f9f9f9;cursor: pointer;">';
            html += '<span id="pageAnimationOffOnIcon" class="iconfont icon-shandian" style="display: inline-block;"></span>';
            html += '<span id="pageAnimationOffOnText">关闭页面特效</span>';
            html += '</div>';
            $('body').prepend(html);
            $('#pageAnimationOffOn').click(function () {
                if ($(this).attr('data') == 'off') {
                    $('body').find('canvas').hide();
                    $('#pageAnimationOffOnIcon').rotate({animateTo:-360});
                    $('#pageAnimationOffOnText').text("打开页面特效");
                    $(this).attr('data', 'on');
                } else {
                    $('body').find('canvas').show();
                    $('#pageAnimationOffOnIcon').rotate({animateTo:360});
                    $('#pageAnimationOffOnText').text("关闭页面特效");
                    $(this).attr('data', 'off');
                }
            });
        }
    };

    /**
     * 设置代码高亮
     */
    this.setCodeHighlighting = function () {
        var pre       = $('pre'),
            codeCopyA = $('.cnblogs_code_copy a'),
            codeSpan  = $('.cnblogs_code span'),
            codePre   = $('.post pre'),
            hltype    = window.cnblogsConfig.essayCodeHighlightingType.toLowerCase(),
            hltheme   = window.cnblogsConfig.essayCodeHighlighting.toLowerCase();

        switch (hltype) {
            case 'highlightjs': highlightjsCode(); break;
            case 'prettify': prettifyCode(); break;
            case 'cnblogs':
            default: cnblogsCode(); break;
        }
        setScrollbarStyle();

        // 使用博客园代码样式
        function cnblogsCode() {
            codeCopyA.html('<i class="iconfont icon-code5" style="color: #999;"></i>');
            codeSpan.css('background-color', '#f6f8fa');
            codePre.css({
                'background-color': '#f6f8fa',
                'overflow-x': 'auto'
            });
        }

        // 使用 highlightjs 代码样式
        function highlightjsCode() {
            tools.dynamicLoadingCss('https://highlightjs.org/static/demo/styles/'+hltheme+'.css');
            setCodeBefore();
            require(['highlightjs'], function() {
                $('pre').each(function(i, block) {
                    codeCopyA.html('<i class="iconfont icon-code5 hljs-comment" style="font-style: inherit;"></i>');
                    if ($.inArray(hltheme, [
                            'github-gist', 'googlecode', 'grayscale',
                            'idea', 'isbl-editor-light', 'qtcreator_light',
                            'tomorrow', 'vs', 'xcode', 'arduino-light',
                            'ascetic', 'color-brewer', 'lightfair'
                        ]) != -1) pre.css('background-color', '#f6f8fa');
                    hljs.highlightBlock(block);
                });
            });
        }
        // 使用 prettify 代码样式
        function prettifyCode() {
            pre.addClass('prettyprint');
            switch (hltheme) {
                case 'prettify':
                    setCodeBefore();
                    require(['codePrettify'], function() {
                        $('pre').css('background-color', '#f6f8fa').css('border', '0'); setPrettifyCopy();
                    });break;
                case 'desert':
                    setCodeBefore(); require(['codeDesert'], function() { setPrettifyCopy(); });break;
                case 'sunburst':
                    setCodeBefore(); require(['codeSunburst'], function() { setPrettifyCopy(); }); break;
                case 'obsidian':
                    setCodeBefore(); require(['codeObsidian'], function() { setPrettifyCopy(); }); break;
                case 'doxy':
                    setCodeBefore(); require(['codeDoxy'], function() { setPrettifyCopy(); }); break;
                default: cnblogsCode(); break;
            }
        }

        function setCodeBefore() {
            $.each(codePre, function (i) {
                var obj = $(codePre[i]);
                obj.find('br').after('&#10;');
                var codetext = obj.text();
                obj.html('').text(codetext).css('overflow-x', 'auto');
            });
        }

        function setPrettifyCopy() {
            codeCopyA.html('<i class="iconfont icon-code5 com" style="font-style: inherit;"></i>');
        }

        // 设置代码滚动条样式
        function setScrollbarStyle() {
            tools.dynamicLoadingCss(getJsDelivrUrl('jquery.mCustomScrollbar.css'));
            var scrollbarTimeId = window.setInterval( function () {
                if ($('.post pre span').length > 0) {
                    $('.post pre').mCustomScrollbar({
                        theme:"minimal-dark",
                        axis:"yx"
                    });
                    switch (hltype) {
                        case 'highlightjs':$('.mCSB_dragger_bar').css('background-color', $('.hljs-comment').css('color')); break;
                        case 'prettify': $('.mCSB_dragger_bar').css('background-color', $('.com').css('color')); break;
                        case 'cnblogs':
                        default:  break;
                    }
                    bndongJs.clearIntervalTimeId(scrollbarTimeId);
                }
            }, 500 );
        }
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
        function CommentBubble() {
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
        pageLoading.spinner.setComplete();
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
        bndongJs.setDomHomePosition();

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
    this.rightMenuMous = function(parentObject, subObject) {
        $(parentObject).on({
            mouseover : function(){
                if (subObject == '.rightBuryitSpan') {
                    // 鼠标移入，更新踩值
                    var str = $('#bury_count').text();
                    if ($(subObject).text() != str) {$(parentObject).attr('clickflg', 'false');$(subObject).text(str);}
                }

                if (subObject == '.rightDiggitSpan') {
                    // 鼠标移入，更新顶值
                    var str = $('#digg_count').text();
                    if ($(subObject).text() != str) {$(parentObject).attr('clickflg', 'false');$(subObject).text(str);}
                }
                $(subObject).show();
            },
            mouseout : function(){
                $(subObject).hide();
            },
            click: function () {
                if (subObject == '.rightBuryitSpan' || subObject == '.rightDiggitSpan') {
                    // 点击顶踩，数值变化
                    if ($(this).attr('clickflg') == 'false') {
                        var rightSpan = $(subObject);
                        var i = parseInt(rightSpan.text()) + 1;
                        rightSpan.text(i);
                        $(this).attr('clickflg', 'true');
                    }
                }

                if (subObject == '.attentionSpan') {
                    // 点击关注
                    if ($('#p_b_follow').text() == '' || $(parentObject + ' a').text().indexOf('成功') > 0) {
                        $(subObject).text('已关注');
                    } else {
                        $(subObject).text('关注');
                    }
                }

                if (subObject == '.toUpDownSpan') {
                    // 点击滚动
                    var ac = $(this).attr('data');
                    if (ac == 'down') {
                        var docHeight    = $(document).height();
                        var windowHeight = $(window).height();
                        tools.actScroll(docHeight - windowHeight, 2000)
                    } else {
                        tools.actScroll(0, 2000)
                    }
                }
            }
        }) ;
    };

    /**
     * 添加页脚
     */
    this.addFooter = function() {
        // var pvHtml =  '<i class="iconfont icon-odps-data cnzz" style="position: relative;top: 2px;left: 3px;cursor: pointer;"></i>';
        var pvHtml = '<span id="amazingStatSpan"></span>';
        pvHtml += '<div>【'+window.cnblogsConfig.bottomText.left+'<span id="footerTextIcon">'+window.cnblogsConfig.bottomText.icon+'</span>'+window.cnblogsConfig.bottomText.right+'】</div>';
        pvHtml += "<div><span id='blogRunTimeSpan'></span><span class='my-face'>ღゝ◡╹)ノ♡</span></div>";
        pvHtml += '<div id="blogrollInfo"></div>';
        pvHtml += '<div id="cnzzInfo"></div>';
        $('#footer').append(pvHtml).prepend('<div class="footer-image"></div>');

        if (window.cnblogsConfig.themeAuthor && window.location.href.search("www.cnblogs.com/bndong") == -1 ) setTheme();

        window.setInterval( setRunTime, 500 );
        setBlogroll();
        timeIds.setCnzzTId    = window.setInterval( setCnzz, 1000 );
        // timeIds.setAmazingTId = window.setInterval( setAmazing, 1000 );

        function setRunTime() {
            var str = window.cnblogsConfig.blogStartDate;
            str = str ? str : '2016-11-17';
            var runDate = tools.getRunDate(str);
            $('#blogRunTimeSpan').text('This blog has running : '+runDate.daysold+' d '+runDate.hrsold+' h '+runDate.minsold+' m '+runDate.seconds+' s');
        }
        function setBlogroll() {
            if (window.cnblogsConfig.bottomBlogroll.length > 0) {
                var blogrollArr  = window.cnblogsConfig.bottomBlogroll;
                var blogrollHtml = '友情链接：';
                for(var i = 0; i < blogrollArr.length; i++) {
                    blogrollHtml += '<a href="'+(blogrollArr[i][1])+'" target="_blank">'+(blogrollArr[i][0])+'</a>';
                    if (i < blogrollArr.length-1) blogrollHtml += '<span style="margin: 0 3px;">/</span>';
                }
                $('#blogrollInfo').html(blogrollHtml);
            }
        }
        function setCnzz() {
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
                bndongJs.clearIntervalTimeId(timeIds.setCnzzTId);
            }
        }
        function setAmazing() {
            // 请去 AmazingCounters.com 配置自己的，谢谢！！
            if ($('#amazingStat').length > 0) {
                $('#amazingStat').appendTo('#amazingStatSpan').show();
                bndongJs.clearIntervalTimeId(timeIds.setAmazingTId);
            }
        }
        function setTheme() {
            $('#footer').prepend('<div class="footer-image"></div>');
            setInterval(function(){
                var footer = $('#footer');
                var themeHtml = '<p id="ThemeAuthors" style="color: #444;z-index: 999;">- Theme Author：<a href="https://www.cnblogs.com/bndong/" target="_blank" style="color:#444;">BNDong</a> -</p></div>';
                if ($('#ThemeAuthors').length == 0) {
                    $('#footer').append(themeHtml);
                } else {
                    $('#ThemeAuthors').show().css('visibility', 'visible');
                }
            },3000);
        }
    };

    /**
     * 设置菜单数据
     */
    this.setMenuData = function() {
        var introduceHtml    = $('#profile_block').html(),        // 个人信息
            sidebar          = $('#sidebar_recentposts ul li'),   // 最新随笔
            toptags          = $('#sidebar_toptags ul li'),       // 我的标签
            sbClassify       = $('#sidebar_postcategory ul li'),  // 随笔分类
            sbRecord         = $('#sidebar_postarchive ul li'),   // 随笔档案
            sbTopview        = $('#TopViewPostsBlock ul li'),     // 阅读排行
            topDiggPosts     = $('#TopDiggPostsBlock ul li'),     // 推荐排行
            menuIntroduce    = $('#introduce'),
            menuSidebar      = $('#sb-sidebarRecentposts'),
            menuToptags      = $('#sb-toptags'),
            menuClassify     = $('#sb-classify'),
            menuRecord       = $('#sb-record'),
            menuTopview      = $('#sb-topview'),
            menuTopDiggPosts = $('#sb-topDiggPosts');

        // 添加个人信息
        if ((typeof introduceHtml == 'string') && menuIntroduce.html() == '')
            menuIntroduce.html(tools.htmlFiltrationScript(introduceHtml));

        // 添加最新随笔
        if (sidebar.length > 0 && menuSidebar.html() == '')
            menuSidebar.html(getMenuData(sidebar, 'icon-time_fill')).prev('.m-list-title').show();

        // 添加我的标签
        if (toptags.length > 0 && menuToptags.html() == '')
            menuToptags.html(getMenuData(toptags, 'icon-label_fill')).prev('.m-list-title').show();

        // 添加随笔分类
        if (sbClassify.length > 0 && menuClassify.html() == '')
            menuClassify.html(getMenuData(sbClassify, 'icon-marketing_fill')).prev('.m-list-title').show();

        // 添加随笔档案
        if (sbRecord.length > 0 && menuRecord.html() == '')
            menuRecord.html(getMenuData(sbRecord, 'icon-task_fill')).prev('.m-list-title').show();

        // 添加阅读排行
        if (sbTopview.length > 0 && menuTopview.html() == '')
            menuTopview.html(getMenuData(sbTopview, 'icon-browse_fill')).prev('.m-list-title').show();

        // 添加推荐排行
        if (topDiggPosts.length > 0 && menuTopDiggPosts.html() == '')
            menuTopDiggPosts.html(getMenuData(topDiggPosts, 'icon-like_fill')).prev('.m-list-title').show();

        // 清除定时器
        if (
            sidebar.length > 0
             && toptags.length > 0
             && sbClassify.length > 0
             && sbRecord.length > 0
             && sbTopview.length > 0
             && topDiggPosts.length > 0
        ) {
            bndongJs.clearIntervalTimeId(timeIds.setMenuDataTId);
        }

        function getMenuData(obj, icon) {
            var html = '<div><ul>';
            var ret  = /^[1-9]+[0-9]*$/;
            obj.each(function (i) {
                var o = $($(obj[i]).html());
                var textArr = o.text().split('.');
                if (ret.test(textArr[0])) textArr.splice(0,1);
                var text = $.trim(textArr.join('.'));
                var iconHtml = '<span class="iconfont '+icon+'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>';
                o.html(iconHtml + text);
                html += '<li>' + o.prop("outerHTML") + '</li>';
            });
            html += '</ul></div>';
            return html;
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
            bndongJs.clearIntervalTimeId(timeIds.setHomeRightMenuTId);
        }
    };

    /**
     * 添加非主页右下角菜单
     */
    this.addNotHomeRightMenu = function() {
        var rightMenu = $('#rightMenu');
        if (rightMenu.length > 0 && $('#div_digg').length > 0) {

            if ($('#toUpDown').length == 0 && $('#attention').length == 0) bndongJs.addHomeRightMenu();

            // 添加踩
            var rightBuryitHtml = '<div id="rightBuryit" clickflg="false" onclick="' + ($(".buryit").attr("onclick")) + '"><span class="rightMenuSpan rightBuryitSpan">' + $('#bury_count').text() + '</span><i class="iconfont icon-buzan"></i></div>';
            rightMenu.prepend(rightBuryitHtml);
            bndongJs.rightMenuMous('#rightBuryit', '.rightBuryitSpan');

            // 添加顶
            var rightDiggitHtml = '<div id="rightDiggit" clickflg="false" onclick="' + ($(".diggit").attr("onclick")) + '"><span class="rightMenuSpan rightDiggitSpan">' + $('#digg_count').text() + '</span><i class="iconfont icon-zan1"></i></div>';
            rightMenu.prepend(rightDiggitHtml);
            bndongJs.rightMenuMous('#rightDiggit', '.rightDiggitSpan');
            bndongJs.clearIntervalTimeId(timeIds.setNotHomeRightMenuTId);
        }
    }
}
