/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章页公共处理部分
 * 由于书单页、友链页等部分页面基础是文章页，所以共通部分提取至此来处理
 */
import resources from '../../core/resources';
import articleInfo from "../../components/articleInfo/articleInfo";
import comment from "../../components/comment/comment";
import articleSuffix from "../../components/articleSuffix/articleSuffix";
import articleDirectory from "../../components/articleDirectory/articleDirectory";
import greenChannel from "../../components/greenChannel/greenChannel";

export default function main(_) {

    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../../style/nhBannerAnimation.css');
    })();

    (() => {
        for (let i = 0; i <= 10; i++) {
            resources(_).timeout(function timer(){
                let main = $('#main');
                main.find('.cnblogs-markdown').removeClass('cnblogs-markdown');
                main.find('.cnblogs-post-body').removeClass('cnblogs-post-body');
            }, i * 500);
        }
    })();

    (() => {
        articleInfo(_);
    })();

    (() => {
        if (_.__status.pageType !== 'books') {
            articleDirectory(_);
        }
    })();

    (() => {
        greenChannel(_);
    })();

    (() => {
        articleSuffix(_);
    })();

    (() => {
        comment(_);
    })();
}