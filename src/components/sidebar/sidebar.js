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
import meTopBg from './../../images/webp/me_top_bg.webp';

export default function main(_) {

    /**
     * 设置侧边栏渲染
     */
    (() => {
        $('#sidebar_news').prepend(sidebarTemp);
        main4();
    })();

    /**
     * 设置菜单信息
     */
    (() => {
        // ------- 设置导航 -------
        let navHtml = _.__tools.tempReplacement(navTemp, 'user', _.__status.user);
        let navList = _.__config.sidebar.navList;
        if (navList.length > 0) {
            $.each(navList, function (i) {
                let iconClass = navList[i].length > 2 ? navList[i][2] : "icon-qianzishenhe";
                navHtml += '<li><a href="'+(navList[i][1])+'" target="_blank"><i class="iconfont '+iconClass+'"></i>'+(navList[i][0])+'</a></li>';
            });
        }
        $('#m-nav-list').append(navHtml);

        // ------- 设置头像 -------
        let blogAvatar = _.__config.info.avatar ? _.__config.info.avatar : defaultAvatarImg;
        $('#menuBlogAvatar').append("<img src='"+blogAvatar+"'>");
    })();

    /**
     * 设置菜单个人信息背景图片
     */
    (() => {
        let mbg = _.__config.sidebar.infoBackground ? _.__config.sidebar.infoBackground : meTopBg;
        $('.introduce-box').css({
            'background': '#000 url(\'' + mbg + '\') center no-repeat',
            'background-size': '100%'
        });
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
                menuCalendar.html(calendarHtml);
                $('#blog-calendar').css('visibility', 'visible');
                _.__tools.clearIntervalTimeId(_.__timeIds.calendarTId);
            }
        }, timeout);

        // ------- 找找看 -------
        _.__timeIds.searchTId = window.setInterval(() => {
            let sidebarSearch = $('#sidebar_search_box'),
                menuSearchBox = $('#sb-sidebarSearchBox');

            if (sidebarSearch.length > 0 && menuSearchBox.html() === ''){
                menuSearchBox.html('<div id="sb_widget_my_zzk" class="div_my_zzk"><input id="q" type="text" onkeydown="return zzk_go_enter(event);" class="input_my_zzk"></div>').prev('.m-list-title').show();
                _.__tools.clearIntervalTimeId(_.__timeIds.searchTId);
            }
        }, timeout);

        // ------- 积分与排名 -------
        _.__timeIds.scorerankTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_scorerank ul li'),
                $('#sb-sidebarScorerank'),
                'icon-collection_fill',
                _.__timeIds.scorerankTId
            );
        }, timeout);

        // ------- 最新随笔 -------
        _.__timeIds.newEssayTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_recentposts ul li'),
                $('#sb-sidebarRecentposts'),
                'icon-time_fill',
                _.__timeIds.newEssayTId
            );
        }, timeout);

        // ------- 我的标签 -------
        _.__timeIds.topTagsTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_toptags ul li'),
                $('#sb-toptags'),
                'icon-label_fill',
                _.__timeIds.topTagsTId
            );
        }, timeout);

        // ------- 随笔分类 -------
        _.__timeIds.classifyTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_postcategory ul li'),
                $('#sb-classify'),
                'icon-marketing_fill',
                _.__timeIds.classifyTId
            );
        }, timeout);

        // ------- 文章分类 -------
        _.__timeIds.articleCategoryTId = window.setInterval(() => {
            listHdl(
                $('#sidebar_articlecategory ul li'),
                $('#sb-ArticleCategory'),
                'icon-marketing_fill',
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
                'icon-browse_fill',
                _.__timeIds.topViewTId
            );
        }, timeout);

        // ------- 推荐排行 -------
        _.__timeIds.topDiggPostsTId = window.setInterval(() => {
            listHdl(
                $('#TopDiggPostsBlock ul li'),
                $('#sb-topDiggPosts'),
                'icon-like_fill',
                _.__timeIds.topDiggPostsTId
            );
        }, timeout);

        // ------- 最新评论 -------
        _.__timeIds.commentsTId = window.setInterval(() => {
            let recentComments     = $('#sidebar_recentcomments ul'),
                menuRecentComments = $('#sb-recentComments');

            let getMenuCommentsData = (obj, icon) => {
                let html = '<div><ul>',
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

            if (recentComments.length > 0 && menuRecentComments.html() === '') {
                menuRecentComments.html(getMenuCommentsData(recentComments, 'icon-pinglunzu')).prev('.m-list-title').show();
                _.__tools.clearIntervalTimeId(_.__timeIds.commentsTId);
            }
        }, timeout);

        // ------- 自定义列表 -------
        (() => {
            let customData = _.__config.sidebar.customList;
            if (Object.keys(customData).length > 0) {
                $.each(customData, (title, list) => {
                    let html = '<div class="m-list-title" style="display: block;"><span>' + title + '<span class="iconfont icon-select m-list-title-select"></span></span></div>';
                    html += '<div class="m-icon-list"><div><ul>';
                    $.each(list.data, (key, val) => {
                        html += '<li><a href="' + val[1] + '">';
                        html += '<span class="iconfont '+ list.icon +'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>';
                        html += val[0] + '</a></li>';
                    });
                    html += '</ul></div></div>';
                    // language=JQuery-CSS
                    $('#menuCustomList').append(html);
                });
            }
        })();

        // ------- 公共函数 -------
        function listHdl(old, nld, icon, tid) {
            if (old.length > 0 && nld.html() === '') {
                nld.html(getMenuData(old, icon)).prev('.m-list-title').show();
                _.__tools.clearIntervalTimeId(tid);
            }
        }

        function getMenuData(obj, icon) {
            let html = '<div><ul>',
                ret  = /^[1-9]+[0-9]*$/;
            obj.each((i) => {
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
    })();

    /**
     * 设置菜单展开收缩
     */
    (() => {
        $('.m-list-title-select').click(function () { $(this).parents('.m-list-title').next('.m-icon-list').slideToggle(350) });
    })();
}