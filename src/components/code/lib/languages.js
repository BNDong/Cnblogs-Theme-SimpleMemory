// 未指定语言或语法不支持按需加载时使用完整语言集。
const loaders = {
    xml: () => import(/* webpackChunkName: "hljs-language-xml" */ 'highlight.js/lib/languages/xml'),
    css: () => import(/* webpackChunkName: "hljs-language-css" */ 'highlight.js/lib/languages/css'),
    javascript: () => import(/* webpackChunkName: "hljs-language-javascript" */ 'highlight.js/lib/languages/javascript'),
    handlebars: () => import(/* webpackChunkName: "hljs-language-handlebars" */ 'highlight.js/lib/languages/handlebars'),
    typescript: () => import(/* webpackChunkName: "hljs-language-typescript" */ 'highlight.js/lib/languages/typescript'),
    json: () => import(/* webpackChunkName: "hljs-language-json" */ 'highlight.js/lib/languages/json'),
    bash: () => import(/* webpackChunkName: "hljs-language-bash" */ 'highlight.js/lib/languages/bash'),
    java: () => import(/* webpackChunkName: "hljs-language-java" */ 'highlight.js/lib/languages/java'),
    python: () => import(/* webpackChunkName: "hljs-language-python" */ 'highlight.js/lib/languages/python'),
    sql: () => import(/* webpackChunkName: "hljs-language-sql" */ 'highlight.js/lib/languages/sql'),
    go: () => import(/* webpackChunkName: "hljs-language-go" */ 'highlight.js/lib/languages/go'),
    rust: () => import(/* webpackChunkName: "hljs-language-rust" */ 'highlight.js/lib/languages/rust'),
    c: () => import(/* webpackChunkName: "hljs-language-c" */ 'highlight.js/lib/languages/c'),
    cpp: () => import(/* webpackChunkName: "hljs-language-cpp" */ 'highlight.js/lib/languages/cpp'),
    markdown: () => import(/* webpackChunkName: "hljs-language-markdown" */ 'highlight.js/lib/languages/markdown'),
    ruby: () => import(/* webpackChunkName: "hljs-language-ruby" */ 'highlight.js/lib/languages/ruby'),
    yaml: () => import(/* webpackChunkName: "hljs-language-yaml" */ 'highlight.js/lib/languages/yaml'),
    plaintext: () => import(/* webpackChunkName: "hljs-language-plaintext" */ 'highlight.js/lib/languages/plaintext'),
};

const aliases = {
    'html': 'xml',
    'xhtml': 'xml',
    'rss': 'xml',
    'atom': 'xml',
    'xjb': 'xml',
    'xsd': 'xml',
    'xsl': 'xml',
    'plist': 'xml',
    'wsf': 'xml',
    'svg': 'xml',
    'js': 'javascript',
    'jsx': 'javascript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'hbs': 'handlebars',
    'html.hbs': 'handlebars',
    'html.handlebars': 'handlebars',
    'htmlbars': 'handlebars',
    'ts': 'typescript',
    'tsx': 'typescript',
    'sh': 'bash',
    'zsh': 'bash',
    'jsp': 'java',
    'py': 'python',
    'gyp': 'python',
    'ipython': 'python',
    'golang': 'go',
    'rs': 'rust',
    'h': 'c',
    'cc': 'cpp',
    'c++': 'cpp',
    'h++': 'cpp',
    'hpp': 'cpp',
    'hh': 'cpp',
    'hxx': 'cpp',
    'cxx': 'cpp',
    'md': 'markdown',
    'mkdown': 'markdown',
    'mkd': 'markdown',
    'rb': 'ruby',
    'gemspec': 'ruby',
    'podspec': 'ruby',
    'thor': 'ruby',
    'irb': 'ruby',
    'yml': 'yaml',
    'text': 'plaintext',
    'txt': 'plaintext',
};
const dependencies = {
    xml: ['css', 'javascript', 'handlebars'],
    javascript: ['xml', 'css'],
    typescript: ['xml', 'css'],
    handlebars: ['xml'],
    markdown: ['xml'],
    yaml: ['ruby'],
};

function canonical(name) {
    if (typeof name !== 'string') return null;
    name = name.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(loaders, name)) return name;
    return Object.prototype.hasOwnProperty.call(aliases, name) ? aliases[name] : null;
}

function fullHighlighter() {
    return import(/* webpackChunkName: "hljs-full" */ 'highlight.js').then(module => module.default);
}

export default function loadHighlighter(languages, code) {
    if (!Array.isArray(languages) || !languages.length) return fullHighlighter();
    const requested = languages.slice();
    let needsFull = false;
    // pre 及父节点上的显式语言需要与自动识别列表一起加载。
    code.each((index, element) => {
        const classes = [element.className || '', element.parentNode ? element.parentNode.className || '' : ''].join(' ');
        const explicit = classes.match(/\blang(?:uage)?-([\w-]+)\b/i);
        if (explicit) {
            requested.push(explicit[1]);
        } else {
            classes.split(/\s+/).filter(Boolean).forEach(name => {
                if (canonical(name)) requested.push(name);
                else if (!['hljs', 'code-pre-line', 'nohighlight', 'no-highlight', 'plain', 'text'].includes(name)) needsFull = true;
            });
        }
    });
    const required = new Set();
    function include(name) {
        const language = canonical(name);
        if (!language) { needsFull = true; return; }
        if (required.has(language)) return;
        required.add(language);
        (dependencies[language] || []).forEach(include);
    }
    requested.forEach(include);
    if (needsFull) return fullHighlighter();
    const ordered = [...required].sort();
    return Promise.all([
        import(/* webpackChunkName: "hljs-core" */ 'highlight.js/lib/core'),
        ...ordered.map(name => loaders[name]()),
    ]).then(([core, ...definitions]) => {
        const hljs = core.default;
        ordered.forEach((name, index) => {
            if (!hljs.getLanguage(name)) hljs.registerLanguage(name, definitions[index].default);
        });
        return hljs;
    });
}
