/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: hljs渲染代码
 */
import hljs from 'highlight.js';

export default function main(_, setCodeLine) {
    let theme = _.__config.code.options.hljs.theme.toLowerCase();

    import(/* webpackChunkName: "hljs/[request]" */ `highlight.js/styles/${theme}.css`).then(module => {
        let code  = $('code-box pre');
        let bgFlg = $.inArray(theme, [
            'github-gist', 'googlecode', 'grayscale',
            'idea', 'isbl-editor-light', 'qtcreator_light',
            'tomorrow', 'vs', 'xcode', 'arduino-light',
            'ascetic', 'color-brewer', 'lightfair'
        ]) !== -1;

        /**
         * 渲染代码
         */
        (() => {
            // 语言范围设置
            if (_.__config.code.options.hljs.languages.length) {
                hljs.configure({
                    languages: _.__config.code.options.hljs.languages
                });
            }

            // 渲染代码
            $.each(code, function (i, e) {
                let obj = $(code[i]);

                // 做一次换行兼容处理
                obj.css('white-space', 'pre').html().replace(/\<br\>/g, '\n');

                // 清除代码原有样式
                obj.text(obj.text());

                // 替换白色背景的主题
                bgFlg && obj.css('background', '#f5f5fa');

                // 开始渲染代码
                hljs.highlightElement(e);

                // 设置复制按钮颜色
                $('.clipboard[boxid='+ obj.attr('boxid') +']').addClass('hljs-comment');
            });
        })();

        /**
         * 显示自动识别语言
         */
        let setCodeHljsLen = () => {
            let codeBox = $('code-box');
            $.each(codeBox, function (i, e) {
                let obj = $(codeBox[i]);
                let cla = obj.find('pre').attr('class');
                let len = $.trim(cla.replace(/hljs/g, '').replace(/code-pre-line/g, ''));
                if (len) {
                    let tem = len.match(/.*(language-[a-z0-9]+)\s?.*/);
                    if (!!tem && tem.length > 0) {
                        obj.find('.code-hljs-len').text(tem[1].replace(/language-/g, '')).css('visibility', 'visible');
                    } else {
                        obj.find('.code-hljs-len').text(len).css('visibility', 'visible');
                    }
                }
            });
        }

        /**
         * 设置工具条背景色 & 添加语言标签
         */
        (() => {
            _.__timeIds.hljsCodeTId = window.setInterval(() => {
                let preHljs = $('pre.hljs');
                if (preHljs.length > 0) {
                    $('code-box .code-tools').css('background', $('pre.hljs').css('background'))
                        .prepend('<hljs-len class="code-hljs-len"></hljs-len>');

                    setCodeHljsLen();
                    _.__tools.clearIntervalTimeId(_.__timeIds.hljsCodeTId);
                }
            }, 1000);
        })();

        /**
         * 设置行号
         */
        (() => {
            setCodeLine();
        })();
    });
}