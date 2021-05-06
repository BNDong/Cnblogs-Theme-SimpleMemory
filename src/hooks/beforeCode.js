/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: code 渲染开始前
 */

export default function main(_) {
    if (typeof _.__config.hooks.beforeCode === "function")
        _.__config.hooks.beforeCode(_);
}