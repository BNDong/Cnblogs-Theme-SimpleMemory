/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章信息处理
 */
import postMeta from "../../components/postMeta/postMeta";
import consoleText from "../../vendor/consoleText/consoleText";

export default function main(_) {

    /**
     * 设置文章标题
     */
    (() => {
        const sbTitle = $('#cb_post_title_url').text();
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();

    /**
     * 设置文章信息
     */
    (() => {
        $('#articleInfo').append('<p class="article-info-text"></p>');
        _.__timeIds.postDescTid = window.setInterval( () => {
            if ($('#post_view_count').text() !== '...' && $('#post_comment_count').text() !== '...') {
                let postDescText = $('.postDesc').show().text();
                $('#articleInfo p.article-info-text').html(postMetaHtml(postDescText));
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.postDescTid);
            }
        }, 1000 );

        function postMetaHtml(postDescText) {
            let info = postMeta(postDescText);
            let textNum = $('#cnblogs_post_body').text().length;

            return '<span class="postMeta"><i class="iconfont icon-time1"></i>' + info.date.replace(/-/g,"/").substr(2) + '' +
                '<i class="iconfont icon-browse"></i>' + info.vnum + '' +
                '<i class="iconfont icon-interactive"></i>' + info.cnum + '' +
                '<i class="iconfont icon-hot"></i>' + info.tnum + '' +
                '<br><i class="iconfont icon-wenzi4"></i>' + textNum + '' +
                '<i class="iconfont icon-shangwutubiao-"></i>' + _.__tools.minToTime(textNum / 500) + ' ~ ' + _.__tools.minToTime(textNum / 300) +
                '</span>';
        }
    })();

    /**
     * 设置文章信息-分类
     */
    (() => {
        _.__timeIds.articleInfoClassTId = window.setInterval(() => {
            let obj = $('#BlogPostCategory').find('a');
            if (obj.length > 0) {
                $.each(obj, (i) => {
                    let tag = $(obj[i]);
                    tag.prepend('<span class="iconfont icon-marketing_fill"></span>');
                    $('#articleInfo').append('<a href="'+tag.attr('href')+'" target="_blank"><span class="article-info-tag article-tag-class-color">'+(tag.text())+'</span></a>');
                });
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoClassTId);
            }
        }, 1000);
    })();

    /**
     * 设置文章信息-标签
     */
    (() => {
        _.__timeIds.articleInfoTagTId = window.setInterval(() => {
            let obj = $('#EntryTag').find('a');
            if (obj.length > 0) {
                $.each(obj, (i) => {
                    let tag = $(obj[i]);
                    tag.prepend('<span class="iconfont icon-label_fill"></span>');
                    $('#articleInfo').append('<a href="'+tag.attr('href')+'" target="_blank"><span class="article-info-tag article-tag-color">'+(tag.text())+'</span></a>');
                });
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoTagTId);
            }
        }, 1000);
    })();

}