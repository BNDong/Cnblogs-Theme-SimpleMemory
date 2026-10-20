/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: hljs渲染代码
 */
import resources from '../../../core/resources';
import loadHighlighter from './languages';

export default function main(_, setCodeLine) {
    let theme = _.__config.code.options.hljs.theme.toLowerCase();

    Promise.all([
        import(/* webpackChunkName: "hljs/[request]" */ `highlight.js/styles/${theme}.css`),
        loadHighlighter(_.__config.code.options.hljs.languages, $('code-box pre')),
    ]).then(([module, hljs]) => {
        let code = $('code-box pre');
        let bgFlg = $.inArray(theme, [
            'github-gist', 'googlecode', 'grayscale',
            'idea', 'isbl-editor-light', 'qtcreator_light',
            'tomorrow', 'vs', 'xcode', 'arduino-light',
            'ascetic', 'color-brewer', 'lightfair'
        ]) !== -1;

        (() => {
            if (_.__config.code.options.hljs.languages.length) {
                hljs.configure({
                    languages: _.__config.code.options.hljs.languages
                });
            }

            $.each(code, function (i, e) {
                let obj = $(code[i]);

                obj.css('white-space', 'pre').html().replace(/\<br\>/g, '\n');

                obj.text(obj.text());

                bgFlg && obj.css('background', '#f5f5fa');

                hljs.highlightElement(e);

                $('.clipboard[boxid='+ obj.attr('boxid') +']').addClass('hljs-comment');
            });
        })();

        let setCodeHljsLen = () => {
            let codeBox = $('code-box');
            $.each(codeBox, function (i, e) {
                let obj = $(codeBox[i]);
                let claArr = obj.find('pre').attr('class').split(" ");
                for (let claName of claArr) {
                    let tem = claName.match(/.*(language-[a-z0-9]+)\s?.*/);
                    if (!!tem && tem.length > 0) {
                        obj.find('.code-hljs-len').text(tem[1].replace(/language-/g, '')).css('visibility', 'visible');
                        break;
                    }
                }
            });
        }

        (() => {
            _.__timeIds.hljsCodeTId = resources(_).interval(() => {
                let preHljs = $('pre.hljs');
                if (preHljs.length > 0) {
                    $('code-box .code-tools').css('background', $('pre.hljs').css('background'))
                        .prepend('<hljs-len class="code-hljs-len"></hljs-len>');

                    setCodeHljsLen();
                    _.__tools.clearIntervalTimeId(_.__timeIds.hljsCodeTId);
                }
            }, 1000);
        })();

        (() => {
            setCodeLine();
        })();
    });
}
