/*!
 * DATE: 2018-03-13
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 **/
function Base() {

    const bndongJs     = this,
          tools        = new myTools,
          isHome       = !!$('#topics').length;

    let progressBar  = new ToProgress(window.cnblogsConfig.progressBar, '#bottomProgressBar'), // 进度条
        temScroll    = 0,  // 上一次页面滚动位置

        /** 定时器 **/
        timeIds    = {
            setMenuIntroduceTId       : null, // 菜单设置-个人信息定时器ID
            setMenuCalendarTId        : null, // 菜单设置-日历定时器ID
            setSidebarSearchTId       : null, // 菜单设置-找找看定时器ID
            setSidebarScorerankTId    : null, // 菜单设置-积分与排名定时器ID
            setMenuSidebarTId         : null, // 菜单设置-最新随笔定时器ID
            setMenuToptagsTId         : null, // 菜单设置-我的标签定时器ID
            setMenuClassifyTId        : null, // 菜单设置-随笔分类定时器ID
            setMenuArticleCategoryTId : null, // 菜单设置-文章分类定时器ID
            setMenuRecordTId          : null, // 菜单设置-随笔档案定时器ID
            setMenuArticleTId         : null, // 菜单设置-文章档案定时器ID
            setMenuTopviewTId         : null, // 菜单设置-阅读排行定时器ID
            setMenuTopDiggPostsTId    : null, // 菜单设置-推荐排行定时器ID
            setMenuRecentCommentsTId  : null, // 菜单设置-最新评论定时器ID
            setHomeRightMenuTId       : null, // 主页右下角菜单设置定时器ID
            setNotHomeRightMenuTId    : null, // 非主页右下角菜单设置定时器ID
            setCnzzTId                : null, // 网站统计Cnzz设置定时器ID
            setAmazingTId             : null, // 网站统计Amazing设置定时器ID
            setCatalogTId             : null, // 文章目录设置定时器ID
            blogPostCategoryTId       : null, // 文章信息分类设置定时器ID
            entryTagTId               : null, // 文章信息标签设置定时器ID
            commentTId                : null, // 评论框设置定时器ID
        };

//----------------------------------- 初始化 -----------------------------------------//

    /**
     * 初始化
     */
    this.init = function () {
        bndongJs.loadingBeforeInit(); // Loading 前初始化
        bndongJs.endLoading();        // Loading 结束
        bndongJs.loadingAfterInit();  // Loading 后初始化
        window.cnblogsConfig.hook.pageInitEnd(bndongJs);
    };

//----------------------------- Loading 前后逻辑处理 ----------------------------------//

    /**
     * Loading 前初始化
     */
    this.loadingBeforeInit = function () {

        // 延时清除全部定时器
        setTimeout(bndongJs.clearIntervalAll, 30000);

        // 添加扩展字体图标库
        if (window.cnblogsConfig.fontIconExtend !== '') tools.dynamicLoadingCss(window.cnblogsConfig.fontIconExtend);

        // 页面初始化
        isHome ? bndongJs.notHomeInit() : bndongJs.homeInit();
    };

    /**
     * Loading后初始化
     */
    this.loadingAfterInit = function () {

        // 页面初始化
        isHome ? bndongJs.notHomeInitAfter() : bndongJs.homeInitAfter();

        // 添加页脚
        bndongJs.addFooter();

        // 背景动画
        if (window.cnblogsConfig.bgAnimationRendered) require(['RibbonsEffect']);

        // 更换网站图标
        let shortcutIcon = $('link[rel="shortcut icon"]');
        if (shortcutIcon.length) {
            shortcutIcon.attr('href', window.cnblogsConfig.webpageIcon);
        } else {
            let linkObject  = document.createElement('link');
            linkObject.rel  = "shortcut icon";
            linkObject.href = window.cnblogsConfig.webpageIcon;
            document.getElementsByTagName("head")[0].appendChild(linkObject);
        }

        // 滚动监听
        $(window).scroll( function() { bndongJs.scrollMonitor(); });

        // 窗口变化监听
        $(window).resize( function() { bndongJs.resizeMonitor(); });

        // 设置名称
        $('#homeTopTitle').text(window.cnblogsConfig.blogUser);

        // 初始化菜单滚动条样式
        $('#menuWrap').optiscroll({ forceScrollbars: true, maxTrackSize: 20, preventParentScroll: true });

        // 设置菜单个人简介头像
        let blogAvatar = window.cnblogsConfig.blogAvatar ? window.cnblogsConfig.blogAvatar : 'https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/default_avatar.webp';
        $('#menuBlogAvatar').append("<img src='"+blogAvatar+"'>");

        // html5-title
        bndongJs.htmlTitle();

        // 设置菜单个人信息背景图片
        bndongJs.setMenuUserInfoImg();

        // 设置菜单侧边栏内容
        let setMenuData = bndongJs.setMenuData();
        timeIds.setMenuIntroduceTId       = window.setInterval( setMenuData.setIntroduce, 1000 );
        timeIds.setMenuCalendarTId        = window.setInterval( setMenuData.setCalendar, 1000 );
        timeIds.setSidebarSearchTId       = window.setInterval( setMenuData.setSidebarSearch, 1000 );
        timeIds.setSidebarScorerankTId    = window.setInterval( setMenuData.setSidebarScorerank, 1000 );
        timeIds.setMenuSidebarTId         = window.setInterval( setMenuData.setSidebar, 1000 );
        timeIds.setMenuToptagsTId         = window.setInterval( setMenuData.setToptags, 1000 );
        timeIds.setMenuClassifyTId        = window.setInterval( setMenuData.setClassify, 1000 );
        timeIds.setMenuArticleCategoryTId = window.setInterval( setMenuData.setArticleCategory, 1000 );
        timeIds.setMenuArticleTId         = window.setInterval( setMenuData.setArticle, 1000 );
        timeIds.setMenuRecordTId          = window.setInterval( setMenuData.setRecord, 1000 );
        timeIds.setMenuTopviewTId         = window.setInterval( setMenuData.setTopview, 1000 );
        timeIds.setMenuTopDiggPostsTId    = window.setInterval( setMenuData.setTopDiggPosts, 1000 );
        timeIds.setMenuRecentCommentsTId  = window.setInterval( setMenuData.setRecentComments, 1000 );
        setMenuData.setCustomData();

        // 设置菜单展开收缩
        $('.m-list-title-select').click(function(){ $(this).parents('.m-list-title').next('.m-icon-list').slideToggle(500) });

        // 添加页面特效控制
        // bndongJs.setPageAnimationControl();

        // 添加日/夜间模式控制
        window.cnblogsConfig.switchDayNight.enable && bndongJs.setDayNightControl();

        // 广告
        if (window.cnblogsConfig.advertising) {
            $('#ad_c1').show();
            $('#ad_c2').show();
            $('#ad_t1').show();
            $('#ad_t2').show();
            $('#cnblogs_c1').show();
            $('#cnblogs_c2').show();
            $('#under_post_kb').show();
            $('#under_post_news').show();
        }

        // 控制台输出
        tools.consoleText(window.cnblogsConfig.consoleList, 'banner');
    };

//---------------------------------- 逻辑处理 --------------------------------------//

//=================== 逻辑处理：公共方法

    /**
     * 清除全部定时器
     */
    this.clearIntervalAll = function () {
        $.each(timeIds, function (e) {
            null != timeIds[e] && window.clearInterval(timeIds[e]);
        });
    };

    /**
     * 清除单个定时器
     */
    this.clearIntervalTimeId = function (timeId) {
        null != timeId && window.clearInterval(timeId);
    };

    /**
     * 滚动处理
     */
    this.scrollMonitor = function() {

        let homeScroll     = $('#home').offset().top - 40,
            docScroll      = $(document).scrollTop(),
            openButton     = $('#open-button'),
            sideToolbar    = $('#sideToolbar'),
            sideToolbarTop = $('.main-header').outerHeight(),
            scrollPercent  = tools.getScrollPercent(),
            toUpDown       = $("#toUpDown"),
            toUpDownI      = $("#toUpDownI"),
            toUpDownSpan   = $('.toUpDownSpan');

        // 设置滚动条
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
        const bodyWidth = parseFloat(document.body.clientWidth), sideToolbar = $('#sideToolbar');
        bndongJs.setDomHomePosition();

        // 设置目录插件左右位置
        if (sideToolbar.length > 0) {
            let mainContentWidth = $('#mainContent').outerWidth(true),
                sideCatalogBg    = $('#sideCatalog'),
                listWidth        = sideCatalogBg.outerWidth(true);
            listWidth = listWidth > 220 ? listWidth : 242;
            let bothWidth        = (bodyWidth - mainContentWidth) / 2,
                rightPx          = bothWidth - listWidth - 50,
                catalogBtn       = $('.catalog-btn'),
                sideToolbarTop   = $('.main-header').outerHeight();

            sideToolbar.css({
                'top': (sideToolbarTop + 5) + 'px',
                'right': (rightPx > 0 ? rightPx : 0) + 'px'
            });

            if (bodyWidth <= 1350) {
                sideCatalogBg.hide();
                sideCatalogBg.find('ul.nav li').length > 0 ? catalogBtn.show() : catalogBtn.hide();
            } else {
                catalogBtn.hide();
                sideCatalogBg.find('ul.nav li').length > 0 ? sideCatalogBg.show() : sideCatalogBg.hide();
            }
        }
    };

    /**
     * 右下角菜单事件处理
     */
    this.rightMenuMous = function(parentObjectStr, subObjectStr) {
        let parentObject = $(parentObjectStr);
        let subObject    = $(subObjectStr);
        let updBuryitDiggitNum = () => {
            let str = '';

            switch (subObjectStr) {
                case '.rightBuryitSpan':
                    str = $('#bury_count').text();
                    break;

                case '.rightDiggitSpan':
                    str = $('#digg_count').text();
                    break;
            }

            str !== '' && parentObject.attr('clickflg', 'false');
            str !== '' && subObject.text(str);
        }

        parentObject.find('i').on({
            mouseover : function(){
                !$(this).hasClass('icon-zhiding') && $(this).rotate({animateTo:-60, duration: 250, callback: function () {
                        $(this).rotate({animateTo:60, duration: 250, callback: function () {
                                $(this).rotate({animateTo:-30, duration: 150, callback: function () {
                                        $(this).rotate({animateTo:30, duration: 150, callback: function () {
                                                $(this).rotate({animateTo:0, duration: 100});
                                            }});
                                    }});
                            }});
                    }});
            }
        });

        parentObject.on({
            mouseover : function(){
                updBuryitDiggitNum();
                subObject.stop().fadeIn(300);
            },
            mouseout : function(){
                subObject.stop().fadeOut(300);
            },
            click: function () {

                switch (subObjectStr) {
                    case '.rightBuryitSpan':
                    case '.rightDiggitSpan':

                        // 点击顶踩，数值变化
                        if ($(this).attr('clickflg') === 'false') {
                            $(this).attr('clickflg', 'true');
                            subObject.text('提交中.');
                            setTimeout("$('"+subObjectStr+"').text('提交中..')", 300);
                            setTimeout("$('"+subObjectStr+"').text('提交中...')", 600);
                            setTimeout("$('"+subObjectStr+"').text('更新中.')", 900);
                            setTimeout("$('"+subObjectStr+"').text('更新中..')", 1200);
                            setTimeout("$('"+subObjectStr+"').text('更新中...')", 1500);

                            if (subObjectStr === '.rightBuryitSpan') {
                                setTimeout("$('"+subObjectStr+"').text($('#bury_count').text())", 1800);
                            } else {
                                setTimeout("$('"+subObjectStr+"').text($('#digg_count').text())", 1800);
                            }
                        }
                        break;

                    case '.attentionSpan':

                        // 点击关注
                        if ($(this).attr('clickflg') === 'false') {
                            setTimeout(hanFollow, 1500);
                            function hanFollow() {
                                if ('关注成功' === $.trim($('#p_b_follow').text())) {
                                    parentObject.attr('clickflg', 'true');
                                    subObject.text('已关注');
                                    parentObject.find('i').removeClass('icon-dianzan').addClass('icon-dianzan1');
                                }
                            }
                        }
                        break;


                    case '.toUpDownSpan':

                        // 点击滚动
                        let ac = $(this).attr('data');
                        if (ac === 'down') {
                            let docHeight    = $(document).height();
                            let windowHeight = $(window).height();
                            tools.actScroll(docHeight - windowHeight, 900)
                        } else {
                            tools.actScroll(0, 900)
                        }
                        break;
                }
            }
        }) ;
    };

//=================== 逻辑处理：页面公共处理

    /**
     * 结束Loading页面
     */
    this.endLoading = function() {
        $('body').css('overflow', 'auto');
        pageLoading.spinner.setComplete();
        $('div#loading').hide();
        $('a[name="top"]').hide();
        window.cnblogsConfig.hook.afterLoading(bndongJs, pageLoading);
    };

    /**
     * HTML-TITLE
     */
    this.htmlTitle = function() {
        let RelTitle = document.title,
            hidden,
            visibilityChange,
            timer,
            webpageTitleOnblur = window.cnblogsConfig.webpageTitleOnblur,
            webpageTitleOnblurTimeOut = window.cnblogsConfig.webpageTitleOnblurTimeOut,
            webpageTitleFocus = window.cnblogsConfig.webpageTitleFocus,
            webpageTitleFocusTimeOut = window.cnblogsConfig.webpageTitleFocusTimeOut;

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
                if (webpageTitleOnblurTimeOut >= 0) {
                    timer = setTimeout(function () {
                        document.title = webpageTitleOnblur + ' - ' + RelTitle.split(' - ')[0];
                    }, webpageTitleOnblurTimeOut);
                }
                window.cnblogsConfig.hook.pageLabelChanges(bndongJs, webpageTitleOnblur);
            } else {
                if (webpageTitleFocusTimeOut >= 0) {
                    document.title = webpageTitleFocus;
                    timer = setTimeout(function () {
                        document.title = RelTitle;
                    }, webpageTitleFocusTimeOut);
                } else {
                    document.title = RelTitle;
                }
                window.cnblogsConfig.hook.pageLabelChanges(bndongJs, webpageTitleFocus);
            }
        }
        if (typeof document.addEventListener !== "undefined" || typeof document[hidden] !== "undefined") {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
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
            let html = '<div id="pageAnimationOffOn" data="off">';
            html += '<span id="pageAnimationOffOnIcon" class="iconfont icon-shandian"></span>';
            html += '<span id="pageAnimationOffOnText">隐藏页面特效</span>';
            html += '</div>';
            $('body').prepend(html);
            $('#pageAnimationOffOn').click(function () {
                if ($(this).attr('data') === 'off') {
                    $('body').find('canvas').hide();
                    $('#pageAnimationOffOnIcon').rotate({animateTo:-360});
                    $('#pageAnimationOffOnText').text("显示页面特效");
                    $(this).attr('data', 'on');
                } else {
                    $('body').find('canvas').show();
                    $('#pageAnimationOffOnIcon').rotate({animateTo:360});
                    $('#pageAnimationOffOnText').text("隐藏页面特效");
                    $(this).attr('data', 'off');
                }
            });
        }
    };

    /**
     * 日/夜间模式控制
     */
    this.setDayNightControl = function () {
        let h = parseInt(new Date().getHours()),head = $('head'), cookieKey = 'cnblogs_config_isNight', exp  =  4 * 3600, daySwitch;

        switch (tools.getCookie(cookieKey)) {
            case 'day':
                daySwitch = 'daySwitch'; break;
            case 'night':
                daySwitch = ''; break;
            default:
                daySwitch = window.cnblogsConfig.switchDayNight.auto.enable ?
                    (h >= window.cnblogsConfig.switchDayNight.auto.nightHour ? '' :
                            (h >= window.cnblogsConfig.switchDayNight.auto.dayHour ? 'daySwitch' : '')
                    ) : 'daySwitch'; break;
        }

        let html = '<div id="dayNightSwitch" class="generalWrapper">' +
            '    <div class="onOff '+ daySwitch +'">' +
            '        <div class="star star1"></div>' +
            '        <div class="star star2"></div>' +
            '        <div class="star star3"></div>' +
            '        <div class="star star4"></div>' +
            '        <div class="star star5"></div>' +
            '        <div class="star sky"></div>' +
            '        <div class="sunMoon">' +
            '            <div class="crater crater1"></div>' +
            '            <div class="crater crater2"></div>' +
            '            <div class="crater crater3"></div>' +
            '            <div class="cloud part1"></div>' +
            '            <div class="cloud part2"></div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
        $('body').prepend(html);

        if (!daySwitch) head.append('<link type="text/css" id="baseDarkCss" rel="stylesheet" href="'+getJsDelivrUrl('base.dark.css')+'">');

        $('#dayNightSwitch .onOff').click(function () {
            if ($(this).hasClass('daySwitch')) { // 夜间
                window.cnblogsConfig.hook.dayNightControl(bndongJs, 'night');
                tools.setCookie(cookieKey, 'night', exp);
                $(this).removeClass('daySwitch');
                head.append('<link type="text/css" id="baseDarkCss" rel="stylesheet" href="'+getJsDelivrUrl('base.dark.css')+'">');
            } else { // 日间
                window.cnblogsConfig.hook.dayNightControl(bndongJs, 'day');
                tools.setCookie(cookieKey, 'day', exp);
                $(this).addClass('daySwitch');
                $('head link#baseDarkCss').remove();
            }
        });
    };

    /**
     * 设置菜单数据
     */
    this.setMenuData = function() {

        // 添加个人信息
        function setIntroduce() {
            let introduceHtml = $('#profile_block').html(),
                menuIntroduce = $('#introduce');

            if ((typeof introduceHtml == 'string') && menuIntroduce.html() === '') {
                menuIntroduce.html(tools.htmlFiltrationScript(introduceHtml));
                bndongJs.clearIntervalTimeId(timeIds.setMenuIntroduceTId);
            }
        }

        // 添加日历
        function setCalendar() {
            let calendarTable = $('#blogCalendar'),
                calendar      = $('#blog-calendar'),
                menuCalendar  = $('#calendar-box');

            if (calendarTable.length > 0 && menuCalendar.html() === ''){
                let calendarHtml = '<div id="blog-calendar">' + calendar.html() + '</div>';
                calendar.remove();
                menuCalendar.html(calendarHtml);
                $('#blog-calendar').css('visibility', 'visible');
                bndongJs.clearIntervalTimeId(timeIds.setMenuCalendarTId);
            }
        }

        // 添加找找看
        function setSidebarSearch() {
            let sidebarSearch = $('#sidebar_search_box'),
                menuSearchBox = $('#sb-sidebarSearchBox');

            if (sidebarSearch.length > 0 && menuSearchBox.html() === ''){
                menuSearchBox.html('<div id="sb_widget_my_zzk" class="div_my_zzk"><input id="q" type="text" onkeydown="return zzk_go_enter(event);" class="input_my_zzk"></div>').prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setSidebarSearchTId);
            }
        }

        // 添加积分与排名
        function setSidebarScorerank() {
            let scorerank     = $('#sidebar_scorerank ul li'),
                menuScorerank = $('#sb-sidebarScorerank');

            if (scorerank.length > 0 && menuScorerank.html() === ''){
                menuScorerank.html(getMenuData(scorerank, 'icon-collection_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setSidebarScorerankTId);
            }
        }

        // 添加最新随笔
        function setSidebar() {
            let sidebar     = $('#sidebar_recentposts ul li'),
                menuSidebar = $('#sb-sidebarRecentposts');

            if (sidebar.length > 0 && menuSidebar.html() === ''){
                menuSidebar.html(getMenuData(sidebar, 'icon-time_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuSidebarTId);
            }
        }

        // 添加我的标签
        function setToptags() {
            let toptags     = $('#sidebar_toptags ul li'),
                menuToptags = $('#sb-toptags');

            if (toptags.length > 0 && menuToptags.html() === '') {
                menuToptags.html(getMenuData(toptags, 'icon-label_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuToptagsTId);
            }
        }

        // 添加随笔分类
        function setClassify() {
            let sbClassify   = $('#sidebar_postcategory ul li'),
                menuClassify = $('#sb-classify');

            if (sbClassify.length > 0 && menuClassify.html() === '') {
                menuClassify.html(getMenuData(sbClassify, 'icon-marketing_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuClassifyTId);
            }
        }

        // 添加文章分类
        function setArticleCategory() {
            let sbArticleCategory   = $('#sidebar_articlecategory ul li'),
                menuArticleCategory = $('#sb-ArticleCategory');

            if (sbArticleCategory.length > 0 && menuArticleCategory.html() === '') {
                menuArticleCategory.html(getMenuData(sbArticleCategory, 'icon-marketing_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuArticleCategoryTId);
            }
        }

        // 添加随笔档案
        function setRecord() {
            let sbRecord   = $('#sidebar_postarchive ul li'),
                menuRecord = $('#sb-record');

            if (sbRecord.length > 0 && menuRecord.html() === '') {
                menuRecord.html(getMenuData(sbRecord, 'icon-task_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuRecordTId);
            }
        }
        
        // 添加文章档案
        function setArticle() {
            let sbArticle   = $('#sidebar_articlearchive ul li'),
                menuArticle = $('#sb-articlearchive');

            if (sbArticle.length > 0 && menuArticle.html() === '') {
                menuArticle.html(getMenuData(sbArticle, 'icon-document_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuArticleTId);
            }
        }

        // 添加阅读排行
        function setTopview() {
            let sbTopview   = $('#TopViewPostsBlock ul li'),
                menuTopview = $('#sb-topview');

            if (sbTopview.length > 0 && menuTopview.html() === '') {
                menuTopview.html(getMenuData(sbTopview, 'icon-browse_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuTopviewTId);
            }
        }

        // 添加推荐排行
        function setTopDiggPosts() {
            let topDiggPosts     = $('#TopDiggPostsBlock ul li'),
                menuTopDiggPosts = $('#sb-topDiggPosts');

            if (topDiggPosts.length > 0 && menuTopDiggPosts.html() === '') {
                menuTopDiggPosts.html(getMenuData(topDiggPosts, 'icon-like_fill')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuTopDiggPostsTId);
            }
        }

        // 添加最新评论
        function setRecentComments() {
            let recentComments     = $('#sidebar_recentcomments ul'),
                menuRecentComments = $('#sb-recentComments');

            if (recentComments.length > 0 && menuRecentComments.html() === '') {
                menuRecentComments.html(getMenuCommentsData(recentComments, 'icon-pinglunzu')).prev('.m-list-title').show();
                bndongJs.clearIntervalTimeId(timeIds.setMenuRecentCommentsTId);
            }
        }

        // 添加自定义列表
        function setCustomData() {
            let customData = window.cnblogsConfig.menuCustomList;
            if (Object.keys(customData).length > 0) {
                $.each(customData, function (title, list) {
                    let html = '<div class="m-list-title" style="display: block;"><span>' + title + '</span></div>';
                    html += '<div class="m-icon-list"><div><ul>';
                    $.each(list.data, function (key, val) {
                        html += '<li><a href="' + val[1] + '">';
                        html += '<span class="iconfont '+ list.icon +'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>';
                        html += val[0] + '</a></li>';
                    });
                    html += '</ul></div></div>';
                    // language=JQuery-CSS
                    $('#menuCustomList').append(html);
                });
            }
        }

        function getMenuData(obj, icon) {
            let html = '<div><ul>',
                ret  = /^[1-9]+[0-9]*$/;
            obj.each(function (i) {
                let p = $(obj[i]),
                    o = p.text() === p.html() ? {} : $(p.html()),
                    textArr = $.trim(p.text()).split('.');
                if (ret.test(textArr[0])) textArr.splice(0,1);
                let text = $.trim(textArr.join('.')),
                    iconHtml = '<span class="iconfont '+icon+'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>';
                o.length > 0 && o.html(iconHtml + text);
                html += '<li>' + (o.length > 0 ?  o.prop("outerHTML") : "<a href='javascript:void(0);'>" + iconHtml + text + "</a>") + '</li>';
            });
            html += '</ul></div>';
            return html;
        }

        function getMenuCommentsData(obj, icon) {
            let html = '<div><ul>',
                ret  = /^[1-9]+[0-9]*$/,
                title, body, author;

            if (obj.find('li').length > 2) {
                title  = obj.find('li.recent_comment_title');
                body   = obj.find('li.recent_comment_body');
                author = obj.find('li.recent_comment_author');

                if (title.length !== body.length || title.length !== author.length) return ;

                title.each(function (i) {
                    let p = $(title[i]),
                        o = p.text() === p.html() ? {} : $(p.html()),
                        textArr = $.trim(p.text()).split('.');
                    if (ret.test(textArr[0])) textArr.splice(0,1);
                    let text = $.trim(textArr.join('.')),
                        iconHtml = '<span class="iconfont '+icon+'" style="color: #888;font-size: 15px;margin-right: 5px;"></span>';
                    o.length > 0 && o.html(iconHtml + text);
                    html += '<li>' + (o.length > 0 ?  o.prop("outerHTML") : "<a href='javascript:void(0);'>" + iconHtml + text + "</a>")

                        + '<div style="padding-left: 1.5em;color: #777;position: relative;top: -5px;">'
                        + $(body[i]).text()
                        + '</div>'

                        + '<div style="text-align: right;color: #444;position: relative;top: -10px;">'
                        + $(author[i]).text()
                        + '</div></li>';
                });
            }
            html += '</ul></div>';
            return html;
        }

        return {
            setIntroduce: setIntroduce,
            setCalendar: setCalendar,
            setSidebarSearch: setSidebarSearch,
            setSidebarScorerank: setSidebarScorerank,
            setSidebar: setSidebar,
            setToptags: setToptags,
            setClassify: setClassify,
            setArticleCategory: setArticleCategory,
            setArticle: setArticle,
            setRecord: setRecord,
            setTopview: setTopview,
            setTopDiggPosts: setTopDiggPosts,
            setCustomData: setCustomData,
            setRecentComments: setRecentComments
        }
    };

    /**
     * 设置菜单个人信息背景图片
     */
    this.setMenuUserInfoImg = function () {
        if (window.cnblogsConfig.menuUserInfoBgImg) {
            $('.introduce-box').css({
                'background': '#000 url('+window.cnblogsConfig.menuUserInfoBgImg+') center no-repeat',
                'background-size': '100%'
            });
        }
    };

    /**
     * 添加页脚
     */
    this.addFooter = function() {
        const footer = $('#footer'),
              lHref  = 'https://github.com/'+window.cnblogsConfig.GhUserName+'/'+window.cnblogsConfig.GhRepositories+'/tree/'+window.cnblogsConfig.CnVersions,
              rHref  = 'https://github.com/'+window.cnblogsConfig.GhUserName+'/'+window.cnblogsConfig.GhRepositories+'/tree/'+window.cnblogsConfig.GhVersions;
        let footerText = footer.text();
        footer.html('<div class="footer-box"></div>');
        let footerBox = $('.footer-box');

        // 设置标语
        if (window.cnblogsConfig.bottomText.left || window.cnblogsConfig.bottomText.right)
            footerBox.append('<div class="footer-text">[ '+window.cnblogsConfig.bottomText.left+'<span class="footer-text-icon"><span class="iconfont '+window.cnblogsConfig.bottomText.iconFont.icon+'" ' +
                'style="color: '+window.cnblogsConfig.bottomText.iconFont.color+';font-size: '+window.cnblogsConfig.bottomText.iconFont.fontSize+';"></span></span>'+window.cnblogsConfig.bottomText.right+' ]</div>');

        // 设置运行时间
        footerBox.append('<div><span id="blogRunTimeSpan"></span><span class="my-face">ღゝ◡╹)ノ♡</span></div>');
        window.setInterval( setRunTime, 500 );

        // 设置友情链接
        footerBox.append('<div id="blogrollInfo"></div>');
        setBlogroll();

        // 设置版本信息
        footerBox.append('<div>'+footerText+'</div>');

        // 设置网站统计
        footerBox.append('<div id="cnzzInfo"></div>');
        timeIds.setCnzzTId = window.setInterval( setCnzz, 1000 );

        // 设置主题信息
        footerBox.append('<div id="themeInfo"></div>');
        setTheme();

        // 设置页脚样式
        switch (parseInt(window.cnblogsConfig.footerStyle)) {
            case 1: init_t1();break;
            case 2: default: init_t2();break;
        }

        // v1.0 页脚
        function init_t1() {
            footer.prepend('<div class="footer-image"></div>').addClass('footer-t1');
        }

        // v1.1+ 页脚
        function init_t2() {
            let html = '<footer>' +
                '<footer-background>' +
                '<figure class="clouds"></figure>' +
                '<figure class="background"></figure>' +
                '<figure class="foreground"></figure>' +
                '</footer-background>' +
                '</footer>';
            footer.prepend(html);
            $('#footer .footer-text').css({
                'padding-bottom': '0',
                'border-bottom': 'none',
                'margin-bottom':  '0'
            });
        }

        // 设置运行时间
        function setRunTime() {
            let runDate = tools.getRunDate(window.cnblogsConfig.blogStartDate ? window.cnblogsConfig.blogStartDate : '2019-01-01');
            $('#blogRunTimeSpan').text('This blog has running : '+runDate.daysold+' d '+runDate.hrsold+' h '+runDate.minsold+' m '+runDate.seconds+' s');
        }

        // 设置友情链接
        function setBlogroll() {
            if (window.cnblogsConfig.bottomBlogroll.length > 0) {
                let blogrollArr  = window.cnblogsConfig.bottomBlogroll;
                let blogrollHtml = '友情链接：';
                for(let i = 0; i < blogrollArr.length; i++) {
                    blogrollHtml += '<a href="'+(blogrollArr[i][1])+'" target="_blank">'+(blogrollArr[i][0])+'</a>';
                    if (i < blogrollArr.length-1) blogrollHtml += '<span style="margin: 0 3px;">/</span>';
                }
                $('#blogrollInfo').html(blogrollHtml);
            }
        }

        // 设置网站统计，请去 CNZZ 配置自己的，谢谢！！
        function setCnzz() {
            let cnzzStat = $('.id_cnzz_stat_icon a');
            if (cnzzStat.length > 0) {
                let cnzzInfo = [];
                let cnzzArr  = $(cnzzStat[1]).text().split('|');
                $.each(cnzzArr, function (i) {
                    let str = $.trim(cnzzArr[i]);
                    if (str !== '') {
                        str = str.replace('今日','Today').replace('昨日','Yesterday').replace('[',':').replace(']','');
                        cnzzInfo.push(str)
                    }
                });
                cnzzInfo.push($(cnzzStat[2]).text().replace('当前在线','Online').replace('[',':').replace(']',''));
                $('#cnzzInfo').text(cnzzInfo.join(' | '));
                bndongJs.clearIntervalTimeId(timeIds.setCnzzTId);
            }
        }

        // 设置加载主题信息
        function setTheme() {
            $('#themeInfo').html('Theme version: <a href="'+lHref
                +'" target="_blank" style="color: #888;text-decoration: underline;">'
                +(window.cnblogsConfig.CnVersions).substring(0,7)+'</a>'
                +' / Loading theme version: <a href="'+rHref
                +'" target="_blank" style="color: #888;text-decoration: underline;">'
                +(window.cnblogsConfig.GhVersions).substring(0,7)+'</a>'
            );
        }
    };

//=================== 逻辑处理：主页处理

    /**
     * 主页初始化
     */
    this.homeInit = function() {

        // 设置主页图片
        let homeTopImg = window.cnblogsConfig.homeTopImg, bgImg;

        homeTopImg.length > 0 ?
            (homeTopImg.length > 1 ? bgImg = homeTopImg[tools.randomNum(0, homeTopImg.length - 1)] : bgImg = homeTopImg[0])
            : bgImg = "";
        $('.main-header').css({
            'background': '#222 url("'+encodeURI(bgImg)+'")  center center no-repeat',
            'background-size': 'cover'
        });

        bndongJs.setHitokoto();
        bndongJs.scrollMonitor();
        bndongJs.setDomHomePosition();
    };

    this.homeInitAfter = function () {
        bndongJs.setHomePost();
        bndongJs.setEntryPost();
        bndongJs.setPostConImg();

        // 头图点击滚动到内容位置
        $('.scroll-down').click(function () {
            let endScroll;
            endScroll = $('#home').offset().top + 10; tools.actScroll(endScroll, 1000);});

        // 设置右下角菜单
        timeIds.setHomeRightMenuTId = window.setInterval( bndongJs.addHomeRightMenu, 1000 );

        if (window.cnblogsConfig.homeTopAnimationRendered)
            require(['circleMagic'], function() {
                $('.main-header').circleMagic(window.cnblogsConfig.homeTopAnimation);
            });
    };

    /**
     * 设置主页文章信息样式
     */
    this.setHomePost = function () {
        let read = $('#main .c_b_p_desc_readmore'), titleList = $('#main .postTitle');
        read.text('阅读全文 »');
        $.each(titleList, function () {
            let title = $(this),
                titleText = title.text(),
                postDescText = title.nextAll('.postDesc:eq(0)').text();
            title.after(bndongJs.getPostMetaHtml(postDescText));
            if (/\[置顶\]/.test(titleText)) title.append('<span class="postSticky">置顶</span>');
            title.find('a').text(titleText.replace('[置顶]', ''));
        });
    };

    /**
     * 设置主页文章信息样式
     */
    this.setEntryPost = function () {
        let titleList = $('#main .entrylistPosttitle');
        $.each(titleList, function () {
            let title = $(this),
                postDescText = title.nextAll('.entrylistItemPostDesc:eq(0)').text();
            title.after(bndongJs.getPostMetaHtml(postDescText));
        });
    };

    /**
     * 设置摘要文章
     */
    this.setPostConImg = function () {
        let desc = $('.c_b_p_desc');
        $.each(desc, function (i) {
            let obj = $(this), img = obj.find('img.desc_img');
            if (img.length > 0) {
                let src = img.attr('src');
                img.hide();
                obj.css('width', '60%');
                obj.parent('div').css('min-height', '150px');
                let html = '<div class="c_b_p_desc_img"><div style="background: url(\''+ src +'\') center center / cover no-repeat rgb(34, 34, 34);"></div></div>';
                obj.after(html);
            }
        });
    };

    /**
     * 设置主页标语
     */
    this.setHitokoto = function() {


        // 判断用户是否自定义了设置
        let homeBannerText = window.cnblogsConfig.homeBannerText,
            hitokoto = $('#hitokoto');
        if ($.isArray(homeBannerText) && homeBannerText.length > 0) {

            let listIndex = tools.randomNum(0, homeBannerText.length - 1);
            hitokoto.text(homeBannerText[listIndex]).css('display', '-webkit-box');
            return true;

        } else if (typeof homeBannerText === "string" && homeBannerText !== "") {

            hitokoto.text(homeBannerText).css('display', '-webkit-box');
            bndongJs.setDomHomePosition();
            return true;
        }

        let topTitleList = [
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
        ], settings = {};

        switch (window.cnblogsConfig.homeBannerTextType) {
            case "one": //  ONE . 每日一句
                settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://sentence.iciba.com/index.php?callback=onecallback&c=dailysentence&m=getdetail&title=" + tools.getNowFormatDate(),
                    "method": "POST",
                    "dataType": 'jsonp',
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
                    if (response.errno === 0) {
                        hitokoto.text(response.note).css('display', '-webkit-box');
                        $('#hitokotoAuthor').text(response.content).show();
                    } else {
                        let listIndex = tools.randomNum(0, topTitleList.length - 1);
                        hitokoto.text(topTitleList[listIndex]).css('display', '-webkit-box');
                    }
                    bndongJs.setDomHomePosition();
                    return false;
                });
                break;

            case "jinrishici":
            default: // 今日诗词
                settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://v2.jinrishici.com/one.json",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    if (response && response.status === "success") {
                        hitokoto.text(response.data.content).css('display', '-webkit-box');
                        $('#hitokotoAuthor').text('《'+response.data.origin.title+'》 - '+response.data.origin.dynasty+' - '+response.data.origin.author).show();
                    } else {
                        let listIndex = tools.randomNum(0, topTitleList.length - 1);
                        hitokoto.text(topTitleList[listIndex]).css('display', '-webkit-box');
                    }
                    bndongJs.setDomHomePosition();
                    return false;
                });
                break;
        }
    };

    /**
     * 添加主页右下角菜单
     */
    this.addHomeRightMenu = function() {
        const rightMenu = $('#rightMenu');
        if (rightMenu.length > 0) {

            // 添加上下滚动
            let upDownHtml = '<div id="toUpDown" data="up"><span class="rightMenuSpan toUpDownSpan">返回顶部</span><div id="toUpDownI"><i class="iconfont icon-zhiding"></i></div></div>';
            rightMenu.prepend(upDownHtml);
            bndongJs.rightMenuMous('#toUpDown', '.toUpDownSpan');

            // 添加关注
            let clickStr = $('#p_b_follow').text() !== '' ? $('#p_b_follow a').attr('onclick') : '';

            let attHtml = '';
            if (!clickStr || clickStr.indexOf('unfollow') > 0) {
                attHtml = '<div id="attention" clickflg="true"><span class="rightMenuSpan attentionSpan">已关注</span><i class="iconfont icon-dianzan1"></i></div>';
            } else {
                attHtml = '<div id="attention" onclick="' + clickStr.replace('unfollow', 'follow') + '" clickflg="false"><span class="rightMenuSpan attentionSpan">关注</span><i class="iconfont icon-dianzan"></i></div>';
            }

            rightMenu.prepend(attHtml);
            bndongJs.rightMenuMous('#attention', '.attentionSpan');
            bndongJs.scrollMonitor(); // 触发一次滚动处理，防止未有对象，初始化失败
            bndongJs.clearIntervalTimeId(timeIds.setHomeRightMenuTId);
        }
    };

//=================== 逻辑处理：非主页处理

    /**
     * 非主页初始化
     */
    this.notHomeInit = function() {

        // 设置随笔标题
        const sbTitle = $('#cb_post_title_url').text();
        $('#sbTitle').text(sbTitle);
        $('.inner').css('max-width', '100vw');

        // 设置文章信息
        bndongJs.setArticleInfoAuthor();
        timeIds.blogPostCategoryTId = window.setInterval( bndongJs.setArticleInfoClass, 1000 );
        timeIds.entryTagTId         = window.setInterval( bndongJs.setArticleInfoTag, 1000 );

        bndongJs.setDomHomePosition();
    };

    this.notHomeInitAfter = function () {
        bndongJs.setNotHomeTopImg();

        // 验证是否是书单文章
        if ($('#bookListFlg').length > 0) bndongJs.setBookList();

        bndongJs.setCodeHighlighting();
        bndongJs.baguetteBox();

        // 初始化文章目录
        require(['title', 'marvin', 'articleStatement'], function() {
            timeIds.setCatalogTId = window.setInterval( bndongJs.initCatalog, 1000 );
            bndongJs.scrollMonitor();
            $('#sideCatalog-catalog').mCustomScrollbar({
                theme:"minimal-dark",
                axis:"yx"
            });
        });

        // 设置右下角菜单
        timeIds.setNotHomeRightMenuTId = window.setInterval( bndongJs.addNotHomeRightMenu, 1000 );

        bndongJs.setCommentStyle();
    };

    /**
     * 设置文章信息
     */
    this.setArticleInfoAuthor = function () {
        $('#articleInfo').append('<p class="article-info-text"></p>');
        let postDescTid = window.setInterval( function () {
            if ($('#post_view_count').text() !== '...' && $('#post_comment_count').text() !== '...') {
                let postDescText = $('.postDesc').show().text();
                $('#articleInfo p.article-info-text').html(bndongJs.getPostMetaHtml(postDescText));
                bndongJs.clearIntervalTimeId(postDescTid);
            }
        }, 1000 );
    };

    /**
     * 获取文章 post meta 信息
     * @param postDescText
     * @returns {{date: *, tnum: *, vnum: *, cnum: *}}
     */
    this.getPostMetaInfo = function (postDescText) {
        postDescText = postDescText.replace(/[\r\n]/g, '');

        let postMetaRex  = /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\(([0-9]*)\).*评论\s*\(([0-9]*)\).*推荐\s*\(([0-9]*)\).*/,
            postMetaRex2  = /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\(([0-9]*)\).*评论\s*\(([0-9]*)\).*/,
            postMetaRex3 = /.*posted\s*@\s*([0-9\-:\s]{16}).*/,
            diggCount = $('#digg_count'),
            info = postDescText.match(postMetaRex)
                || postDescText.match(postMetaRex2)
                || postDescText.match(postMetaRex3),
            date = typeof info[1] === 'undefined' ? '1970-01-01 00:00' : info[1],
            vnum = typeof info[2] === 'undefined' ? '0' : info[2],
            cnum = typeof info[3] === 'undefined' ? '0' : info[3],
            tnum = typeof info[4] === 'undefined' ?
                (diggCount.length ? diggCount.text() : '0')
                : info[4];

        return {
            date: date,
            vnum: vnum,
            cnum: cnum,
            tnum: tnum,
        };
    };

    /**
     * 获取文章 post meta html
     * @param postDescText
     * @returns {string}
     */
    this.getPostMetaHtml = function (postDescText) {
        let info = bndongJs.getPostMetaInfo(postDescText);
        let html = '<span class="postMeta"><i class="iconfont icon-time1"></i>发表于 '+info.date+'' +
            '<i class="iconfont icon-browse"></i>阅读：'+info.vnum+'' +
            '<i class="iconfont icon-interactive"></i>评论：'+info.cnum+'' +
            '<i class="iconfont icon-hot"></i>推荐：'+info.tnum+'' +
            '</span>';
        return html;
    };

    /**
     * 设置文章信息-分类
     */
    this.setArticleInfoClass = function () {
        let obj = $('#BlogPostCategory').find('a');
        if (obj.length > 0) {
            $.each(obj, function () {
                let tag = $(this);
                tag.prepend('<span class="iconfont icon-marketing_fill"></span>');
                $('#articleInfo').append('<a href="'+tag.attr('href')+'" target="_blank"><span class="article-info-tag article-tag-class-color">'+(tag.text())+'</span></a>');
            });
            bndongJs.clearIntervalTimeId(timeIds.blogPostCategoryTId);
        }
    };

    /**
     * 设置文章信息-标签
     */
    this.setArticleInfoTag = function () {
        let obj = $('#EntryTag').find('a');
        if (obj.length > 0) {
            $.each(obj, function () {
                let tag = $(this);
                tag.prepend('<span class="iconfont icon-label_fill"></span>');
                $('#articleInfo').append('<a href="'+tag.attr('href')+'" target="_blank"><span class="article-info-tag article-tag-color">'+(tag.text())+'</span></a>');
            });
            bndongJs.clearIntervalTimeId(timeIds.entryTagTId);
        }
    };

    /**
     * 初始化文章目录插件
     */
    this.initCatalog = function() {
        const sideToolbar = $('#sideToolbar');
        if (sideToolbar.length > 0) {
            sideToolbar.prepend('<span class="catalog-btn catalog-btn-shadow"><i class="iconfont icon-mulu"></i></span>').fadeIn(300);
            $('.catalog-btn').click(function () {
                let sideCatalogBg = $('.sideCatalogBg');
                if (sideCatalogBg.is(':hidden')) {
                    sideCatalogBg.fadeIn(300);
                    $(this).removeClass('catalog-btn-shadow');
                } else {
                    sideCatalogBg.fadeOut(300);
                    $(this).addClass('catalog-btn-shadow');
                }
            });
            bndongJs.resizeMonitor();
            bndongJs.clearIntervalTimeId(timeIds.setCatalogTId);
        }
    };

    /**
     * 设置非主页头图
     */
    this.setNotHomeTopImg = function() {

        let essayTopImg = window.cnblogsConfig.essayTopImg,
            bgImg;

        essayTopImg.length > 0 ?
            (essayTopImg.length > 1 ? bgImg = essayTopImg[tools.randomNum(0, essayTopImg.length - 1)] : bgImg = essayTopImg[0])
            : bgImg = "";


        $('.main-header').css({
            'height': '40vh',
            'background': '#222 url("'+encodeURI(bgImg)+'")  center center no-repeat',
            'background-size': 'cover'
        });

        $('#homeTopTitle').hide();
        $('.scroll-down').hide();
        $('#home').css('margin-top', '40vh');
        $('#cb_post_title_url').addClass('post-del-title');

        if (window.cnblogsConfig.essayTopAnimationRendered) {
            if (window.cnblogsConfig.essayTopAnimation.colorsRandom) {
                let colors = [];
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                colors.push(tools.getRandomColor());
                window.cnblogsConfig.essayTopAnimation.colors = colors;
            }
            require(['TweenMax_MyTween'], function() {
                initCanvas('notHomeTopCanvas');
                start();
            });
        }
    };

    /**
     * 设置图片灯箱效果
     */
    this.baguetteBox = function () {
        const cpb    = $('#cnblogs_post_body')
            ,imgList = $('#cnblogs_post_body img');

        if (cpb.length > 0 && imgList.length > 0) {
            $.each(imgList, function (i) {
                let tem = $(imgList[i]);
                    if (!tem.hasClass('code_img_closed') && !tem.hasClass('code_img_opened'))
                        tem.wrap('<a data-fancybox="gallery" href="'+tem.attr('src')+'"></a>');
            });
        }

        require(['fancybox']);
    };

    /**
     * 设置书单页面
     */
    this.setBookList = function () {
        if (window.cnblogsConfig.bookList.length > 0) {
            let postBody = $('#cnblogs_post_body'),
                html = '';

            $.each(window.cnblogsConfig.bookList, function (i) {
                let list = window.cnblogsConfig.bookList[i];
                html += '<h1>' + list.title + '</h1>';

                $.each(list.books, function (j) {
                    let book = list.books[j];
                    html += '<div class="books-item">' +
                        '    <span class="books-item-span">' +
                        '        <div class="_1P9uD _3D3vq">' +
                        '            <div class="_2aw_6">'+(j+1)+'</div>' +
                        '        </div>' +
                        '        <div class="_28asT">' +
                        '            <svg>' +
                        '                <image xlink:href="'+ book.cover +'" x="0" y="0" width="100%" height="100%"></image>' +
                        '            </svg>';

                    if (book.score > 0) {
                        html  += '<svg class="icon" aria-hidden="true">' +
                            '             <use xlink:href="#iconpingji-'+book.score+'"></use>' +
                            '         </svg><zc></zc>';
                    }

                    html += '        </div>' +
                        '        <div class="_34CGc">' +
                        '            <div class="_2girK">' +
                        '                <div>' +
                        '                    <div class="_1P9dH">' +
                        (book.name        ? book.name : '') +
                        '                    </div>' +
                        (book.formerNname ? '<div class="_3Oa5I"><span class="_6Y7v3">原名：</span>' + book.formerNname + '</div>' : '') +
                        (book.author      ? '<div class="_3Oa5I"><span class="_6Y7v3">作者：</span>' + book.author + '</div>' : '') +
                        (book.translator  ? '<div class="_3Oa5I"><span class="_6Y7v3">译者：</span>' + book.translator + '</div>' : '') +
                        (book.press       ? '<div class="_3Oa5I"><span class="_6Y7v3">出版社：</span>' + book.press + '</div>' : '') +
                        (book.year        ? '<div class="_3Oa5I"><span class="_6Y7v3">出版年：</span>' + book.year + '</div>' : '') +
                        '                </div>' +
                        '            </div>' +
                        '        </div>' +
                        '    </span>' +
                        '</div>';
                });
            });

            postBody.append(html);
            $.getScript('//at.alicdn.com/t/font_1975696_268p7s28tsh.js');
        }
    };

    /**
     * 设置代码
     */
    this.setCodeHighlighting = function () {
        let pre       = $('.post pre'),
            codeSpan  = $('.cnblogs_code span'),
            hltype    = window.cnblogsConfig.essayCodeHighlightingType.toLowerCase(),
            hltheme   = window.cnblogsConfig.essayCodeHighlighting.toLowerCase();

        switch (hltype) {
            case 'highlightjs':
                setCodeBefore(1);
                highlightjsCode(); break;
            case 'prettify':
                setCodeBefore(1);
                prettifyCode(); break;
            case 'cnblogs':
            default:
                setCodeBefore(2);
                cnblogsCode(); break;
        }
        setScrollbarStyle();
        setCopyBtn();
        window.cnblogsConfig.hook.afterCodeHighlighting(bndongJs);

        // 设置代码复制
        function setCopyBtn() {

            $('.cnblogs_code_toolbar').remove();

            require(['clipboard'], function () {
                pre.each(function (i) {
                    let obj = $(this), id = tools.randomString(6);
                    obj.wrap('<code-box id="' + id + '" style="position: relative;display: block;"></code-box>');
                    obj.attr('id', 'pre-' + id);

                    let html = '<button code-id="' + id + '" type="button" class="clipboard code-copay-btn" data-clipboard-action="copy" data-clipboard-target="#pre-' + id + '" aria-label="复制代码" ><i class="iconfont icon-fuzhi1"></i></button>';

                    $('#'+id).prepend(html);
                });

                $('code-box button').click(function () {
                    $(this).find('i').removeClass('icon-fuzhi1').addClass('icon-right');
                    setTimeout("$('code-box button[code-id="+$(this).attr('code-id')+"] i').removeClass('icon-right').addClass('icon-fuzhi1')", 1500);
                });

                $('code-box').on({
                    mouseover : function(){
                        $(this).find('button').css({
                            opacity: 1,
                            visibility: 'visible'
                        });
                    },
                    mouseout : function(){
                        $(this).find('button').css({
                            opacity: 0,
                            visibility: 'hidden'
                        });
                    }
                });

                new ClipboardJS('.clipboard');
            });
        }

        // 使用博客园代码样式
        function cnblogsCode() {
            codeSpan.css('background-color', '#f6f8fa');
            pre.css({
                'background-color': '#f6f8fa',
                'overflow-x': 'auto'
            });
            let codeHljs = $('code.hljs');
            codeHljs.each(function () {
                let hj = $(this);
                hj.after(hj.html());
                hj.remove();
            });
        }

        // 使用 highlightjs 代码样式
        function highlightjsCode() {
            tools.dynamicLoadingCss('https://cdn.jsdelivr.net/gh/'+(window.cnblogsConfig.GhUserName)+'/'+(window.cnblogsConfig.GhRepositories)+'@'+(window.cnblogsConfig.GhVersions)+'/src/style/highlightjs/'+hltheme+'.min.css');
            require(['highlightjs'], function() {
                let essayCodeLanguages = window.cnblogsConfig.essayCodeLanguages;
                if (essayCodeLanguages && essayCodeLanguages.length > 0) {
                    hljs.configure({
                        languages: essayCodeLanguages
                    });
                }
                $('.post pre').each(function(i, block) {
                    if ($.inArray(hltheme, [
                            'github-gist', 'googlecode', 'grayscale',
                            'idea', 'isbl-editor-light', 'qtcreator_light',
                            'tomorrow', 'vs', 'xcode', 'arduino-light',
                            'ascetic', 'color-brewer', 'lightfair'
                        ]) !== -1) pre.css('background-color', '#f6f8fa');
                    hljs.highlightBlock(block);
                });
            });
        }

        // 使用 prettify 代码样式
        function prettifyCode() {
            pre.addClass('prettyprint');
            switch (hltheme) {
                case 'prettify':
                    require(['codePrettify'], function() {
                        $('pre').css('background-color', '#f6f8fa').css('border', '0');
                    }); break;
                case 'desert':
                    require(['codeDesert']); break;
                case 'sunburst':
                    require(['codeSunburst']); break;
                case 'obsidian':
                    require(['codeObsidian']); break;
                case 'doxy':
                    require(['codeDoxy']); break;
                default: cnblogsCode(); break;
            }
        }

        function setCodeBefore(type) {
            window.cnblogsConfig.hook.beforeCodeHighlighting(bndongJs);
            let cssText = "font-family:"+ window.cnblogsConfig.essayCode.fontFamily +" !important; font-size: "+ window.cnblogsConfig.essayCode.fontSize +" !important;";

            // 代码高度限制
            if (window.cnblogsConfig.codeMaxHeight) cssText += 'max-height: 70vh;';
            pre.css('cssText', cssText);

            $.each(pre, function (i) {
                let obj = $(this), pid = 'pre-' + tools.randomString(6), codeLine, html = '';

                switch (type) {
                    case 1:
                        codeLine = obj.text().split('\n');
                        break;

                    case 2:
                        codeLine = obj.html().split('\n');
                        break;
                }
                obj.html('<code-pre class="code-pre" id="' + pid + '"></code-pre>');
                $.each(codeLine, function (j) {
                    let isEnd = j === codeLine.length - 1, fg = isEnd ? '' : '\n';
                    if (isEnd) {
                        if (codeLine[j] && codeLine[j] !== '</code>') html += '<code-line class="line-numbers-rows"></code-line>';
                    } else {
                        html += '<code-line class="line-numbers-rows"></code-line>';
                    }
                    switch (type) {
                        case 1:
                            html += tools.HTMLEncode(codeLine[j]) + fg; break;

                        case 2:
                            html += codeLine[j] + fg; break;
                    }
                });
                let codePre = $('#' + pid);
                codePre.append(html);
                window.cnblogsConfig.codeLineNumber && codePre.addClass('code-pre-line');
            });

            window.cnblogsConfig.codeLineNumber && $('.line-numbers-rows').show();
        }

        // 设置代码滚动条样式
        function setScrollbarStyle() {
            tools.dynamicLoadingCss(getJsDelivrUrl('jquery.mCustomScrollbar.css'));
            let scrollbarTimeId = window.setInterval( function () {
                if ($('.post pre span').length > 0) {
                    $('.post pre').mCustomScrollbar({
                        theme:"minimal-dark",
                        axis:"yx"
                    });
                    let color;
                    switch (hltype) {
                        case 'highlightjs':
                            color = $('.hljs-comment').css('color');
                            $('.mCSB_dragger_bar').css('background-color', color); break;
                        case 'prettify':
                            color = $('.com').css('color');
                            $('.mCSB_dragger_bar').css('background-color', color); break;
                        case 'cnblogs':
                            color = "rgb(153, 153, 153)"; break;
                    }
                    $('code-box button').css('color', color);
                    bndongJs.clearIntervalTimeId(scrollbarTimeId);
                }
            }, 500 );
        }
    };

    /**
     * 设置评论样式
     */
    this.setCommentStyle = function() {
        timeIds.commentTId = window.setInterval(function(){
            if ($('.feedbackItem').length > 0) {
                setComment();
                bndongJs.clearIntervalTimeId(timeIds.commentTId);
            }
        },1000);
        
        function setComment() {
            let feedbackItem = $('.feedbackItem');
            if (feedbackItem.length > 0) {
                $.each(feedbackItem, function (i) {
                    let obj = $(this), feedbackCon =  obj.find('.feedbackCon'), feedbackListSubtitle = obj.find('.feedbackListSubtitle'),
                        commentBody = feedbackCon.length ? feedbackCon.find('.blog_comment_body') : [], avatarHtml = '',
                        idInfo = commentBody.length ? commentBody.attr('id').split('_') : undefined;
                    if (idInfo && idInfo.length > 0) {
                        let id = idInfo[idInfo.length - 1], idTmp = id.toString().match(/[0-9]/g);
                        if ($.isArray(idTmp)) id = idTmp.join('');
                        let op = $('#comment_' + id + '_avatar'), patch  = op.length > 0 ? $.trim(op.text())
                            : 'https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/default_avatar.webp';
                        let ac = $('#a_comment_author_' + id), ah = ac.length ? ac.attr('href') : 'javascropt:void(0);';
                        avatarHtml = '<div class="feedbackAvatar"><a href="' + ah + '" target="_blank"><img src="'+patch+'"/></a></div>';
                        obj.prepend(avatarHtml);
                    }
                    if (feedbackListSubtitle.length && feedbackListSubtitle.find('.louzhu').length) {
                        feedbackListSubtitle.addClass('feedbackListSubtitle-louzhu');
                    }
                });
                $(feedbackItem[0]).css('padding-top', '0');
                $(feedbackItem[feedbackItem.length - 1]).css('padding-bottom', '0');
                let cssText = "font-family:"+ window.cnblogsConfig.essayCode.fontFamily +" !important; font-size: "+ window.cnblogsConfig.essayCode.fontSize +" !important; border-radius: 5px;padding: 10px;";
                if (window.cnblogsConfig.essayCodeHighlightingType === 'cnblogs') cssText +=  'color: #000;';
                $('head').append('<style>.feedbackCon pre {'+cssText + 'background-color: ' + $('.postBody pre').css('background-color') + ' !important;'+'}</style>');
            }
        }
    };

    /**
     * 添加非主页右下角菜单
     */
    this.addNotHomeRightMenu = function() {
        let rightMenu = $('#rightMenu');
        if (rightMenu.length > 0) {

            if ($('#toUpDown').length === 0 && $('#attention').length === 0) bndongJs.addHomeRightMenu();

            // 添加踩
            if ($('#div_digg').length > 0) {
                let rightBuryitHtml = '<div id="rightBuryit" clickflg="false" onclick="' + ($(".buryit").attr("onclick")) + '"><span class="rightMenuSpan rightBuryitSpan">' + $('#bury_count').text() + '</span><i class="iconfont icon-buzan"></i></div>';
                rightMenu.prepend(rightBuryitHtml);
                bndongJs.rightMenuMous('#rightBuryit', '.rightBuryitSpan');

                // 添加顶
                let rightDiggitHtml = '<div id="rightDiggit" clickflg="false" onclick="' + ($(".diggit").attr("onclick")) + '"><span class="rightMenuSpan rightDiggitSpan">' + $('#digg_count').text() + '</span><i class="iconfont icon-zan1"></i></div>';
                rightMenu.prepend(rightDiggitHtml);
                bndongJs.rightMenuMous('#rightDiggit', '.rightDiggitSpan');
            }

            // 添加打赏
            if (window.cnblogsConfig.reward.enable && (window.cnblogsConfig.reward.alipay || window.cnblogsConfig.reward.wechatpay)) {
                let rightDashangHtml = '<div id="rightDashang" clickflg="false"><span class="rightMenuSpan rightDanshanSpan"><div class="ds-pay">' +
                    (window.cnblogsConfig.reward.alipay ? '<div class="ds-alipay"><img src="'+window.cnblogsConfig.reward.alipay+'"><span>Alipay</span></div>' : '') +
                    (window.cnblogsConfig.reward.wechatpay ? '<div class="ds-wecat"><img src="'+window.cnblogsConfig.reward.wechatpay+'"><span>WeChat</span></div>' : '') +
                    '</div></span><i class="iconfont icon-dashang2"></i></div>';
                rightMenu.prepend(rightDashangHtml);
                bndongJs.rightMenuMous('#rightDashang', '.rightDanshanSpan');
            }
            // 添加公众号
            if (window.cnblogsConfig.weChatOfficialAccounts) {
                let rightGzhHtml = '<div id="rightGzh" clickflg="false"><span class="rightMenuSpan rightGzhSpan">' +
                    '<div class="ds-pay"><div class="ds-gzh"><img src="'+window.cnblogsConfig.weChatOfficialAccounts+'"><span>公众号</span></div></div>' +
                    '</span><i class="iconfont icon-gongzhonghaoerweima"></i></div>';
                rightMenu.prepend(rightGzhHtml);
                bndongJs.rightMenuMous('#rightGzh', '.rightGzhSpan');
            }

            bndongJs.clearIntervalTimeId(timeIds.setNotHomeRightMenuTId);
        }
    }
}