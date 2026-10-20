/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: banner 处理
 */
import resources from '../../core/resources';
import bannerTemp from '../../template/banner.html';
import homeTopBg from "../../images/webp/home_top_bg.webp";
import netHomeTopBg from "../../images/webp/nothome_top_bg.webp";

export default function main(_) {

    $('#sidebar_news').prepend(bannerTemp);

    // 在 loading 结束前设置头图高度。
    (() => {
        let mainHeader = $('#main-header');
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

        if (height) mainHeader.css('height', height);

        if (_.__config.animate.bannerImages.enable) {
            import(/* webpackChunkName: "bannerImages" */ '../bannerImages/bannerImages').then(module => {
                let bannerImages = module.default;
                bannerImages(
                    'main-header',
                    topImg,
                    _.__config.animate.bannerImages.options.itemNum,
                    _.__config.animate.bannerImages.options.time,
                    _.__config.animate.bannerImages.options.sort,
                    _.__config.animate.bannerImages.options.current < 0
                        ? _.__tools.randomNum(0, topImg.length - 1)
                        : _.__config.animate.bannerImages.options.current,
                    _
                );
            });
        } else {
            topImg.length > 0 ?
                (topImg.length > 1 ? bgImg = topImg[_.__tools.randomNum(0, topImg.length - 1)] : bgImg = topImg[0])
                : bgImg = "";

            mainHeader.css({
                'background': '#222 url(\'' + encodeURI(bgImg) + '\')  center center no-repeat',
                'background-size': 'cover'
            });
        }
    })();

    (() => {
        if (_.__config.animate.homeBannerTitle.enable) {
            $('#main-header h1.page-title').addClass('page-title-hover');
        }
    })();

    resources(_).subscribe(_.__event.scroll.handle, () => {
        let openButton = $('#open-button');

        if (_.__event.scroll.temScroll < _.__event.scroll.docScroll) {

            if (_.__event.scroll.homeScroll <= _.__event.scroll.docScroll) {

                if (!openButton.hasClass('menu-button-scroll')) {
                    openButton.addClass('menu-button-scroll');
                    openButton.text('');
                }
            }

        } else {

            if (_.__event.scroll.homeScroll >= _.__event.scroll.docScroll) {

                if (openButton.hasClass('menu-button-scroll')) {
                    openButton.removeClass('menu-button-scroll');
                    openButton.text('MENU');
                }
            }
        }
    });
}
