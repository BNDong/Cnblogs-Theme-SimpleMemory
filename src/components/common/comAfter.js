/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 后置公共处理
 */
import progress from "../progress/progress";
import title from "../title/title";
import footer from "../footer/footer";
import rtMenu from "../rtMenu/rtMenu";
import blogIcon from "../blogIcon/blogIcon";
import dayNight from "../dayNight/dayNight";
import console from "../console/console";

export default function main(_) {

    /**
     * 页脚
     */
    (() => {
        footer(_);
    })();

    /**
     * 右下角菜单
     */
    (() => {
        rtMenu(_);
    })();

    /**
     * 日/夜模式
     */
    (() => {
        dayNight(_);
    })();

    /**
     * 进度条
     */
    (() => {
        progress(_);
    })();

    /**
     * 背景动效
     */
    (() => {
        if (_.__config.animate.background.enable) {
            import(/* webpackChunkName: "ribbonsEffect" */ '../../vendor/ribbonsEffect/ribbonsEffect').then(module => {
                new Ribbons(_.__config.animate.background.options);
            });
        }
    })();

    /**
     * 网站图标
     */
    (() => {
        blogIcon(_);
    })();

    /**
     * 页面title
     */
    (() => {
        title(_);
    })();

    /**
     * 控制台输出
     */
    (() => {
        console(_);
    })();
}