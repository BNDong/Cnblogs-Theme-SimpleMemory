/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 博客基础信息抓取处理
 */

export default function main() {
    let status = {};

    // 提取url信息
    status.url = window.location.href;
    const urlArr = status.url.split("/");

    if (urlArr[urlArr.length -1] === '') {
        urlArr.splice(urlArr.length -1, 1);
    }

    status.user      = urlArr[3]; // 当前用户
    status.articleId = ''; // 文章ID

    // 主页链接
    status.homeUrl = [urlArr[0], urlArr[1], urlArr[2], urlArr[3]].join("/");

    const par4 = typeof urlArr[4] !== 'undefined' ? urlArr[4] : '';
    const par5 = typeof urlArr[5] !== 'undefined' ? urlArr[5] : '';

    // 判断当前页面类型
    if (urlArr.length === 4
        && !$('#topics').length
    ) {
        status.pageType = 'home'; // 当前页面为主页
    } else {
        if ($('#bookListFlg').length) {
            status.pageType = 'books'; // 当前页面为书单页
        } else if ($('#linkListFlg').length) {
            status.pageType = 'links'; // 当前页面为友链页
        } else if (par4 && par5 && par4 === 'gallery' && par5 === 'image') {
            status.pageType = 'galleryImage'; // 当前页面为相册图片详情页
        } else if (par4 && par5 && par4 === 'gallery' && par5 !== 'image') {
            status.pageType = 'gallery'; // 当前页面为相册页
        } else {
            status.pageType = 'article'; // 当前页面为文章页
        }

        // 提取文章id
        let endVal = (urlArr[urlArr.length - 1]).split(".");
        status.articleId = endVal[0];
    }

    return status;
}