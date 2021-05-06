/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 事件监听
 */

export default function main(_) {

    let eventFun = {
        init: () => {

            /**
             * 滚动监听
             */
            _.__event.scroll = {};
            _.__event.scroll.handle = [];
            _.__event.scroll.temScroll  = 0; // 上一次页面滚动位置
            _.__event.scroll.docScroll  = $(document).scrollTop(); // 当前滚动位置
            _.__event.scroll.homeScroll = $('#home').offset().top - 40; // 主体滚动
            $(window).scroll(() => {
                _.__event.scroll.docScroll  = $(document).scrollTop();
                _.__event.scroll.homeScroll = $('#home').offset().top - 40;
                eventFun.handle.scroll();
                _.__event.scroll.temScroll = _.__event.scroll.docScroll;
            });

            /**
             * 窗口大小监听
             */
            _.__event.resize = {};
            _.__event.resize.handle = [];
            $(window).resize( () => {
                eventFun.handle.resize();
            });
        },

        handle: {
            scroll: () => {
                for (let i = 0; i < _.__event.scroll.handle.length; i++) {
                    (_.__event.scroll.handle[i])();
                }
            },
            resize: () => {
                for (let i = 0; i < _.__event.resize.handle.length; i++) {
                    (_.__event.resize.handle[i])();
                }
                _.__tools.setDomHomePosition();
            },
        }
    };

    return eventFun;
}