/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 相册页公共处理部分
 */
import consoleText from "../../vendor/consoleText/consoleText";

export default function main(_) {

    /**
     * 设置文章banner动效
     */
    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../../style/nhBannerAnimation.css');
    })();

    /**
     * 设置相册标题
     */
    (() => {
        const sbTitle = $('#mainContent .thumbTitle').text();
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();

}