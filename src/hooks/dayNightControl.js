/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 日夜间模式切换时
 */

export default function main(_, type) {
    if (typeof _.__config.hooks.dayNightControl === "function")
        _.__config.hooks.dayNightControl(_, type);
}