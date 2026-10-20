/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 分类页处理
 */
import consoleText from "../vendor/consoleText/consoleText";

export default function main(_) {

    /**
     * 设置文章banner动效
     */
    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../style/nhBannerAnimation.css');
    })();

    /**
     * 设置标签标题
     */
    (() => {
        // 从标签页面的HTML结构中提取标签标题
        let sbTitle = $('.PostListTitle').text().trim();
        
        // 提取"当前标签："后面的标签名称
        if (sbTitle && sbTitle.includes('当前标签：')) {
            sbTitle = sbTitle.replace('当前标签：', '').trim();
        }
        
        // 如果没有找到标签标题，使用默认标题
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