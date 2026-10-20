/**
 * 工具接口、页面输出、初始化流程和资源管理测试。
 * 使用固定宿主节点和资源加载替身，避免依赖博客园在线内容或外部 CDN。
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const babel = require('@babel/core');
const { JSDOM } = require('jsdom');
const parserWindow = new JSDOM('').window;
const root = path.resolve(__dirname, '..');

function runtime(globals = {}, stubs = {}) {
    const cache = new Map();
    const context = vm.createContext({ console, DOMParser: parserWindow.DOMParser, ...globals });
    function load(relative) {
        const filename = path.resolve(root, relative);
        if (Object.hasOwn(stubs, filename)) return stubs[filename];
        if (cache.has(filename)) return cache.get(filename).exports;
        const module = { exports: {} };
        cache.set(filename, module);
        const source = fs.readFileSync(filename, 'utf8');
        const result = babel.transformSync(source, {
            filename,
            babelrc: false,
            configFile: false,
            presets: [[require('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }]],
            plugins: [({ types }) => ({ visitor: {
                CallExpression(p) {
                    if (p.node.callee.type === 'Import') p.node.callee = types.identifier('__import');
                },
            } })],
        });
        const resolve = specifier => {
            let resolved = path.resolve(path.dirname(filename), specifier);
            if (!path.extname(resolved)) resolved += '.js';
            return resolved;
        };
        const fn = vm.compileFunction(result.code, ['require', 'module', 'exports', '__import'], {
            filename, parsingContext: context,
        });
        fn(specifier => load(resolve(specifier)), module, module.exports,
            specifier => globals.importModule(specifier));
        return module.exports;
    }
    return load;
}

// 模拟宿主节点，记录生成的 HTML、样式和事件。
function host() {
    const nodes = {};
    const document = { cookie: '' };
    const window = {};
    const listeners = {};
    const ready = [];
    const ajax = [];
    function select(items) {
        const list = Array.isArray(items) ? items : items ? [items] : [];
        return Object.assign({
            length: list.length,
            text(value) {
                if (value === undefined) return list.map(n => n.text || '').join('');
                list.forEach(n => { n.text = value; }); return this;
            },
            html(value) {
                if (value === undefined) return list[0]?.html || '';
                list.forEach(n => { n.html = value; }); return this;
            },
            attr(key) { return list[0]?.attrs?.[key]; },
            find(key) { return select(list[0]?.find?.[key]); },
            nextAll(key) { return select(list[0]?.next?.[key]); },
            parent() { return select(list[0]?.parent); },
            after(html) { list.forEach(n => { (n.after ||= []).push(html); }); return this; },
            append(html) { list.forEach(n => { (n.append ||= []).push(html); }); return this; },
            prepend(html) { list.forEach(n => { (n.prepend ||= []).push(html); }); return this; },
            hide() { list.forEach(n => { n.hidden = true; }); return this; },
            css(key, value) {
                list.forEach(n => Object.assign(n.style ||= {}, typeof key === 'object' ? key : { [key]: value }));
                return this;
            },
            offset() { return { top: list[0]?.top || 0 }; },
            outerHeight() { return list[0]?.height || 0; },
            height() { return list[0]?.height || 0; },
            scrollTop() { return list[0]?.scroll || 0; },
            stop() { return this; },
            animate(value, duration) { list.forEach(n => { n.animation = [value, duration]; }); return this; },
            scroll(fn) { listeners.scroll = fn; },
            resize(fn) { listeners.resize = fn; },
            click(fn) { list.forEach(n => { n.click = fn; }); return this; },
            on(type, handler) {
                if (typeof type === 'object') Object.entries(type).forEach(([name, fn]) => this.on(name, fn));
                else listeners[type] = handler;
                return this;
            },
            off(type, handler) {
                if (typeof type === 'object') Object.entries(type).forEach(([name, fn]) => this.off(name, fn));
                else if (listeners[type] === handler) delete listeners[type];
                return this;
            },
            ready(fn) { ready.push(fn); },
        }, list);
    }
    function $(key) {
        if (typeof key === 'object') return select(key);
        return select(nodes[key]);
    }
    $.each = (list, fn) => Array.from(list).forEach((item, i) => fn(i, item));
    $.isArray = Array.isArray;
    $.ajax = options => { ajax.push(options); };
    return { $, document, window, nodes, listeners, ready, ajax };
}

const toolNames = [
    'tempReplacement', 'batchTempReplacement', 'dynamicLoadingCss', 'dynamicLoadingJs',
    'htmlFiltrationScript', 'clearIntervalTimeId', 'actScroll', 'getScrollPercent',
    'randomNum', 'setDomHomePosition', 'getNowFormatDate', 'getRunDate', 'setCookie',
    'getCookie', 'randomString', 'minToTime', 'htmlReplace', 'articleInfo', 'getFormattedDate',
];

test('旧工具入口保留全部方法、属性顺序和独立的可覆盖方法集合', () => {
    const h = host();
    const createTools = runtime(h)('src/utils/tools.js').default;
    const a = createTools(), b = createTools();
    assert.deepEqual(Object.keys(a), toolNames);
    toolNames.forEach(name => {
        assert.equal(typeof a[name], 'function');
        assert.notEqual(a[name], b[name]);
    });
    a.randomNum = () => 99;
    assert.notEqual(a.randomNum, b.randomNum);
    assert.equal(b.tempReplacement('##x##/##x##', 'x', 'a'), 'a/a');
    assert.equal(b.batchTempReplacement('##x##/##y##', [['x', 'a'], ['y', 'b']]), 'a/b');
    assert.equal(b.htmlFiltrationScript('<p>正文</p><script>x()</script>'), '<p>正文</p>');
    assert.equal(b.minToTime(1.5), '1:30');
    assert.equal(b.randomNum(), 0);
    assert.equal(b.randomNum(1), 1);
    assert.equal(b.randomNum(3, 3), 3);
    assert.match(b.randomString(8), /^[ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678]{8}$/);
    assert.match(b.getNowFormatDate(), /^\d{4}-\d{2}-\d{2}$/);
    assert.match(b.getFormattedDate(), /^\d{2}-\d{2}$/);
    assert.equal(typeof b.getRunDate('2021-01-01').seconds, 'string');
    b.setCookie('theme', '日间', 60);
    assert.equal(b.getCookie('theme'), '日间');
    assert.equal(b.getCookie('missing'), null);
});

test('资源加载保留参数、返回值与成功失败语义', async () => {
    const h = host();
    const links = [];
    h.document.getElementsByTagName = () => [{ appendChild: link => links.push(link) }];
    h.document.createElement = () => ({});
    const tools = runtime(h)('src/utils/tools.js').default();
    assert.throws(() => tools.dynamicLoadingCss(''), /argument "path" is required/);
    assert.equal(tools.dynamicLoadingCss('theme.css'), undefined);
    assert.equal(links[0].href, 'theme.css');
    const success = tools.dynamicLoadingJs('plugin.js');
    const request = h.ajax[0];
    assert.deepEqual([request.type, request.dataType, request.cache, request.url], ['GET', 'script', true, 'plugin.js']);
    request.success('loaded');
    assert.equal(await success, 'loaded');
    const failure = tools.dynamicLoadingJs('missing.js');
    const error = new Error('unavailable');
    h.ajax[1].error(error);
    await assert.rejects(failure, e => e === error);
});

test('布局工具每次读取当前节点，保留滚动边界及计时器清理行为', () => {
    const h = host();
    h.nodes['#home'] = {};
    h.nodes['.main-header'] = { height: 120 };
    const cleared = [];
    h.window.clearInterval = id => cleared.push(id);
    h.window.height = 500;
    h.window.scroll = 250;
    h.document.height = 1000;
    const tools = runtime(h)('src/utils/tools.js').default();
    tools.setDomHomePosition();
    assert.equal(h.nodes['#home'].style['margin-top'], '120px');
    h.nodes['.main-header'] = { height: 240 };
    tools.setDomHomePosition();
    assert.equal(h.nodes['#home'].style['margin-top'], '240px');
    assert.equal(tools.getScrollPercent(), '50');
    h.document.height = 500;
    assert.equal(tools.getScrollPercent(), 'Infinity');
    tools.clearIntervalTimeId(null);
    tools.clearIntervalTimeId(undefined);
    tools.clearIntervalTimeId(0);
    tools.clearIntervalTimeId(42);
    assert.deepEqual(cleared, [0, 42]);
});

for (const page of ['home', 'category']) {
    test(`${page} 保留文章列表 HTML、置顶标题和摘要图片处理`, () => {
        const h = host();
        const anchor = {};
        const title = { text: '[置顶]兼容文章', find: { a: anchor }, next: {
            '.postDesc:eq(0)': { text: 'posted @ 2026-10-20 10:30 阅读(12) 评论(3) 推荐(4)' },
        } };
        const entry = { next: { '.entrylistItemPostDesc:eq(0)': { text: 'posted @ 2026-10-19 09:00' } } };
        const image = { attrs: { src: '/cover.webp' } };
        const parent = {};
        const description = { find: { 'img.desc_img': image }, parent };
        const plain = { text: '无图摘要' };
        h.nodes['#main .postTitle'] = [title];
        h.nodes['#main .entrylistPosttitle'] = [entry];
        h.nodes['#main .c_b_p_desc_readmore'] = {};
        h.nodes['.c_b_p_desc'] = [description, plain];
        h.nodes['#digg_count'] = { text: '8' };
        const context = { __config: { info: { name: '演示' }, banner: { home: { title: '原标语' } },
            animate: { homeBanner: { enable: false }, articleBanner: { enable: false }, articleTitle: { enable: false } } },
            __tools: { setDomHomePosition() {} } };
        const stubs = { [path.join(root, 'src/vendor/consoleText/consoleText.js')]: () => {} };
        const result = runtime(h, stubs)(`src/pages/${page}.js`).default(context);
        assert.equal(result, undefined);
        const meta = (date, reads, comments, recommendations) => `<span class="postMeta">
                <i class="simple-memory-iconfont simple-memory-icon-time1"></i>发表于 ${date}
                <i class="simple-memory-iconfont simple-memory-icon-browse"></i>阅读：${reads}
                <i class="simple-memory-iconfont simple-memory-icon-interactive"></i>评论：${comments}
                <i class="simple-memory-iconfont simple-memory-icon-hot"></i>推荐：${recommendations}
            </span>`;
        assert.deepEqual(title.after, [meta('2026-10-20 10:30', '12', '3', '4')]);
        assert.deepEqual(entry.after, [meta('2026-10-19 09:00', '0', '0', '8')]);
        assert.deepEqual(title.append, ['<span class="postSticky">置顶</span>']);
        assert.equal(anchor.text, '兼容文章');
        assert.equal(h.nodes['#main .c_b_p_desc_readmore'].text, '阅读全文 »');
        assert.equal(image.hidden, true);
        assert.equal(description.style.width, '60%');
        assert.equal(parent.style['min-height'], '150px');
        assert.deepEqual(description.after, ["<div class=\"c_b_p_desc_img\"><div style=\"background: url('/cover.webp') center center / contain no-repeat;\"></div></div>"]);
        assert.equal(plain.after, undefined);
    });
}

test('旧状态入口保留各页面识别及现有查询参数处理结果', () => {
    for (const [url, marker, page] of [
        ['/demo/', '', 'home'], ['/demo/?page=2', '', 'article'],
        ['/demo/p/123.html#anchor', '', 'article'], ['/demo/category/123.html', '', 'category'],
        ['/demo/tag/js/', '', 'tag'], ['/demo/gallery/123.html', '', 'gallery'],
        ['/demo/gallery/image/123.html', '', 'galleryImage'],
        ['/demo/p/123.html', '#bookListFlg', 'books'], ['/demo/p/123.html', '#linkListFlg', 'links'],
    ]) {
        const h = host();
        h.window.location = { href: 'https://www.cnblogs.com' + url };
        if (marker) h.nodes[marker] = {};
        const state = runtime(h)('src/components/status/status.js').default();
        assert.equal(state.pageType, page, url);
        assert.equal(state.user, 'demo');
        assert.equal(state.homeUrl, 'https://www.cnblogs.com/demo');
        if (url.includes('/p/')) assert.equal(state.articleId, '123');
    }
});

test('事件保留数组追加回调、执行顺序及滚动状态更新时机', () => {
    const h = host();
    h.nodes['#home'] = { top: 300 };
    const calls = [];
    const context = { __event: {}, __tools: { setDomHomePosition: () => calls.push('layout') } };
    const event = runtime(h)('src/components/event/event.js').default(context);
    event.init();
    context.__event.scroll.handle.push(() => calls.push(['scroll', context.__event.scroll.temScroll, context.__event.scroll.docScroll]));
    context.__event.scroll.handle.push(() => calls.push('second'));
    h.document.scroll = 100;
    h.nodes['#home'] = { top: 500 };
    h.listeners.scroll();
    assert.equal(context.__event.scroll.temScroll, 100);
    assert.equal(context.__event.scroll.homeScroll, 460);
    context.__event.resize.handle.push(() => calls.push('resize'));
    h.listeners.resize();
    assert.deepEqual(calls, [['scroll', 0, 100], 'second', 'resize', 'layout']);
});

for (const pageType of ['home', 'article', 'category', 'tag', 'books', 'links', 'gallery', 'galleryImage']) {
    test(`${pageType} 初始化保留模块加载顺序、上下文共享及同步 hook 时机`, async () => {
        const h = host();
        const calls = [];
        const config = { info: { name: '' }, hooks: {} };
        let captured;
        const stubs = {
            'src/components/config/config.js': () => { calls.push('config'); return config; },
            'src/components/status/status.js': () => { calls.push('status'); return { user: 'demo', pageType }; },
            'src/utils/tools.js': () => { calls.push('tools'); return { setDomHomePosition: () => calls.push('layout') }; },
            'src/components/event/event.js': context => {
                assert.equal(context, captured);
                return { handle: { scroll: () => calls.push('scroll'), resize: () => calls.push('resize') } };
            },
        };
        h.importModule = specifier => {
            calls.push(specifier);
            return Promise.resolve({ default: context => {
                if (specifier.endsWith('comBefore')) {
                    captured = context;
                    assert.deepEqual(Object.keys(context), ['__config', '__status', '__tools', '__timeIds', '__event']);
                    calls.push('before');
                    config.hooks.afterLoading = () => { context.__status.custom = 'hook'; calls.push('afterLoading'); };
                    config.hooks.afterLoading(context);
                } else if (specifier.endsWith('comAfter')) {
                    assert.equal(context, captured);
                    calls.push('after');
                } else {
                    assert.equal(context, captured);
                    assert.equal(context.__status.custom, 'hook');
                    calls.push('page');
                    return new Promise(() => {}); // 模拟未完成的页面异步任务。
                }
            } });
        };
        runtime(h, Object.fromEntries(Object.entries(stubs).map(([name, value]) => [path.join(root, name), value])))('src/main.js');
        h.ready[0]();
        await new Promise(setImmediate);
        assert.equal(config.info.name, 'demo');
        assert.deepEqual(calls, ['config', 'status', 'tools', `./pages/${pageType}`, './components/common/comBefore',
            'before', 'afterLoading', 'page', './components/common/comAfter', 'after', 'layout', 'scroll', 'resize']);
    });
}

function timerHost() {
    let nextId = 1;
    const intervals = new Map(), timeouts = new Map(), frames = new Map();
    const window = {
        setInterval(callback, delay, ...args) { const id = nextId++; intervals.set(id, { callback, delay, args }); return id; },
        clearInterval(id) { intervals.delete(id); },
        setTimeout(callback, delay, ...args) { const id = nextId++; timeouts.set(id, { callback, delay, args }); return id; },
        clearTimeout(id) { timeouts.delete(id); },
        requestAnimationFrame(callback) { const id = nextId++; frames.set(id, callback); return id; },
        cancelAnimationFrame(id) { frames.delete(id); },
    };
    return { window, intervals, timeouts, frames };
}

test('资源登记保持原生 ID、延时和回调参数，统一销毁且不删除外部事件', () => {
    const h = timerHost();
    const modules = runtime(h);
    const context = { __timeIds: {} };
    const resources = modules('src/core/resources.js').default;
    const registry = resources(context);
    assert.equal(registry, resources(context));
    const calls = [];
    const interval = registry.interval((...args) => calls.push(args), 1000, 'old');
    const timeout = registry.timeout((...args) => calls.push(args), 500, 'later');
    const frame = registry.frame(() => calls.push('frame'));
    assert.equal(h.intervals.get(interval).delay, 1000);
    assert.equal(h.timeouts.get(timeout).delay, 500);
    h.intervals.get(interval).callback(...h.intervals.get(interval).args);
    assert.deepEqual(calls, [['old']]);
    const external = () => {}, owned = () => {};
    const nativeHandlers = new Set([external]), jqueryHandlers = new Set([external]);
    registry.on({ addEventListener: (type, fn) => nativeHandlers.add(fn), removeEventListener: (type, fn) => nativeHandlers.delete(fn) }, 'click', owned);
    registry.onJQuery({ on: (type, fn) => jqueryHandlers.add(fn), off: (type, fn) => jqueryHandlers.delete(fn) }, 'click', owned);
    const callbacks = [external];
    registry.subscribe(callbacks, owned);
    context.__timeIds.legacy = h.window.setInterval(external, 1000);
    registry.dispose();
    registry.dispose();
    assert.equal(h.intervals.size + h.timeouts.size + h.frames.size, 0);
    assert.deepEqual([...nativeHandlers], [external]);
    assert.deepEqual([...jqueryHandlers], [external]);
    assert.deepEqual(callbacks, [external]);
    assert.equal(registry.interval(owned, 1000), null);
    assert.equal(registry.timeout(owned, 1000), null);
    assert.equal(registry.frame(owned), null);
    let released = false;
    registry.add(() => { released = true; });
    assert.equal(released, true);
    assert.equal(typeof frame, 'number');
});

test('原工具清理兼容已登记轮询，30 秒清理不停止长期任务', () => {
    const h = { ...host(), ...timerHost() };
    const modules = runtime(h);
    const context = { __timeIds: {} };
    const registry = modules('src/core/resources.js').default(context);
    const tools = modules('src/utils/tools.js').default();
    const poll = registry.interval(() => {}, 1000);
    const persistent = registry.interval(() => {}, 500);
    context.__timeIds.poll = poll;
    const clearLegacy = registry.timeout(() => Object.values(context.__timeIds).forEach(tools.clearIntervalTimeId), 30000);
    assert.equal(h.timeouts.get(clearLegacy).delay, 30000);
    h.timeouts.get(clearLegacy).callback();
    h.timeouts.delete(clearLegacy);
    assert.equal(h.intervals.has(poll), false);
    assert.equal(h.intervals.has(persistent), true);
    registry.dispose();
    assert.equal(h.intervals.size, 0);
});

test('往返缓存保留资源，普通 pagehide 和显式 destroy 清理资源', () => {
    const h = { ...host(), ...timerHost() };
    let onPageHide;
    h.window.addEventListener = (type, fn) => { if (type === 'pagehide') onPageHide = fn; };
    h.window.removeEventListener = () => {};
    h.nodes['#home'] = { top: 100 };
    const context = { __timeIds: {}, __event: {}, __tools: { setDomHomePosition() {} } };
    const modules = runtime(h);
    const events = modules('src/components/event/event.js').default(context);
    events.init();
    assert.equal(context.__event.destroy, events.destroy);
    const registry = modules('src/core/resources.js').default(context);
    const id = registry.interval(() => {}, 500);
    onPageHide({ persisted: true });
    assert.equal(h.intervals.has(id), true);
    onPageHide({ persisted: false });
    assert.equal(h.intervals.size, 0);
    assert.equal(h.listeners.scroll, undefined);
    context.__event.destroy();
});

test('侧栏、文章和评论适配保留原选择器，并实时查询宿主', () => {
    const selectors = [];
    const modules = runtime({ $: selector => { selectors.push(selector); return selector; } });
    const sidebar = modules('src/platform/cnblogs/sidebar.js').getSidebarNode;
    const article = modules('src/platform/cnblogs/article.js').getArticleNode;
    const comment = modules('src/platform/cnblogs/comment.js');
    assert.equal(sidebar('profile'), '#profile_block');
    assert.equal(sidebar('comments'), '#sidebar_recentcomments ul');
    assert.equal(article('body'), '#cnblogs_post_body');
    assert.equal(article('categories'), '#BlogPostCategory');
    assert.equal(comment.getCommentNode('avatar', 123), '#comment_123_avatar');
    assert.equal(comment.getCommentNode('body', 123), '#comment_body_123');
    article('body');
    assert.equal(selectors.filter(value => value === '#cnblogs_post_body').length, 2);
    assert.equal(comment.isCommentRequest('/ajax/PostComment/Add.aspx', 'add'), true);
    assert.equal(comment.isCommentRequest('/ajax/comments-block?page=2', 'list'), true);
    assert.equal(comment.isCommentRequest('/ajax/comment/DeleteComment.aspx', 'remove'), true);
    assert.equal(comment.isCommentRequest('/unrelated', 'add'), false);
});

test('字体默认仍加载全量，明确选择时只加载选中字体，未知配置回退', async () => {
    const imports = [];
    const loadFonts = runtime({ importModule: specifier => { imports.push(specifier); return Promise.resolve({}); } })('src/components/fonts/fonts.js').default;
    await loadFonts({ __config: {} });
    assert.deepEqual(imports.splice(0), ['../../style/google-fonts.css']);
    await loadFonts({ __config: { fonts: { families: ['Playball', 'Ubuntu Mono', 'Playball'] } } });
    assert.deepEqual(imports.splice(0), ['../../style/google-fonts/playball.css', '../../style/google-fonts/ubuntu-mono.css']);
    await loadFonts({ __config: { fonts: { families: ['User Font'] } } });
    assert.deepEqual(imports.splice(0), ['../../style/google-fonts.css']);
});

test('高亮按需加载包含别名、正文显式语言及嵌套语法，未知语种保留全量路径', async () => {
    const imports = [], registered = [];
    const core = { getLanguage: name => registered.includes(name), registerLanguage: name => registered.push(name) };
    const load = runtime({ importModule: specifier => {
        imports.push(specifier);
        return Promise.resolve({ default: specifier.endsWith('/core') ? core : () => ({}) });
    } })('src/components/code/lib/languages.js').default;
    const code = { each: fn => fn(0, { className: 'language-python', parentNode: { className: '' } }) };
    await load(['js'], code);
    assert.equal(imports.includes('highlight.js'), false);
    for (const name of ['javascript', 'xml', 'css', 'handlebars', 'python']) assert.equal(registered.includes(name), true, name);
    assert.equal(imports.filter(name => name.endsWith('/javascript')).length, 1);
    imports.length = 0;
    await load([], code);
    assert.deepEqual(imports, ['highlight.js']);
    imports.length = 0;
    await load(['kotlin'], code);
    assert.deepEqual(imports, ['highlight.js']);
    imports.length = 0;
    await load(['js'], { each: fn => fn(0, { className: '', parentNode: { className: 'language-kotlin' } }) });
    assert.deepEqual(imports, ['highlight.js']);
});

test('选定语言与原全量版本输出一致，含 JSX、嵌套 CSS、Ruby 和显式 Python', async () => {
    // 独立加载 core，避免全量版本已注册的语言掩盖缺失依赖。
    const filename = require.resolve('highlight.js/lib/core');
    const isolated = { exports: {} };
    new Function('module', 'exports', require('node:fs').readFileSync(filename, 'utf8'))(isolated, isolated.exports);
    const core = isolated.exports;
    const load = runtime({ importModule: specifier => Promise.resolve({
        default: specifier === 'highlight.js/lib/core' ? core : require(specifier),
    }) })('src/components/code/lib/languages.js').default;
    const code = { each: fn => fn(0, { className: 'language-python' }) };
    const current = await load(['js', 'yaml', 'markdown'], code);
    const full = require('highlight.js');
    for (const [language, source] of [
        ['javascript', 'const view = <section>Hello</section>;'],
        ['xml', '<style>body { color: red; }</style><script>const x = 1;</script>'],
        ['yaml', 'value: !ruby/object:Widget {}'],
        ['markdown', '# Title\n<div>text</div>'],
        ['python', 'def test(x):\n    return x + 1'],
    ]) {
        assert.equal(current.highlight(source, { language, ignoreIllegals: true }).value,
            full.highlight(source, { language, ignoreIllegals: true }).value, language);
    }
});

function faviconHost(links = []) {
    const elements = links.map(attrs => ({ ...attrs, removeAttribute(name) { delete this[name]; } }));
    const head = {
        querySelectorAll(selector) {
            assert.equal(selector, 'link[rel~="icon"], link#favicon');
            return elements.filter(link => (link.rel || '').split(/\s+/).includes('icon') || link.id === 'favicon');
        },
        appendChild(link) { elements.push(link); },
    };
    const document = {
        getElementsByTagName: name => name === 'head' ? [head] : [],
        createElement: name => { assert.equal(name, 'link'); return { removeAttribute(key) { delete this[key]; } }; },
    };
    const $ = selector => {
        assert.equal(selector, '#favicon');
        const matches = elements.filter(link => link.id === 'favicon');
        return { length: matches.length, attr(name, value) { matches.forEach(link => { link[name] = value; }); } };
    };
    return { document, elements, $ };
}

test('blogIcon 同步更新 ICO 和 SVG 声明，清除格式与尺寸提示，保留其他链接', () => {
    const h = faviconHost([
        { id: 'favicon', rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico' },
        { id: 'favicon_svg', rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: '/theme.css' },
    ]);
    const apply = runtime(h)('src/components/blogIcon/blogIcon.js').default;
    const context = { __config: { info: { blogIcon: 'https://example.com/custom.png' } } };
    apply(context);
    apply(context);
    assert.equal(h.elements.length, 4);
    for (const icon of h.elements.slice(0, 2)) {
        assert.equal(icon.href, context.__config.info.blogIcon);
        assert.equal(icon.type, undefined);
        assert.equal(icon.sizes, undefined);
        assert.equal(icon.rel, 'icon');
    }
    assert.equal(h.elements[0].id, 'favicon');
    assert.equal(h.elements[1].id, 'favicon_svg');
    assert.equal(h.elements[2].href, '/apple-touch-icon.png');
    assert.equal(h.elements[3].href, '/theme.css');
});

test('blogIcon 支持无图标页面、无 ID 的图标以及旧 shortcut icon 声明', () => {
    for (const links of [[], [{ rel: 'icon', href: '/default.svg' }], [{ id: 'favicon', rel: 'shortcut icon', href: '/default.ico' }]]) {
        const h = faviconHost(links);
        const apply = runtime(h)('src/components/blogIcon/blogIcon.js').default;
        const context = { __config: { info: { blogIcon: '/custom.svg' } } };
        apply(context);
        apply(context);
        assert.equal(h.elements.length, 1);
        assert.equal(h.elements[0].rel, 'icon');
        assert.equal(h.elements[0].href, '/custom.svg');
        if (!links.length) assert.equal(h.elements[0].id, 'favicon');
    }
});

test('blogIcon 未配置时不修改页面图标', () => {
    const h = faviconHost([{ id: 'favicon', rel: 'icon', type: 'image/x-icon', href: '/default.ico' }]);
    const apply = runtime(h)('src/components/blogIcon/blogIcon.js').default;
    apply({ __config: { info: { blogIcon: '' } } });
    apply({ __config: { info: {} } });
    assert.equal(h.elements.length, 1);
    assert.equal(h.elements[0].href, '/default.ico');
    assert.equal(h.elements[0].type, 'image/x-icon');
});

function directoryHost(markup, number = true) {
    const dom = new JSDOM(`<!doctype html><style>html { overflow-y: visible; } body { overflow-y: auto; }</style>
        <div id="cnblogs_post_body">${markup}</div>`, { url: 'https://example.com/article' });
    const { window } = dom;
    const { document } = window;
    const $ = require('jquery')(window);
    const observers = [];
    class IntersectionObserver {
        constructor(callback, options) {
            this.callback = callback;
            this.options = options;
            this.targets = [];
            this.disconnected = false;
            observers.push(this);
        }
        observe(target) { this.targets.push(target); }
        disconnect() { this.disconnected = true; }
    }
    const headers = Array.from(document.querySelectorAll('h1, h2, h3'));
    headers.forEach((header, index) => {
        const top = 200 + index * 400;
        Object.defineProperty(header, 'offsetTop', { value: top });
        header.getClientRects = () => [{ top }];
        header.getBoundingClientRect = () => ({ top, left: 0, width: 200, height: 30 });
    });
    const bootstrapPath = path.join(root, 'src/components/articleDirectory/bootstrap.js');
    const stubs = {
        [path.join(root, 'src/style/articleDirectory.css')]: {},
        [path.join(root, 'src/template/articleDirectory.html')]:
            fs.readFileSync(path.join(root, 'src/template/articleDirectory.html'), 'utf8'),
    };
    const load = runtime({ window, document, $, IntersectionObserver,
        Element: window.Element, Node: window.Node, Event: window.Event,
        getComputedStyle: window.getComputedStyle }, stubs);
    stubs[bootstrapPath] = { ScrollSpy: load('node_modules/bootstrap/js/dist/scrollspy.js') };
    let nextId = 0;
    const scrolls = [];
    const context = {
        __config: { articleDirectory: { number, autoWidthScroll: true } },
        __tools: {
            randomString: () => String(++nextId).padStart(6, 'a'),
            tempReplacement: (template, name, html) => template.replace(`##${name}##`, html),
            actScroll: (...args) => scrolls.push(args),
        },
        __event: { scroll: { handle: [], temScroll: 0, docScroll: 0, homeScroll: 0 }, resize: { handle: [] } },
    };
    return { dom, document, $, observers, headers, context, scrolls, load };
}

test('目录跟踪文档滚动，分级标题前后滚动均切换高亮，保留编号和点击定位', t => {
    const h = directoryHost('<h1 id="intro">介绍</h1><h2>配置</h2><h3>详细配置</h3>');
    t.after(() => h.dom.window.close());
    h.load('src/components/articleDirectory/articleDirectory.js').default(h.context);
    const links = Array.from(h.document.querySelectorAll('#articleDirectory .nav-link'));
    assert.equal(links.length, 3);
    assert.deepEqual(links.map(link => link.textContent.trim()), ['1. 介绍', '1.1. 配置', '1.1.1. 详细配置']);
    assert.equal(links[0].getAttribute('href'), '#intro');
    assert.equal(h.headers[0].id, 'intro');
    const observer = h.observers[0];
    assert.equal(h.observers.length, 1);
    assert.equal(observer.options.root, null);
    assert.deepEqual(observer.targets, h.headers);
    const entry = (index, isIntersecting) => ({ target: h.headers[index], isIntersecting });
    const active = () => links.findIndex(link => link.classList.contains('active'));
    observer.callback([entry(0, true)]);
    assert.equal(active(), 0);
    h.document.documentElement.scrollTop = 650;
    observer.callback([entry(0, false), entry(1, true)]);
    assert.equal(active(), 1);
    h.document.documentElement.scrollTop = 1050;
    observer.callback([entry(1, false), entry(2, true)]);
    assert.equal(active(), 2);
    h.document.documentElement.scrollTop = 650;
    observer.callback([entry(2, false), entry(1, true)]);
    assert.equal(active(), 1);
    h.$(links[1]).triggerHandler('click');
    assert.deepEqual(h.scrolls, [[603, 500]]);
});

test('目录销毁释放 ScrollSpy 和自身监听，保留外部点击处理', t => {
    const h = directoryHost('<h1>介绍</h1><h2>配置</h2>', false);
    t.after(() => h.dom.window.close());
    h.load('src/components/articleDirectory/articleDirectory.js').default(h.context);
    const links = h.$('#articleDirectory .nav-link');
    assert.deepEqual(links.map((index, link) => link.textContent.trim()).get(), ['介绍', '配置']);
    let externalClicks = 0;
    links.on('click.external', () => externalClicks++);
    const dispose = h.load('src/core/resources.js').default(h.context).dispose;
    dispose();
    dispose();
    assert.equal(h.observers[0].disconnected, true);
    assert.equal(h.context.__event.scroll.handle.length, 0);
    assert.equal(h.context.__event.resize.handle.length, 0);
    links.eq(0).triggerHandler('click');
    assert.equal(externalClicks, 1);
    assert.equal(h.scrolls.length, 0);
});

test('正文没有标题时不创建目录和滚动观察器', t => {
    const h = directoryHost('<p>正文</p>');
    t.after(() => h.dom.window.close());
    h.load('src/components/articleDirectory/articleDirectory.js').default(h.context);
    assert.equal(h.document.querySelector('#articleDirectory'), null);
    assert.equal(h.observers.length, 0);
    assert.equal(h.context.__event.scroll.handle.length, 0);
    assert.equal(h.context.__event.resize.handle.length, 0);
});

function domHost(markup, stubs = {}) {
    const dom = new JSDOM(`<!doctype html>${markup}`, { url: 'https://example.com/article' });
    const { window } = dom;
    const { document } = window;
    const $ = require('jquery')(window);
    const intervals = new Map(), timeouts = new Map();
    let nextId = 0;
    window.setInterval = (callback, delay) => { intervals.set(++nextId, { callback, delay }); return nextId; };
    window.clearInterval = id => intervals.delete(id);
    window.setTimeout = (callback, delay) => { timeouts.set(++nextId, { callback, delay }); return nextId; };
    window.clearTimeout = id => timeouts.delete(id);
    const load = runtime({ window, document, $, DOMParser: window.DOMParser }, stubs);
    const context = {
        __config: require('json5').parse(fs.readFileSync(path.join(root, 'src/components/config/config.json5'), 'utf8')),
        __status: { user: 'demo', articleId: 1, url: 'https://example.com/article', homeUrl: 'https://example.com/' },
        __timeIds: {}, __event: { scroll: { handle: [] }, resize: { handle: [] } },
        __tools: load('src/utils/tools.js').default(),
    };
    return { dom, window, document, $, intervals, timeouts, context, load };
}

test('HTML 转义保留字面文本，脚本过滤处理多行、相邻及嵌套模板中的脚本', () => {
    const html = runtime()('src/utils/html.js');
    const value = '<img alt="a&b" onerror=\'alert(1)\'>&lt;';
    const encoded = html.escapeHtml(value);
    const parsed = new parserWindow.DOMParser().parseFromString(`<p>${encoded}</p>`, 'text/html');
    assert.equal(parsed.querySelector('p').textContent, value);
    assert.equal(parsed.querySelector('img'), null);
    const clean = html.removeScripts('<style>p{color:red}</style><p>正文</p><script\ntype="text/javascript">one()</script><SCRIPT>two()</SCRIPT><template><script>three()</script><b>模板</b></template>');
    assert(!/<script/i.test(clean));
    assert(clean.includes('<p>正文</p>'));
    assert(clean.includes('<style>p{color:red}</style>'));
    assert(clean.includes('<template><b>模板</b></template>'));
});

test('分类、标签和推荐数中的 HTML 字符保持为文本', t => {
    const h = domHost('<div id="articleInfo"></div><a id="tag"></a><span id="digg_count"></span><div id="main"><div class="postTitle"><a>标题</a></div><div class="postDesc">posted @ 2026-10-20 00:00</div></div>');
    t.after(() => h.dom.window.close());
    const payload = '<img src=x onerror="alert(1)">';
    h.$('#tag').text(payload).attr('href', '/tag?name=" onclick="alert(1)');
    h.context.__tools.articleInfo(h.$('#tag'), 2);
    const tag = h.document.querySelector('#articleInfo a');
    assert.equal(tag.querySelector('span').textContent, ' ' + payload);
    assert.equal(tag.hasAttribute('onclick'), false);
    h.$('#digg_count').text(payload);
    h.load('src/components/postList/postList.js').setPostMeta();
    assert(h.$('.postMeta').text().includes(payload));
    assert.equal(h.$('#articleInfo img, .postMeta img').length, 0);
});

test('打字标题包含 HTML 标记时逐字显示文本，不创建元素', t => {
    const h = domHost('<div id="title"></div><span id="cursor"></span>');
    t.after(() => h.dom.window.close());
    const value = '<img src=x onerror="alert(1)">';
    h.load('src/vendor/consoleText/consoleText.js').default([value], 'title', 'cursor', undefined, false);
    const typing = Array.from(h.intervals.values()).find(timer => timer.delay === 180).callback;
    for (let index = 0; index < value.length; index++) typing();
    assert.equal(h.$('#title').text(), value);
    assert.equal(h.$('#title img').length, 0);
    assert.equal(h.$('#cursor').text(), '_');
});

test('图片灯箱保留尺寸、样式和字面 alt，属性内容不能创建额外元素或事件', t => {
    const h = domHost('<div id="cnblogs_post_body"><img src="/photo.png"><img class="code_img_closed" src="/code.png"></div>', {
        [path.join(root, 'src/vendor/fancybox/jquery.fancybox')]: {},
        [path.join(root, 'src/vendor/fancybox/jquery.fancybox.min.css')]: {},
    });
    t.after(() => h.dom.window.close());
    const alt = '"><img src=x onerror="alert(1)">';
    h.$('#cnblogs_post_body img').first().attr({ alt, width: '200', height: '100', style: 'width: 50%;' });
    h.load('src/components/imgBox/imgBox.js').default(h.context);
    Array.from(h.timeouts.values()).find(timer => timer.delay === 800).callback();
    assert.equal(h.$('[data-fancybox="gallery"]').length, 1);
    const image = h.$('[data-fancybox="gallery"] img');
    assert.equal(image.attr('alt'), alt);
    assert.equal(image.attr('width'), '200');
    assert.equal(image.attr('height'), '100');
    assert.equal(image.attr('style'), 'width: 50%;');
    assert.equal(h.$('[onerror]').length, 0);
    assert.equal(h.$('#cnblogs_post_body img').length, 2);
});

test('新评论的用户名和正文保持字面文本，链接属性不会变成事件', t => {
    const h = domHost('<div id="blog-comments-placeholder"></div><div class="comment_my_posted"><a></a></div><div class="bq_post_comment"></div>', {
        [path.join(root, 'src/images/webp/default_avatar.webp')]: '/avatar.webp',
    });
    t.after(() => h.dom.window.close());
    h.context.__config.animate.avatar.enable = false;
    h.context.__config.animate.typing.enable = false;
    const payload = '<img src=x onerror="alert(1)">';
    h.$('.comment_my_posted a').text(payload).attr('href', '/user?name=" onclick="alert(1)');
    h.$('.bq_post_comment').text(payload);
    h.load('src/components/comment/comment.js').default(h.context);
    h.$(h.document).triggerHandler('ajaxSuccess', [{}, { url: 'PostComment/Add.aspx' }]);
    assert.equal(h.$('.blog_comment_body p').text(), payload);
    assert.equal(h.$('#a_comment_author_5168811').text(), payload);
    assert.equal(h.$('.feedbackItem [onclick], .feedbackItem [onerror]').length, 0);
    assert.equal(h.$('.feedbackItem img').length, 1);
});

test('复制声明保留自定义 HTML，选中文本和作者不能注入 HTML', t => {
    const h = domHost('<div id="cnblogs_post_body"></div>', {
        [path.join(root, 'src/template/articleSuffix.html')]: fs.readFileSync(path.join(root, 'src/template/articleSuffix.html'), 'utf8'),
        [path.join(root, 'src/style/articleSuffix.css')]: {},
        [path.join(root, 'src/images/webp/default_avatar.webp')]: '/avatar.webp',
    });
    t.after(() => h.dom.window.close());
    const payload = '<img src=x onerror="alert(1)">';
    h.context.__config.info.name = payload;
    h.context.__config.articleSuffix.aboutHtml = '<em>自定义介绍</em>';
    h.context.__config.articleSuffix.copyInfo = { enable: true, length: 0, copyright: '<strong>版权所有 &amp; 保留</strong>' };
    h.window.getSelection = () => ({ toString: () => payload });
    h.load('src/components/articleSuffix/articleSuffix.js').default(h.context);
    assert.equal(h.$('#articleSuffix em').text(), '自定义介绍');
    assert.equal(h.$('#articleSuffix [onerror]').length, 0);
    const clipboard = {};
    const event = new h.window.Event('copy', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', { value: { setData: (type, value) => { clipboard[type] = value; } } });
    h.document.body.dispatchEvent(event);
    const result = new h.window.DOMParser().parseFromString(clipboard['text/html'], 'text/html');
    assert.equal(result.querySelector('img'), null);
    assert.equal(result.querySelector('strong').textContent, '版权所有 & 保留');
    assert(result.body.textContent.includes(payload));
    assert(clipboard['text/plain'].includes('版权所有&保留'));
    assert(clipboard['text/plain'].startsWith(payload));
});

test('侧栏最新评论保留标题链接和编号处理，正文、作者和标题不解释为 HTML', t => {
    const h = domHost('<div id="sidebar_recentcomments"><ul><li class="recent_comment_title"><a href="/article#comment">1. 标题</a></li><li class="recent_comment_body"></li><li class="recent_comment_author"></li></ul></div><div id="sb-recentComments"></div>', {
        [path.join(root, 'src/template/sidebar.html')]: '',
        [path.join(root, 'src/template/sidebarNav.html')]: '',
        [path.join(root, 'src/style/menu_bubble.css')]: {},
        [path.join(root, 'src/components/sidebar/lib/main4.js')]: () => ({}),
        [path.join(root, 'src/images/webp/default_avatar.webp')]: '/avatar.webp',
        [path.join(root, 'src/images/sidebar_bg_4.png')]: '/sidebar.png',
    });
    t.after(() => h.dom.window.close());
    const payload = '<img src=x onerror="alert(1)">';
    h.$('.recent_comment_title a').text('1. ' + payload);
    h.$('.recent_comment_body, .recent_comment_author').text(payload);
    h.load('src/components/sidebar/sidebar.js').default(h.context);
    h.intervals.get(h.context.__timeIds.commentsTId).callback();
    assert.equal(h.$('#sb-recentComments a').text(), payload);
    assert.equal(h.$('#sb-recentComments a').attr('href'), '/article#comment');
    assert.equal(h.$('#sb-recentComments .sb-recent_comment_body').text(), payload);
    assert.equal(h.$('#sb-recentComments .sb-recent_comment_author').text(), payload);
    assert.equal(h.$('#sb-recentComments img').length, 0);
});

test('文章信息中的推荐数不会从文本重新解释为 HTML', t => {
    const h = domHost('<div id="articleInfo"></div><div id="cnblogs_post_body"></div><a id="cb_post_title_url">标题</a><div class="postDesc">posted @ 2026-10-20 00:00</div><span id="post_view_count">1</span><span id="post_comment_count">2</span><span id="digg_count"></span>');
    t.after(() => h.dom.window.close());
    const payload = '<img src=x onerror="alert(1)">';
    h.context.__config.animate.articleTitle.enable = false;
    h.$('#digg_count').text(payload);
    h.load('src/components/articleInfo/articleInfo.js').default(h.context);
    h.intervals.get(h.context.__timeIds.postDescTid).callback();
    assert(h.$('#articleInfo .postMeta').text().includes(payload));
    assert.equal(h.$('#articleInfo img').length, 0);
});
