/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 主页处理
 */
import postMeta from "../components/postMeta/postMeta";

export default function main(_) {
    /**
     * 设置主页标语
     */
    (() => {

        $('#homeTopTitle span').text(_.__config.info.name);

        // 判断用户是否自定义了设置
        let configTitle = _.__config.banner.home.title,
            hitokoto = $('#hitokoto');

        if ($.isArray(configTitle) && configTitle.length > 0) {

            let listIndex = _.__tools.randomNum(0, configTitle.length - 1);
            hitokoto.html(configTitle[listIndex]).css('display', '-webkit-box');
            _.__tools.setDomHomePosition();
            return true;

        } else if (typeof configTitle === "string" && configTitle !== "") {

            hitokoto.html(configTitle).css('display', '-webkit-box');
            _.__tools.setDomHomePosition();
            return true;
        }

        let topTitleList = [
            '每一个不曾起舞的日子，都是对生命的辜负。', '公主死去了，屠龙的少年还在燃烧', '我们听过无数的道理，却仍旧过不好这一生。',
            '生如夏花之绚烂，死如秋叶之静美。', '但凡不能杀死你的，最终都会使你更强大。','好看的皮囊千篇一律，有趣的灵魂万里挑一。',
            '青春是一本太仓促的书，我们含着泪，一读再读。', '教育就是当一个人把在学校所学全部忘光之后剩下的东西。','孤独不是一种脾性，而是一种无奈。',
            '有时候你以为天要塌下来了，其实是自己站歪了。', '温柔正确的人总是难以生存，因为这世界既不温柔，也不正确。', '死并非生的对立面，而作为生的一部分永存。',
            '不要努力成为一个成功者，要努力成为一个有价值的人。', '不要因为走得太远，忘了我们为什么出发。', '你的问题主要在于读书不多而想得太多。',
            '岁月不饶人，我亦未曾饶过岁月。', '当你凝视深渊时，深渊也在凝视着你。', '有的人25岁就死了，只是到75岁才埋葬'
        ], settings = {};

        switch (_.__config.banner.home.titleSource) {
            case "one": //  ONE . 每日一句
                settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://sentence.iciba.com/index.php?callback=onecallback&c=dailysentence&m=getdetail&title=" + _.__tools.getNowFormatDate(),
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

                $.ajax(settings).done((response) => {
                    if (response.errno === 0) {
                        hitokoto.html(response.note).css('display', '-webkit-box');
                        $('#hitokotoAuthor').text(response.content).show();
                    } else {
                        let listIndex = _.__tools.randomNum(0, topTitleList.length - 1);
                        hitokoto.html(topTitleList[listIndex]).css('display', '-webkit-box');
                    }
                    _.__tools.setDomHomePosition();
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

                $.ajax(settings).done((response) => {
                    if (response && response.status === "success") {
                        hitokoto.html(response.data.content).css('display', '-webkit-box');
                        $('#hitokotoAuthor').text('《'+response.data.origin.title+'》 - '+response.data.origin.dynasty+' - '+response.data.origin.author).show();
                    } else {
                        let listIndex = _.__tools.randomNum(0, topTitleList.length - 1);
                        hitokoto.html(topTitleList[listIndex]).css('display', '-webkit-box');
                    }
                    _.__tools.setDomHomePosition();
                    return false;
                });
                break;
        }
    })();

    /**
     * 头图点击滚动到内容位置
     */
    (() => {
        $('.scroll-down').click(function () {
            let endScroll;
            endScroll = $('#home').offset().top + 10; _.__tools.actScroll(endScroll, 500);})
    })();

    /**
     * 设置主页文章信息样式
     */
    (() => {
        let read = $('#main .c_b_p_desc_readmore'), titleList = $('#main .postTitle');
        read.text('阅读全文 »');
        $.each(titleList, (i) => {
            let title = $(titleList[i]),
                titleText = title.text(),
                postDescText = title.nextAll('.postDesc:eq(0)').text();
            title.after(postMetaHtml(postDescText));
            if (/\[置顶\]/.test(titleText)) title.append('<span class="postSticky">置顶</span>');
            title.find('a').text(titleText.replace('[置顶]', ''));
        });

        titleList = $('#main .entrylistPosttitle');
        $.each(titleList, (i) => {
            let title = $(titleList[i]),
                postDescText = title.nextAll('.entrylistItemPostDesc:eq(0)').text();
            title.after(postMetaHtml(postDescText));
        });

        function postMetaHtml(postDescText) {
            let info = postMeta(postDescText);
            return '<span class="postMeta"><i class="iconfont icon-time1"></i>发表于 ' + info.date + '' +
                '<i class="iconfont icon-browse"></i>阅读：' + info.vnum + '' +
                '<i class="iconfont icon-interactive"></i>评论：' + info.cnum + '' +
                '<i class="iconfont icon-hot"></i>推荐：' + info.tnum + '' +
                '</span>';
        }
    })();

    /**
     * 设置摘要文章
     */
    (() => {
        let desc = $('.c_b_p_desc');
        $.each(desc, (i) => {
            let obj = $(desc[i]), img = obj.find('img.desc_img');
            if (img.length > 0) {
                let src = img.attr('src');
                img.hide();
                obj.css('width', '60%');
                obj.parent('div').css('min-height', '150px');
                let html = '<div class="c_b_p_desc_img"><div style="background: url(\''+ src +'\') center center / contain no-repeat;"></div></div>';
                obj.after(html);
            }
        });
    })();

    /**
     * 主页banner动效
     */
    (() => {
        if (_.__config.animate.homeBanner.enable) {
            import(/* webpackChunkName: "circleMagic" */ '../vendor/circleMagic/circleMagic').then(module => {
                $('.main-header').circleMagic(_.__config.animate.homeBanner.options);
            });
        }
    })();
}