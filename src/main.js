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

    let _ = createContext();

    import(/* webpackChunkName: "page-[request]" */ `./pages/${_.__status.pageType}`).then(module => {
        const page = module.default;

        initializePage(_, page);
    });
});

function initializePage(_, page) {
    import(/* webpackChunkName: "comBefore" */ './components/common/comBefore').then(module => {
        const comBefore = module.default;
        comBefore(_);

        page(_);

        initializeCommonAfter(_);
    });
}

function initializeCommonAfter(_) {
    import(/* webpackChunkName: "comAfter" */ './components/common/comAfter').then(module => {
        const comAfter = module.default;
        comAfter(_);

        initializeLayout(_);
    });
}

function initializeLayout(_) {
    _.__tools.setDomHomePosition();
    event(_).handle.scroll();
    event(_).handle.resize();
}
