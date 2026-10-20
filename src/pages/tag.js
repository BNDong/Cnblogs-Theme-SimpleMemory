/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 分类页处理
 */
import consoleText from "../vendor/consoleText/consoleText";

export default function main(_) {

    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../style/nhBannerAnimation.css');
    })();

    (() => {
        let sbTitle = $('.PostListTitle').text().trim();
        
        if (sbTitle && sbTitle.includes('当前标签：')) {
            sbTitle = sbTitle.replace('当前标签：', '').trim();
        }
        
        if (!sbTitle) {
            sbTitle = '标签页面';
        }
        
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();
}