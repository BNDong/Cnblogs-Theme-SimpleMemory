/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 分类页处理
 */
import consoleText from "../vendor/consoleText/consoleText";
import { setPostMeta, setPostDescriptions } from "../components/postList/postList";

export default function main(_) {

    /**
     * 设置文章banner动效
     */
    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../style/nhBannerAnimation.css');
    })();

    /**
     * 设置分类标题
     */
    (() => {
        // 从分类页面的HTML结构中提取分类标题
        let sbTitle = $('.entrylistTitle .category-crumb-item').text().trim() || '分类页面';
        
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();

    /**
     * 设置主页文章信息样式
     */
    setPostMeta();

    /**
     * 设置摘要文章
     */
    setPostDescriptions();
}
