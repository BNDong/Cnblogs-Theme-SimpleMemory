/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 网站图标处理
 */

export default function main(_) {
    const iconUrl = _.__config.info.blogIcon;
    if (!iconUrl) return;

    const head = document.getElementsByTagName('head')[0];
    const favicons = head.querySelectorAll('link[rel~="icon"], link#favicon');

    if (favicons.length) {
        Array.prototype.forEach.call(favicons, icon => {
            icon.rel = 'icon';
            icon.removeAttribute('type');
            icon.removeAttribute('sizes');
            icon.href = iconUrl;
        });
    } else {
        const icon = document.createElement('link');
        icon.id = 'favicon';
        icon.rel = 'icon';
        icon.href = iconUrl;
        head.appendChild(icon);
    }
}
