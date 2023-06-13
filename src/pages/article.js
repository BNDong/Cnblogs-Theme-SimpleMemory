/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章页处理
 */
import comArticle from "./common/comArticle";
import imgBox from "../components/imgBox/imgBox";

export default function main(_) {

    /**
     * 文章页公共处理
     */
    (() => {
        comArticle(_);
    })();

    /**
     * 代码高亮处理
     */
    (() => {
        // 异步处理防止影响loading结束
        import(/* webpackChunkName: "article-code" */ '../components/code/code').then(module => {
            const main = module.default;
            main(_);
        });
    })();

    /**
     * 图片灯箱处理
     */
    (() => {
        imgBox(_);
    })();
}