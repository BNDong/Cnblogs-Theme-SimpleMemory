/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: cookie 处理工具
 */

export default function main() {
    return {
        /**
         * 设置 cookie
         * @param {number} expires 有效期，单位秒
         */
        setCookie: (key, value, expires) => {
            let exp = new Date();
            exp.setTime(exp.getTime() + expires * 1000);
            document.cookie = key + '=' + escape(value) + '; expires=' + exp.toGMTString() + '; path=/';
        },

        /**
         * 获取 cookie
         * @returns {string|null}
         */
        getCookie: (key) => {
            let arr,
                reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
            arr = document.cookie.match(reg);
            if (arr) return unescape(arr[2]);
            else return null;
        },
    };
}
