/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 前置公共处理
 */
import loading from "../loading/loading";
import sidebar from "../sidebar/sidebar";
import banner from "../banner/banner";
import event from "../event/event";
import "../../images/webp/rss.webp";
import "../../style/asset.css";
import "../../vendor/rotate/jquery.rotate.min"

export default function main(_) {

    // 默认字体图标库
    import(/* webpackChunkName: "fonticon" */ '../../style/fonticon.css');

    // 谷歌字体
    import(/* webpackChunkName: "google-fonts" */ '../../style/google-fonts.css');

    let loadingObj = loading(_);

    /**
     * 开启 loading
     */
    (() => {
        loadingObj.start();
    })();

    /**
     * 定时清除全部计时器
     */
    (() => {
        setTimeout(() => {
            $.each(_.__timeIds, (e) => {
                null != _.__timeIds[e] && window.clearInterval(_.__timeIds[e]);
            });
        }, 30000);
    })();

    /**
     * 事件绑定
     */
    (() => {
        event(_).init();
    })();

    /**
     * 侧边栏
     */
    (() => {
        sidebar(_);
    })();

    /**
     * 头图
     */
    (() => {
        banner(_);
    })();

    /**
     * 添加扩展字体图标库
     */
    (() => {
        if (_.__config.fontIconExtend !== '') _.__tools.dynamicLoadingCss(_.__config.fontIconExtend);
    })();

    /**
     * 关闭 loading
     */
    (() => {
        loadingObj.stop();
    })();
}