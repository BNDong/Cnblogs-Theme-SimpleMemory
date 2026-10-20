/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 博客基础信息抓取处理
 */

export default function main() {
    let status = {};

    status.url = window.location.href.split('#')[0];
    const urlArr = status.url.split("/");

    if (urlArr[urlArr.length -1] === '') {
        urlArr.splice(urlArr.length -1, 1);
    }

    status.user      = urlArr[3];
    status.articleId = '';

    status.homeUrl = [urlArr[0], urlArr[1], urlArr[2], urlArr[3]].join("/");

    const par4 = typeof urlArr[4] !== 'undefined' ? urlArr[4] : '';
    const par5 = typeof urlArr[5] !== 'undefined' ? urlArr[5] : '';

    if (urlArr.length === 4
        && !$('#topics').length
    ) {
        status.pageType = 'home';
    } else {
        if ($('#bookListFlg').length) {
            status.pageType = 'books';
        } else if ($('#linkListFlg').length) {
            status.pageType = 'links';
        } else if (par4 === 'category') {
            status.pageType = 'category';
        } else if (par4 === 'tag') {
            status.pageType = 'tag';
        } else if (par4 && par5 && par4 === 'gallery' && par5 === 'image') {
            status.pageType = 'galleryImage';
        } else if (par4 && par5 && par4 === 'gallery' && par5 !== 'image') {
            status.pageType = 'gallery';
        } else {
            status.pageType = 'article';
        }

        let endVal = (urlArr[urlArr.length - 1]).split(".");
        status.articleId = endVal[0];
    }

    return status;
}
