/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章信息处理
 */
import { getArticleNode, getArticleSelector } from '../../platform/cnblogs/article';
import resources from '../../core/resources';
import postMeta from "../../components/postMeta/postMeta";
import consoleText from "../../vendor/consoleText/consoleText";

export default function main(_) {

    (() => {
        const sbTitle = getArticleNode('title').text();
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();

    (() => {
        $('#articleInfo').append('<p class="article-info-text"></p>');
        _.__timeIds.postDescTid = resources(_).interval( () => {
            if (getArticleNode('views').text() !== '...' && getArticleNode('comments').text() !== '...') {
                let postDescText = getArticleNode('description').show().text();
                $('#articleInfo p.article-info-text').html(postMetaHtml(postDescText));
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.postDescTid);
            }
        }, 1000 );

        function postMetaHtml(postDescText) {
            const { date, vnum, cnum, tnum } = postMeta(postDescText);
            let textNum = getArticleNode('body').text().length;

            return `<span class="postMeta">
            <i class="simple-memory-iconfont simple-memory-icon-time1"></i>${date}
            <i class="simple-memory-iconfont simple-memory-icon-browse"></i>${vnum}
            <i class="simple-memory-iconfont simple-memory-icon-interactive"></i>${cnum}
            <i class="simple-memory-iconfont simple-memory-icon-hot"></i>${tnum}<br>
            <i class="simple-memory-iconfont simple-memory-icon-wenzi4"></i>${textNum}
            <i class="simple-memory-iconfont simple-memory-icon-shangwutubiao-"></i>${_.__tools.minToTime(textNum / 500)} ~ ${_.__tools.minToTime(textNum / 300)}</span>`;
        }
    })();

    (() => {
        _.__timeIds.articleInfoClassTId = resources(_).interval(() => {
            let obj = getArticleNode('categories').find('a');
            if (obj.length > 0) {
                _.__tools.htmlReplace(getArticleSelector('categories'), /,/g, '')
                _.__tools.articleInfo(obj, 1)
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoClassTId);
            }
        }, 1000);
    })();

    (() => {
        _.__timeIds.articleInfoTagTId = resources(_).interval(() => {
            let obj = getArticleNode('tags').find('a');
            if (obj.length > 0) {
                _.__tools.htmlReplace(getArticleSelector('tags'), /,/g, '')
                _.__tools.articleInfo(obj, 2)
                _.__tools.setDomHomePosition();
                _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoTagTId);
            }
        }, 1000);
    })();

    (() => {
        getArticleNode('paragraphs').html((i, c) => {
            if (/^\?&gt;/.test(c)) return '<p class="tip">' + c.slice(5).trim() + '</p>'
            if (/^!&gt;/.test(c)) return '<p class="warn">' + c.slice(5).trim() + '</p>'
        })
    })();

    (() => {
        let titleInfo = getArticleNode('body').find(':header')
        if (_.__config.articleContent.prefixIcon.enable && titleInfo.length > 0) {
            _.__tools.dynamicLoadingJs(_.__config.articleContent.prefixIcon.options.link).then(r => {
                let iconfonts = _.__config.articleContent.prefixIcon.options.iconfontArr
                titleInfo.html((i, c) => {
                    let arr = []
                    let num = Math.floor(Math.random() * (iconfonts.length - i) + i)
                    let h = parseInt(titleInfo[i].tagName.replace(/H/g, ''));
                    if (arr.indexOf(num) === -1 && h !== 6) {
                        arr.push(num)
                        $('<svg class="simple-memory-symbol"> <use xlink:href="#icon-' + iconfonts[num] + '"></use></svg>').prependTo(titleInfo[i])
                    } else {
                        i--
                    }
                })
            }).catch(e => console.error('iconfont.js', e))
        }
    })()

}
