/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 友链页处理
 */
import comArticle from './common/comArticle';
import '../style/links.css';
import linksTemp from '../template/links.html';
import articleDirectory from '../components/articleDirectory/articleDirectory';

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
            const postBody = $('#cnblogs_post_body');
            const articleSuffixFlg = $('.articleSuffix-flg');

            // 生成友链的html
            const generateLinkHtml = (link, index) => {
                const { avatar = '', name = '', introduction = '', url = '' } = link;
                const icons = ['icon-collection_fill', 'icon-like_fill', 'icon-flashlight_fill'];
                const icon = icons[index % icons.length];
                return _.__tools.batchTempReplacement(linksTemp, [
                    ['avatar', avatar],
                    ['name', name],
                    ['introduction', introduction],
                    ['url', url],
                    ['icon', icon],
                ]);
            };

            // 生成完整的友链分类的html
            const generateSectionHtml = (data) => {
                const { title, icon, style, links } = data;
                const sectionTitle = title ? `<h1 class="simple-memory-iconfont simple-memory-${icon} iconfont ${icon}" style="${style}">${title}</h1>` : '';
                const linksHtml = links.map(generateLinkHtml).join('');
                return `${sectionTitle}<div id="links-box">${linksHtml}</div>`;
            };

            const linksHtml = _.__config.links.page.map(generateSectionHtml).join('');

            // 插入模版
            articleSuffixFlg.length ? articleSuffixFlg.before(linksHtml) : postBody.append(linksHtml);
        }
    })();

    /**
     * 设置文章目录
     */
    (() => {
        articleDirectory(_);
    })();
}
