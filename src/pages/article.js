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

    (() => {
        comArticle(_);
    })();

    (() => {
        // 异步处理防止影响loading结束
        import(/* webpackChunkName: "article-code" */ '../components/code/code').then(module => {
            const main = module.default;
            main(_);
        });
    })();

    (() => {
        imgBox(_);
    })();
}