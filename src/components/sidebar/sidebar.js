/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 侧边栏处理
 */
import sidebarTemp from '../../template/sidebar.html';
import navTemp from '../../template/sidebarNav.html';
import '../../style/menu_bubble.css';
import main4 from './lib/main4';
import defaultAvatarImg from './../../images/webp/default_avatar.webp';
import defaultSidebarBgImg from './../../images/sidebar_bg_4.png';

export default function main(_) {

    let mainObj;

    /**
     * 设置侧边栏渲染
     */
    (() => {
        $('#sidebar_news').prepend(sidebarTemp);
        mainObj = main4();
    })();

    /**
     * 设置菜单信息
     */
    (() => {
        // ------- 设置导航 -------
        let navHtml = _.__tools.tempReplacement(navTemp, 'user', _.__status.user);
        $('.sidebar-footer').html(navHtml);

        // ------- 设置头像 -------
        let blogAvatar = _.__config.info.avatar ? _.__config.info.avatar : defaultAvatarImg;
        $('#menuBlogAvatar').append("<img class='img-responsive img-rounded' alt='用户头像' src='"+blogAvatar+"'>");

        // ------- 设置侧边栏信息 -------
        $('.sidebar-title-msg').text(_.__config.sidebar.titleMsg);
    })();

    /**
     * 设置菜单个人信息背景图片
     */
    (() => {
        let mbg = _.__config.sidebar.infoBackground ? _.__config.sidebar.infoBackground : defaultSidebarBgImg;
        $('.container .menu-wrap').css('background-image', 'url(\''+mbg+'\')');
    })();

    /**
     * 定时拉取数据
     */
    (() => {
        let timeout = 1000;

        // ------- 用户个人信息 -------
        _.__timeIds.introduceTId = window.setInterval(() => {
            let introduceHtml = $('#profile_block').html(),
                menuIntroduce = $('#introduce');
            if ((typeof introduceHtml == 'string') && menuIntroduce.html() === '') {
                menuIntroduce.html(_.__tools.htmlFiltrationScript(introduceHtml));
                _.__tools.clearIntervalTimeId(_.__timeIds.introduceTId);
            }
        }, timeout);

        // ------- 日历 -------
        _.__timeIds.calendarTId = window.setInterval(() => {
            let calendarTable = $('#blogCalendar'),
                calendar      = $('#blog-calendar'),
                menuCalendar  = $('#calendar-box');

            if (calendarTable.length > 0 && menuCalendar.html() === ''){
                let calendarHtml = '<div id="blog-calendar">' + calendar.html() + '</div>';
                calendar.remove();
                menuCalendar.html(calendarHtml).show();
                $('#blog-calendar').css('visibility', 'visible');
                _.__tools.clearIntervalTimeId(_.__timeIds.calendarTId);
            }
        }, timeout);

        // ------- 找找看 -------
        _.__timeIds.searchTId = window.setInterval(() => {
            let sidebarSearch = $('#sidebar_search_box'),
                menuSearchBox = $('#sb-sidebarSearchBox');

            if (sidebarSearch.length > 0 && menuSearchBox.html() === ''){
                menuSearchBox.prepend('<div id="sb_widget_my_zzk" class="div_my_zzk"><input id="q" type="text"  autocomplete="off" placeholder="找找看..." onkeydown="return zzk_go_enter(event);" class="input_my_zzk form-control search-menu"></div>');
                $('.sidebar-search').show();
                _.__tools.clearIntervalTimeId(_.__timeIds.searchTId);
            }
        }, timeout);

        // ------- 积分与排名 -------
        _.__timeIds.scorerankTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_scorerank ul li'),
                $('#sb-sidebarScorerank'),
                _.__timeIds.scorerankTId
            );
        }, timeout);

        // ------- 最新随笔 -------
        _.__timeIds.newEssayTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_recentposts ul li'),
                $('#sb-sidebarRecentposts'),
                _.__timeIds.newEssayTId
            );
        }, timeout);

        // ------- 我的标签 -------
        _.__timeIds.topTagsTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_toptags ul li'),
                $('#sb-toptags'),
                _.__timeIds.topTagsTId
            );
        }, timeout);

        // ------- 随笔分类 -------
        _.__timeIds.classifyTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_postcategory ul li'),
                $('#sb-classify'),
                _.__timeIds.classifyTId
            );
        }, timeout);

        // ------- 文章分类 -------
        _.__timeIds.articleCategoryTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_articlecategory ul li'),
                $('#sb-ArticleCategory'),
                _.__timeIds.articleCategoryTId
            );
        }, timeout);

        // ------- 随笔档案 -------
        _.__timeIds.recordTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_postarchive ul li'),
                $('#sb-record'),
                'icon-task_fill',
                _.__timeIds.recordTId
            );
        }, timeout);

        // ------- 文章档案 -------
        _.__timeIds.articleTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_articlearchive ul li'),
                $('#sb-articlearchive'),
                'icon-document_fill',
                _.__timeIds.articleTId
            );
        }, timeout);

        // ------- 阅读排行 -------
        _.__timeIds.topViewTId = window.setInterval(() => {
            listHdl(
                $('#TopViewPostsBlock ul li'),
                $('#sb-topview'),
                _.__timeIds.topViewTId
            );
        }, timeout);

        // ------- 推荐排行 -------
        _.__timeIds.topDiggPostsTId = window.setInterval(() => {
            listHdl(
                $('#TopDiggPostsBlock ul li'),
                $('#sb-topDiggPosts'),
                _.__timeIds.topDiggPostsTId
            );
        }, timeout);

        // ------- 最新评论 -------
        _.__timeIds.commentsTId = window.setInterval(() => {
            let recentComments     = $('#sidebar_recentcomments ul'),
                menuRecentComments = $('#sb-recentComments');

            let getMenuCommentsData = (obj) => {
                let html = '<ul>',
                    ret  = /^[1-9]+[0-9]*$/,
                    title, body, author;

                if (obj.find('li').length > 2) {
                    title  = obj.find('li.recent_comment_title');
                    body   = obj.find('li.recent_comment_body');
                    author = obj.find('li.recent_comment_author');

                    if (title.length !== body.length || title.length !== author.length) return ;

                    title.each((i) => {
                        let p = $(title[i]),
                            o = p.text() === p.html() ? {} : $(p.html()),
                            textArr = $.trim(p.text()).split('.');
                        if (ret.test(textArr[0])) textArr.splice(0,1);
                        let text = $.trim(textArr.join('.'));
                        o.length > 0 && o.html(text);
                        html += '<li>' + (o.length > 0 ?  o.prop("outerHTML") : "<a href='javascript:void(0);'>" + text + "</a>")

                            + '<div class="sb-recent_comment_body">'
                            + $(body[i]).text()
                            + '</div>'

                            + '<div class="sb-recent_comment_author">'
                            + $(author[i]).text()
                            + '</div></li>';
                    });
                }
                html += '</ul>';
                return html;
            }

            if (recentComments.length > 0 && menuRecentComments.html() === '') {
                menuRecentComments.html(getMenuCommentsData(recentComments));
                menuRecentComments.parent('.sidebar-dropdown').show();
                _.__tools.clearIntervalTimeId(_.__timeIds.commentsTId);
            }
        }, timeout);

        // ------- 自定义导航 -------
        (() => {
            let navList = _.__config.sidebar.navList;
            let navHtml = '';
            if (navList.length > 0) {
                navHtml = '<ul>';
                $.each(navList, function (i) {
                    let iconClass = navList[i].length > 2 ? navList[i][2] : "icon-qianzishenhe";
                    navHtml += '<li><a href="'+(navList[i][1])+'" class="sidebar-dropdown-box" target="_blank"><i class="iconfont '+iconClass+'"></i>'+(navList[i][0])+'</a></li>';
                });
                navHtml += '</ul>';
                $('.customize-nav').append(navHtml).show();
            }
        })();

        // ------- 自定义列表 -------
        (() => {
            let customData = _.__config.sidebar.customList;
            if (Object.keys(customData).length > 0) {
                $.each(customData, (title, list) => {
                    let html = '<li class="ng-star-inserted sidebar-dropdown">';
                    html += '<a href="javascript:void(0)" class="ng-star-inserted sidebar-dropdown-box">';
                    html += '   <i class="iconfont '+ list.icon +'"></i>';
                    html += '   <span class="sidebar-dropdown-title">'+ title +'</span>';
                    html += '</a>';
                    html += '<div class="sidebar-submenu"><ul>';

                    $.each(list.data, (key, val) => {
                        html += '<li><a href="' + val[1] + '" target="_blank">';
                        html += val[0] + '</a></li>';
                    });

                    html += '</ul></div>';
                    html += '</li>';

                    $('#customize-sidebar-menu ul').append(html);
                });
                $('#customize-sidebar-menu').show();
                $('#customize-sidebar-menu .sidebar-dropdown').show();
            }
        })();

        // ------- 公共函数 -------
        function listHdl(old, nld, tid) {
            if (old.length > 0 && nld.html() === '') {
                nld.html(getMenuData(old));
                nld.parent('.sidebar-dropdown').show();
                _.__tools.clearIntervalTimeId(tid);
            }
        }

        function getMenuData(obj) {
            let html = '<ul>',
                ret  = /^[1-9]+[0-9]*$/;
            obj.each((i) => {
                let p = $(obj[i]),
                    o = p.text() === p.html() ? {} : $(p.html()),
                    textArr = $.trim(p.text()).split('.');
                if (ret.test(textArr[0])) textArr.splice(0,1);
                let text = $.trim(textArr.join('.'));
                o.length > 0 && o.html(text);
                html += '<li>' + (o.length > 0 ?  o.prop("outerHTML") : '<a href="javascript:void(0);">' + text + '</a>' ) + '</li>';
            });
            html += '</ul>';
            return html;
        }
    })();

    /**
     * 设置菜单展开收缩
     */
    (() => {
        $('.sidebar-menu a.sidebar-dropdown-box').on('click', function () {
           let obj  = $(this);
           let pObj = obj.parent('li.sidebar-dropdown');
           let lObj = pObj.find('.sidebar-submenu');
           if (lObj.length > 0) {
               if (pObj.hasClass('active')) {
                   // 收起
                   pObj.removeClass('active');
                   lObj.slideUp(300);
               } else {
                   // 展开
                   pObj.addClass('active');
                   lObj.slideDown(300);
               }
               setTimeout(function () {
                   if (mainObj && typeof mainObj.myOptiscrollInstance !== 'undefined') {
                       mainObj.myOptiscrollInstance.update();
                   }
               }, 300);
           }
        });
    })();

    /**
     * 窗口大小变化处理
     */
    (() => {
        _.__event.resize.handle.push(() => {
            setTimeout(function () {
                if ($('body').hasClass('show-menu') && mainObj && typeof mainObj.myOptiscrollInstance !== 'undefined') {
                    mainObj.myOptiscrollInstance.update();
                }
            }, 300);
        });
    })();
}