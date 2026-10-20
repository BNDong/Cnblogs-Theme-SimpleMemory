/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章列表公共处理
 */
import postMeta from '../postMeta/postMeta';
import { getPostReadMore, getPostTitles, getEntryTitles, getPostDescriptions } from '../../platform/cnblogs/dom';
import { escapeHtml } from '../../utils/html';

/**
 * 设置主页文章信息样式
 */
export function setPostMeta() {
    let read = getPostReadMore(), titleList = getPostTitles();
    read.text('阅读全文 »');
    $.each(titleList, (i) => {
        let title = $(titleList[i]),
            titleText = title.text(),
            postDescText = title.nextAll('.postDesc:eq(0)').text();
        title.after(postMetaHtml(postDescText));
        if (/\[置顶\]/.test(titleText)) title.append('<span class="postSticky">置顶</span>');
        title.find('a').text(titleText.replace('[置顶]', ''));
    });

    titleList = getEntryTitles();
    $.each(titleList, (i) => {
        let title = $(titleList[i]),
            postDescText = title.nextAll('.entrylistItemPostDesc:eq(0)').text();
        title.after(postMetaHtml(postDescText));
    });

    function postMetaHtml(postDescText) {
        const { date, vnum, cnum, tnum } = postMeta(postDescText);
        return `<span class="postMeta">
                <i class="simple-memory-iconfont simple-memory-icon-time1"></i>发表于 ${escapeHtml(date)}
                <i class="simple-memory-iconfont simple-memory-icon-browse"></i>阅读：${escapeHtml(vnum)}
                <i class="simple-memory-iconfont simple-memory-icon-interactive"></i>评论：${escapeHtml(cnum)}
                <i class="simple-memory-iconfont simple-memory-icon-hot"></i>推荐：${escapeHtml(tnum)}
            </span>`;
    }
}

/**
 * 设置摘要文章
 */
export function setPostDescriptions() {
    let desc = getPostDescriptions();
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
}
