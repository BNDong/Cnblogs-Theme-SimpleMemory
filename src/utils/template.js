/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 模版处理工具
 */

export default function main() {
    return {
        /**
         * 模版替换
         */
        tempReplacement: (temp, par, str) => {
            let re = new RegExp('##' + par + '##', 'g');
            return temp.replace(re, str);
        },

        /**
         * 批量模版替换
         */
        batchTempReplacement: (temp, list) => {
            let t = temp;
            $.each(list, function (i) {
                let par = list[i];
                t = t.replaceAll(`##${par[0]}##`, par[1]);
            });
            return t;
        },
    };
}
