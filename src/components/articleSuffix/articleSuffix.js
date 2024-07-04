/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章后缀处理
 */
import suffixTemp from '../../template/articleSuffix.html';
import '../../style/articleSuffix.css';
import defaultAvatarImg from './../../images/webp/default_avatar.webp';

export default function main(_) {
    // 图片
    let imgUrl = _.__config.articleSuffix.imgUrl || _.__config.info.avatar || defaultAvatarImg;

    // 本文作者 & 本文链接
    let articleAuthor = $('#articleAuthor');
    let articleSource = $('#articleSource');
    let author = articleAuthor.length ? articleAuthor.val() : _.__config.info.name,
        source = articleSource.length ? articleSource.val() : _.__status.url,
        homeUrl = articleSource.length ? articleSource.val() : _.__status.homeUrl,
        origin = articleAuthor.length || articleSource.length ? '原' : '本';

    // 默认值
    const defaultAboutHtml = `评论和私信会在第一时间回复。或者<a href="https://msg.cnblogs.com/msg/send/${_.__status.user}" target="_blank">直接私信</a>我。`;
    const defaultCopyrightHtml = `本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" alt="BY-NC-SA" title="BY-NC-SA" target="_blank">BY-NC-SA</a> 许可协议。转载请注明出处！`;
    const defaultSupportHtml = `如果您觉得文章对您有帮助，可以点击文章右下角<strong><span style="color: #ff0000; font-size: 12pt;">【<a id="post-up" onclick="votePost(${_.__status.articleId},'Digg')" href="javascript:void(0);">推荐</a>】</span></strong>一下。`;
    // 关于博主
    let aboutHtml = _.__config.articleSuffix.aboutHtml || defaultAboutHtml;
    // 版权声明
    let copyrightHtml = _.__config.articleSuffix.copyrightHtml || defaultCopyrightHtml;
    // 声援博主
    let supportHtml = _.__config.articleSuffix.supportHtml || defaultSupportHtml;

    let re = [
        ['origin', origin],
        ['imgUrl', imgUrl],
        ['homeUrl', homeUrl],
        ['author', author],
        ['source', source],
        ['aboutHtml', aboutHtml],
        ['copyrightHtml', copyrightHtml],
        ['supportHtml', supportHtml],
    ];
    let suffixHtml = _.__tools.batchTempReplacement(suffixTemp, re);

    $('#cnblogs_post_body').append(suffixHtml);

    // 复制文本携带版本声明
    (() => {
        const config = _.__config.articleSuffix.copyInfo;
        const { enable, length, copyright = copyrightHtml } = config;

        if (enable) {
            const separator = '———————————————————————————————————————————————';
            const newline = '\n';
            const htmlSeparator = `<br />\n${separator}<br />\n`;

            document.body.addEventListener('copy', (event) => {
                const selection = window.getSelection().toString();
                if (selection && selection.length > length) {
                    event.preventDefault();
                    const clipboardData = event.clipboardData || window.clipboardData;

                    if (clipboardData) {
                        const cleanedCopyright = copyright.replace(/<\/?.+?>/g, '').replace(/ /g, '');
                        const htmlData = `${selection}${htmlSeparator}${copyright}<br />\n作者：${author}<br />\n原文链接：${source}<br />\n`;
                        const textData = `${selection}${newline}${separator}${newline}${cleanedCopyright}${newline}作者：${author}${newline}原文链接：${source}${newline}`;

                        clipboardData.setData('text/html', htmlData);
                        clipboardData.setData('text/plain', textData);
                    }
                }
            });
        }
    })();
}
