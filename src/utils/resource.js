/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 资源加载工具
 */

export default function main() {
    return {
        /**
         * 加载CSS文件
         */
        dynamicLoadingCss: (path) => {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            let head = document.getElementsByTagName('head')[0],
                link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },

        /**
         * 加载JS文件
         */
        dynamicLoadingJs: (url) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    dataType: 'script',
                    cache: true,
                    url,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (err) {
                        reject(err);
                    },
                });
            });
        },
    };
}
