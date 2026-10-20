/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: DOM 处理工具
 */

import { getHome, getHeader } from '../platform/cnblogs/dom';

export default function main() {
    return {
        /**
         * 过滤HTML中JavaScript代码
         */
        htmlFiltrationScript: (str) => {
            let subStr = new RegExp('<script.*</script>', 'ig');
            return str.replace(subStr, '');
        },

        /**
         * 滚动主体滚动条到指定位置
         */
        actScroll: (endScroll, time) => {
            $('html,body').stop().animate({ scrollTop: endScroll }, time);
        },

        /**
         * 获取页面滚动百分比
         */
        getScrollPercent: () => {
            let scrollTo = $(window).scrollTop(),
                docHeight = $(document).height(),
                windowHeight = $(window).height(),
                scrollPercent = (scrollTo / (docHeight - windowHeight)) * 100;
            return scrollPercent.toFixed(0);
        },

        /**
         * 初始化主体内容位置
         */
        setDomHomePosition: () => {
            getHome().css('margin-top', getHeader().outerHeight() + 'px');
        },

        /**
         * 替换HTML内容
         */
        htmlReplace: (id, reg, replacement) => {
            $(id).html($(id).html().replace(reg, replacement));
        },

        /**
         * 处理文章信息分类和标签
         * @param {number} type 1：分类；2：标签
         */
        articleInfo: (obj, type) => {
            let iconfont = type === 1 ? 'simple-memory-icon-marketing_fill' : 'simple-memory-icon-label-fill';
            let style = type === 1 ? 'article-tag-class-color' : 'article-tag-color';
            $.each(obj, (i) => {
                let tag = $(obj[i]);
                tag.prepend(
                    `<span class="simple-memory-iconfont simple-memory-${iconfont} iconfont ${iconfont}"></span>`
                );
                $('#articleInfo').append(
                    `<a href=" ${tag.attr(
                        'href'
                    )}" target="_blank"><span class="article-info-tag ${style}"> ${tag.text()}</span></a>`
                );
            });
        },
    };
}
