/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 主程序文件
 */
import _ from 'lodash';
import config from './components/config/config';
import status from "./components/status/status";
import tools from './utils/tools';
import event from "./components/event/event";

$(document).ready(function(){

    // 初始化
    _.__config  = config(); // 配置信息
    _.__status  = status(); // 页面状态信息
    _.__tools   = tools();  // 公共处理工具
    _.__timeIds = {};       // 定时器
    _.__event   = {};       // 事件

    if (_.__config.info.name === '') _.__config.info.name = _.__status.user;

    // 开启渲染
    import(/* webpackChunkName: "page-[request]" */ `./page/${_.__status.pageType}`).then(module => {
        const page = module.default;

        /**
         * 前置公共处理
         */
        import(/* webpackChunkName: "comBefore" */ './components/common/comBefore').then(module => {
            const comBefore = module.default;
            comBefore(_);

            /**
             * 页面逻辑处理
             */
            page(_);

            /**
             * 后置公共处理
             */
            import(/* webpackChunkName: "comAfter" */ './components/common/comAfter').then(module => {
                const comAfter = module.default;
                comAfter(_);

                /**
                 * 辅助处理
                 */
                (() => {
                    _.__tools.setDomHomePosition(); // 文章主体位置修正
                    event(_).handle.scroll(); // 触发滚动处理
                    event(_).handle.resize(); // 触发窗口大小变化处理
                })();
            });
        });
    });
})