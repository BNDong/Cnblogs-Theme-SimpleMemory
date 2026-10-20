/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 主程序文件
 */
import createContext from './core/context';
import event from "./components/event/event";

$(document).ready(function(){

    // 初始化
    let _ = createContext();

    // 开启渲染
    import(/* webpackChunkName: "page-[request]" */ `./pages/${_.__status.pageType}`).then(module => {
        const page = module.default;

        initializePage(_, page);
    });
});

/**
 * 前置公共处理
 */
function initializePage(_, page) {
    import(/* webpackChunkName: "comBefore" */ './components/common/comBefore').then(module => {
        const comBefore = module.default;
        comBefore(_);

        /**
         * 页面逻辑处理
         */
        page(_);

        initializeCommonAfter(_);
    });
}

/**
 * 后置公共处理
 */
function initializeCommonAfter(_) {
    import(/* webpackChunkName: "comAfter" */ './components/common/comAfter').then(module => {
        const comAfter = module.default;
        comAfter(_);

        /**
         * 辅助处理
         */
        initializeLayout(_);
    });
}

function initializeLayout(_) {
    _.__tools.setDomHomePosition(); // 文章主体位置修正
    event(_).handle.scroll(); // 触发滚动处理
    event(_).handle.resize(); // 触发窗口大小变化处理
}
