/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: banner 处理
 */
import bannerTemp from '../../template/banner.html';
import homeTopBg from "../../images/webp/home_top_bg.webp";
import netHomeTopBg from "../../images/webp/nothome_top_bg.webp";

export default function main(_) {

    $('#sidebar_news').prepend(bannerTemp);

    /**
     * 设置banner背景图片，初始化高度
     * （该处理需在loading结束之前处理）
     */
    (() => {
        let mainHeader = $('.main-header');
        let topImg, bgImg, height;
        if (_.__status.pageType === 'home') {
            topImg = _.__config.banner.home.background.length > 0
                ? _.__config.banner.home.background : [homeTopBg];
        }  else {
            topImg = _.__config.banner.article.background.length > 0
                ? _.__config.banner.article.background : [netHomeTopBg];
            height = '40vh';
            $('#homeTopTitle').hide();
            $('.scroll-down').hide();
            $('#home').css('margin-top', '40vh');
            $('#cb_post_title_url').addClass('post-del-title');
        }

        topImg.length > 0 ?
            (topImg.length > 1 ? bgImg = topImg[_.__tools.randomNum(0, topImg.length - 1)] : bgImg = topImg[0])
            : bgImg = "";

        mainHeader.css({
            'background': '#222 url(\'' + encodeURI(bgImg) + '\')  center center no-repeat',
            'background-size': 'cover'
        });
        if (height) mainHeader.css('height', height);
    })();

    // 添加事件监听
    _.__event.scroll.handle.push(() => {
        let openButton = $('#open-button');

        if (_.__event.scroll.temScroll < _.__event.scroll.docScroll) { // 向下滚动

            if (_.__event.scroll.homeScroll <= _.__event.scroll.docScroll) { // 滚过头图

                // 设置菜单按钮
                if (!openButton.hasClass('menu-button-scroll')) {
                    openButton.addClass('menu-button-scroll');
                    openButton.text('');
                }
            }

        } else { // 向上滚动

            if (_.__event.scroll.homeScroll >= _.__event.scroll.docScroll) { // 滚入头图

                // 设置菜单按钮
                if (openButton.hasClass('menu-button-scroll')) {
                    openButton.removeClass('menu-button-scroll');
                    openButton.text('MENU');
                }
            }
        }
    });
}