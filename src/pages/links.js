/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 友链页处理
 */
import comArticle from "./common/comArticle";
import '../style/links.css';
import linksTemp from '../template/links.html';

export default function main(_) {

    /**
     * 文章页公共处理
     */
    (() => {
        comArticle(_);
    })();

    /**
     * 添加友链
     */
    (() => {
        if (_.__config.links.page.length) {
            let postBody = $('#cnblogs_post_body'),
                html = '';

            html += '<div id="links-box">';

            $.each(_.__config.links.page, function (i) {
                let data = _.__config.links.page[i];

                // 处理模版
                html += _.__tools.batchTempReplacement(linksTemp, [
                    ['avatar', typeof data.avatar !== 'undefined' ? data.avatar : ''],
                    ['name', typeof data.name !== 'undefined' ? data.name : ''],
                    ['introduction', typeof data.introduction !== 'undefined' ? data.introduction : ''],
                    ['url', typeof data.url !== 'undefined' ? data.url : ''],
                    ['icon', i % 3 === 0 ? 'icon-zhifeiji': (i % 3 === 1 ? 'icon-like_fill' : 'icon-flashlight_fill')]
                ]);
            });

            html += '</div>';

            // 插入模版
            let articleSuffixFlg = $('.articleSuffix-flg');
            articleSuffixFlg.length ? articleSuffixFlg.before(html) : postBody.append(html);
        }
    })();
}