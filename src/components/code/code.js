/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 代码高亮处理
 */
import resources from '../../core/resources';
import ClipboardJS from "clipboard";
import beforeCode from "../../hooks/beforeCode";
import afterCode from "../../hooks/afterCode";

export default function main(_) {
    let preList = $('#main pre');

    beforeCode(_);

    (() => {
        $.each(preList, function (i) {
            let pre = $(preList[i]);
            let boxId = 'code-' + _.__tools.randomString(6);

            pre.wrap('<code-box id="' + boxId + '"></code-box>');
            pre.attr('boxid', boxId);

            pre.css('font-size', _.__config.code.options.fontSize);

            let preCode = pre.find('code');
            if (preCode.length > 0) {
                let codeClass = preCode.attr('class');
                if (codeClass) {
                    let lan = codeClass.match(/.*(language-[a-z0-9]+)\s+.*/);
                    if (!!lan && lan.length > 0) {
                        pre.addClass(lan[1]);
                    }
                }
            }
        });
    })();

    (() => {
        if (_.__config.code.options.macStyle) {
            let codeBox = $('code-box');
            $.each(codeBox, function (i) {
                $(codeBox[i]).prepend('<div class="code-tools"></div>');
            });
        } else {
            preList.css('border-radius', '4px');
        }
    })();

    (() => {
        let codeBox = $('code-box');
        $.each(codeBox, function (i) {
            let code  = $(codeBox[i]);
            let boxId = code.attr('id');

            let copyHtml = '<button boxid="' + boxId + '" type="button" class="clipboard code-copay-btn" data-clipboard-action="copy" data-clipboard-target="#' + boxId + ' pre" aria-label="复制代码" ><i class="simple-memory-iconfont simple-memory-icon-fuzhi1"></i></button>';
            code.prepend(copyHtml);
        });

        resources(_).onJQuery($('code-box .code-copay-btn'), 'click', function () {
            $(this).find('i').removeClass('simple-memory-icon-fuzhi1').addClass('simple-memory-icon-right');
            const boxId = $(this).attr('boxid');
            resources(_).timeout(() => {
                $('code-box button[boxid='+boxId+'] i').removeClass('simple-memory-icon-right').addClass('simple-memory-icon-fuzhi1');
            }, 1500);
        });

        resources(_).onJQuery(codeBox, {
            mouseover : function () {
                $(this).find('.code-copay-btn').css({
                    opacity: 1,
                    visibility: 'visible'
                });
            },
            mouseout : function () {
                $(this).find('.code-copay-btn').css({
                    opacity: 0,
                    visibility: 'hidden'
                });
            }
        });

        const clipboard = new ClipboardJS('.clipboard');
        resources(_).add(() => clipboard.destroy());
    })();

    (() => {
        if (_.__config.code.options.maxHeight)
            $('code-box pre').css('max-height', _.__config.code.options.maxHeight);
    })();

    (() => {
        switch (_.__config.code.type.toLowerCase()) {
            case 'hljs':
                import(/* webpackChunkName: "code-hljs" */ './lib/hljs').then(module => {
                    const main = module.default;
                    main(_, setCodeLine);
                });
                break;

            default:
                preList.css('background', '#f5f5fa');
                $('code-box .code-tools').css('background', '#f5f5fa');
                $('pre .hljs').css({
                    'background': 'none',
                    'border': '0',
                    'border-radius': '0',
                    'padding': '0'
                });
                setCodeLine();
                break;
        }
        afterCode(_);
    })();

    function setCodeLine() {
        if (!_.__config.code.options.line) return true;

        let preList = $('code-box pre');
        $.each(preList, function (i) {
            let pre = $(preList[i]);
            let codeLine = pre.html().replace(/\<br\>/g, '\n').split('\n');
            let code = [];

            $.each(codeLine, (j) => {
                if ($.trim(codeLine[j]) || j < codeLine.length - 1) {
                    codeLine[j] !== '</code>' && code.push('<code-line class="line-numbers-rows"></code-line>' + codeLine[j]);
                }
            });

            pre.html(code.join('\n'));
            pre.addClass('code-pre-line');
        });
    }
}
