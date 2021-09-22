/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章后缀处理
 */
import suffixTemp from '../../template/articleSuffix.html';
import "../../style/articleSuffix.css";
import defaultAvatarImg from './../../images/webp/default_avatar.webp';

export default function main(_) {

    // 图片
    let imgUrl  = _.__config.articleSuffix.imgUrl ? _.__config.articleSuffix.imgUrl :
        (_.__config.info.avatar ? _.__config.info.avatar : defaultAvatarImg);

    // 本文作者 & 本文链接
    let articleAuthor = $('#articleAuthor');
    let articleSource = $('#articleSource');
    let author  = articleAuthor.length ? articleAuthor.val() : _.__config.info.name,
        source  = articleSource.length ? articleSource.val() : _.__status.url,
        homeUrl = articleSource.length ? articleSource.val() : _.__status.homeUrl,
        origin  = articleAuthor.length || articleSource.length ? '原' : '本';

    // 关于博主
    let aboutHtml = _.__config.articleSuffix.aboutHtml ? _.__config.articleSuffix.aboutHtml :
        '评论和私信会在第一时间回复。或者<a href="https://msg.cnblogs.com/msg/send/' + _.__status.user + '" target="_blank">直接私信</a>我。';

    // 版权声明
    let copyrightHtml = _.__config.articleSuffix.copyrightHtml ? _.__config.articleSuffix.copyrightHtml :
        '本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" alt="BY-NC-SA" title="BY-NC-SA" target="_blank">BY-NC-SA</a> 许可协议。转载请注明出处！';

    // 声援博主
    let supportHtml = _.__config.articleSuffix.supportHtml ? _.__config.articleSuffix.supportHtml :
        '如果您觉得文章对您有帮助，可以点击文章右下角<strong><span style="color: #ff0000; font-size: 12pt;">【<a id="post-up" onclick="votePost(' + _.__status.articleId + ',\'Digg\')" href="javascript:void(0);">推荐</a>】</span></strong>一下。';

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

    $("#cnblogs_post_body").append(suffixHtml);
}