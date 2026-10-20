/**
 * 转义 HTML 文本和带引号的属性值。
 */
export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * 移除 HTML 中的 script 元素。
 */
export function removeScripts(html) {
    const document = new DOMParser().parseFromString('', 'text/html');
    const template = document.createElement('template');
    template.innerHTML = html;
    function clean(root) {
        root.querySelectorAll('script').forEach(script => script.remove());
        root.querySelectorAll('template').forEach(nested => clean(nested.content));
    }
    clean(template.content);
    return template.innerHTML;
}
