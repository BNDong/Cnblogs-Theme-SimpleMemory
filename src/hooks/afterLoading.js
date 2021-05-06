/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: loading 结束后
 */

export default function main(_) {
    if (typeof _.__config.hooks.afterLoading === "function")
        _.__config.hooks.afterLoading(_);
}