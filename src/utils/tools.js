/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 工具处理类
 */

import templateTools from './template';
import resourceTools from './resource';
import domTools from './dom';
import dateTools from './date';
import randomTools from './random';
import cookieTools from './cookie';
import { clearIntervalTimeId } from '../core/resources';

export default function main() {
    const template = templateTools();
    const resource = resourceTools();
    const dom = domTools();
    const date = dateTools();
    const random = randomTools();
    const cookie = cookieTools();

    return {
        tempReplacement: template.tempReplacement,
        batchTempReplacement: template.batchTempReplacement,
        dynamicLoadingCss: resource.dynamicLoadingCss,
        dynamicLoadingJs: resource.dynamicLoadingJs,
        htmlFiltrationScript: dom.htmlFiltrationScript,
        clearIntervalTimeId: (timeId) => {
            clearIntervalTimeId(timeId);
        },
        actScroll: dom.actScroll,
        getScrollPercent: dom.getScrollPercent,
        randomNum: random.randomNum,
        setDomHomePosition: dom.setDomHomePosition,
        getNowFormatDate: date.getNowFormatDate,
        getRunDate: date.getRunDate,
        setCookie: cookie.setCookie,
        getCookie: cookie.getCookie,
        randomString: random.randomString,
        minToTime: date.minToTime,
        htmlReplace: dom.htmlReplace,
        articleInfo: dom.articleInfo,
        getFormattedDate: date.getFormattedDate,
    };
}
