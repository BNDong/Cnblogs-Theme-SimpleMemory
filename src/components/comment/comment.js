/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 评论处理
 */
import { getCommentNode, findCommentNode, isCommentRequest } from '../../platform/cnblogs/comment';
import resources from '../../core/resources';
import defaultAvatarImg from './../../images/webp/default_avatar.webp';

export default function main(_) {
    let avatarAnimate = () => {
        if (_.__config.animate.avatar.enable) {
            let authorAvatar = getCommentNode('authorAvatars');
            let feedbackAvatar = $('.feedbackAvatar img');

            if (!authorAvatar.hasClass('img-rounded')) {
                authorAvatar.addClass('img-rounded').css('border-radius', '50%');
            }

            if (!feedbackAvatar.hasClass('img-rounded')) {
                feedbackAvatar.addClass('img-rounded').css('border-radius', '50%');
            }
        }
    };

    if (_.__config.animate.typing.enable) {
        const POWERMODE = require('./commentTyping/commentTyping');
        POWERMODE.colorful = _.__config.animate.typing.options.colorful;
        POWERMODE.shake = _.__config.animate.typing.options.shake;
        resources(_).on(document.body, 'input', POWERMODE);
    }

    let setComment = () => {
        let feedbackItem = getCommentNode('items');
        if (feedbackItem.length > 0) {
            $.each(feedbackItem, (i) => {
                let obj = $(feedbackItem[i]),
                    feedbackCon = findCommentNode(obj, 'content'),
                    feedbackListSubtitle = findCommentNode(obj, 'subtitle'),
                    commentBody = feedbackCon.length ? findCommentNode(feedbackCon, 'body') : [],
                    avatarHtml = '',
                    idInfo = commentBody.length ? commentBody.attr('id').split('_') : undefined;

                if (idInfo && idInfo.length > 0) {
                    let id = idInfo[idInfo.length - 1],
                        idTmp = id.toString().match(/[0-9]/g);

                    if ($.isArray(idTmp)) id = idTmp.join('');

                    let op = getCommentNode('avatar', id),
                        patch = op.length > 0 ? $.trim(op.text()) : defaultAvatarImg;

                    let ac = getCommentNode('author', id),
                        ah = ac.length ? ac.attr('href') : 'javascropt:void(0);';

                    avatarHtml =
                        '<div class="feedbackAvatar"><a href="' +
                        ah +
                        '" target="_blank"><img src="' +
                        patch +
                        '"/></a></div>';
                    obj.prepend(avatarHtml);
                }

                if (feedbackListSubtitle.length && findCommentNode(feedbackListSubtitle, 'owner').length) {
                    feedbackListSubtitle.addClass('feedbackListSubtitle-louzhu');
                }
            });
            $(feedbackItem[0]).css('padding-top', '0');
            $(feedbackItem[feedbackItem.length - 1]).css('padding-bottom', '0');

            avatarAnimate();
        }
    };

    let addComment = () => {
        let userBlogAddress = getCommentNode('postedAuthor').attr('href'),
            userName = getCommentNode('postedAuthor').text(),
            commentInfo = getCommentNode('postedText').text();

        let comment = `<div class="feedbackItem" style="padding-bottom: 0px;">
                        <div class="feedbackAvatar">
                            <a href="${userBlogAddress}" target="_blank">
                                <img src="${defaultAvatarImg}">
                            </a>
                        </div>
                        <div class="feedbackListSubtitle ${window.isBlogOwner && 'feedbackListSubtitle-louzhu'}">
                            ${window.isBlogOwner && `[<span class="louzhu">楼主</span>]`}
                            <span class="comment_date">${new Date().toLocaleString().replace(/\//g, '-')}</span>
                            <a id="a_comment_author_5168811" href="${userBlogAddress}" target="_blank">${userName}</a>
                        </div>
                        <div class="feedbackCon">
                            <div id="comment_body_5168811" data-format-type="Markdown" class="blog_comment_body cnblogs-markdown">
                                <p>${commentInfo}</p>
                            </div>
                        </div>
                    </div>`;

        getCommentNode('placeholder').append(comment);
        getCommentNode('posted').remove();

        avatarAnimate();
    };

    _.__timeIds.commentTId = resources(_).interval(() => {
        if (getCommentNode('items').length > 0) {
            setComment();
            _.__tools.clearIntervalTimeId(_.__timeIds.commentTId);
        }
    }, 1000);

    resources(_).onJQuery($(document), 'ajaxSuccess', function (event, xhr, settings) {
        if (isCommentRequest(settings.url, 'list')) {
            _.__tools.clearIntervalTimeId(_.__timeIds.commentTId);
            setComment();
        }

        if (isCommentRequest(settings.url, 'add')) addComment();

        if (isCommentRequest(settings.url, 'remove')) {
            let commentId = JSON.parse(settings?.data)?.commentId;
            getCommentNode('body', commentId).parent().parent().remove();
            getCommentNode('lastItem').css('padding-bottom', '0');
        }

        avatarAnimate();
    });
}
