/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 前置公共处理
 */
import resources from '../../core/resources';
import loading from '../loading/loading';
import sidebar from '../sidebar/sidebar';
import banner from '../banner/banner';
import event from '../event/event';
import '../../images/webp/rss.webp';
import '../../style/asset.css';
import '../../vendor/rotate/jquery.rotate.min';
import { clearIntervalTimeId } from '../../core/resources';
import loadFonts from '../fonts/fonts';

export default function main(_) {
    import(/* webpackChunkName: "fonticon" */ '../../style/fonticon.css');

    loadFonts(_);

    const today = _.__tools.getFormattedDate();
    if (today === '12-13' || _.__config.memorialDays.includes(today)) $('html').css('filter', 'grayscale(100%)');

    let loadingObj = loading(_);

    (() => {
        loadingObj.start();
    })();

    (() => {
        resources(_).timeout(() => {
            $.each(_.__timeIds, (e) => {
                clearIntervalTimeId(_.__timeIds[e]);
            });
        }, 30000);
    })();

    (() => {
        event(_).init();
    })();

    (() => {
        sidebar(_);
    })();

    (() => {
        banner(_);
    })();

    (() => {
        if (_.__config.fontIconExtend !== '') _.__tools.dynamicLoadingCss(_.__config.fontIconExtend);
    })();

    (() => {
        loadingObj.stop();
    })();
}
