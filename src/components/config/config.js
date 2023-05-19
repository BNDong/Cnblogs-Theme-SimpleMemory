/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 主题配置处理
 */
import defaultConfig from './config.json5';
import commentBgDark from "../../images/comment_bg_dark.png";
import commentBgDay from "../../images/comment_bg_day.png";

export default function main() {

    defaultConfig.articleComment.background.options.day = `rgba(0, 0, 0, 0) url("${commentBgDay}") no-repeat scroll 100% 31% / 35% padding-box border-box`;
    defaultConfig.articleComment.background.options.night = `rgba(0, 0, 0, 0) url("${commentBgDark}") no-repeat scroll 100% 31% / 35% padding-box border-box`;

    // 获取用户默认配置
    const userConfig = typeof window.cnblogsConfig === 'undefined' ? {} : window.cnblogsConfig;

    // 合并配置
    return $.extend( true, defaultConfig, userConfig);
}