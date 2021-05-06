/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 评论处理
 */
import defaultAvatarImg from './../../images/webp/default_avatar.webp';

export default function main(_) {
    let setComment = () => {
        let feedbackItem = $('.feedbackItem');
        if (feedbackItem.length > 0) {
            $.each(feedbackItem, (i) => {
                let obj = $(feedbackItem[i]),
                    feedbackCon = obj.find('.feedbackCon'),
                    feedbackListSubtitle = obj.find('.feedbackListSubtitle'),
                    commentBody = feedbackCon.length ? feedbackCon.find('.blog_comment_body') : [],
                    avatarHtml = '',
                    idInfo = commentBody.length ? commentBody.attr('id').split('_') : undefined;

                if (idInfo && idInfo.length > 0) {
                    let id = idInfo[idInfo.length - 1],
                        idTmp = id.toString().match(/[0-9]/g);

                    if ($.isArray(idTmp)) id = idTmp.join('');

                    let op = $('#comment_' + id + '_avatar'), patch  = op.length > 0 ? $.trim(op.text())
                        : defaultAvatarImg;

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
        }
    }
    _.__timeIds.commentTId = window.setInterval(() =>{
        if ($('.feedbackItem').length > 0) {
            setComment();
            _.__tools.clearIntervalTimeId(_.__timeIds.commentTId);
        }
    },1000);
}