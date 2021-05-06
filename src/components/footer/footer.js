/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: footer
 */
import footerTemp from '../../template/footer.html';
import footerImg from './../../images/webp/footer.webp';
import backgroundImg from './../../images/webp/background.webp';
import cloudsImg from './../../images/webp/clouds.webp';
import foregroundImg from './../../images/webp/foreground.webp';

export default function main(_) {

    const footer = $('#footer');
    const footerText = footer.text();

    let footerHtml = footerTemp;
    let config = _.__config.footer;

    footerHtml = _.__tools.tempReplacement(footerHtml, 'footerText', footerText);

    /**
     * 设置标语
     */
    (() => {
        if (config.text.left || config.text.right) {
            let re = [
                ['textLeft', config.text.left],
                ['iconFont', config.text.iconFont.icon],
                ['iconColor', config.text.iconFont.color],
                ['iconSize', config.text.iconFont.fontSize],
                ['textRight', config.text.right],
                ['textShow', 'block'],
            ];
            footerHtml = _.__tools.batchTempReplacement(footerHtml, re);
        } else {
            footerHtml = _.__tools.tempReplacement(footerHtml, 'textShow', 'none');
        }
    })();

    /**
     * 设置友情链接
     */
    (() => {
        if (_.__config.links.footer.length > 0) {
            let linksHtml = '友情链接：';
            for(let i = 0; i < _.__config.links.footer.length; i++) {
                linksHtml += '<a href="'+(_.__config.links.footer[i][1])+'" target="_blank">'+(_.__config.links.footer[i][0])+'</a>';
                if (i < _.__config.links.footer.length - 1) linksHtml += '<span style="margin: 0 3px;">/</span>';
            }
            footerHtml = _.__tools.batchTempReplacement(footerHtml, [
                ['linksHtml', linksHtml],
                ['linkShow', 'block']
            ]);
        } else {
            footerHtml = _.__tools.tempReplacement(footerHtml, 'linkShow', 'none');
        }
    })();

    /**
     * 设置网站统计ID
     */
    (() => {
        if (_.__config.cnzz) footerHtml = _.__tools.tempReplacement(footerHtml, 'cnzzId', _.__config.cnzz);
    })();

    /**
     * 添加页脚
     */
    (() => {
        footer.html(footerHtml);
    })();

    /**
     * 页脚样式
     */
    (() => {
        switch (parseInt(config.style)) {
            case 1:
                $('#footer').addClass('footer-t1').find('#footerStyle1')
                    .show().css('background', 'url(\'' + footerImg + '\')  no-repeat 50%');
                break;
            case 2:
            default:
                $('#footer .footer-text').css({
                    'padding-bottom': '0',
                    'border-bottom': 'none',
                    'margin-bottom':  '0'
                });
                let footerStyle2 = $('#footerStyle2');
                footerStyle2.show().find('.clouds').css('background', 'url(\'' + cloudsImg + '\')  repeat-x');
                footerStyle2.find('.background').css('background', 'url(\'' + backgroundImg + '\')  repeat-x');
                footerStyle2.find('.foreground').css('background', 'url(\'' + foregroundImg + '\')  repeat-x');
                break;
        }
    })();

    /**
     * 设置运行时间
     */
    (() => {
        window.setInterval( () => {
            let runDate = _.__tools.getRunDate(_.__config.info.startDate ? _.__config.info.startDate : '2021-01-01');
            $('#blogRunTimeSpan').text('This blog has running : '+runDate.daysold+' d '+runDate.hrsold+' h '+runDate.minsold+' m '+runDate.seconds+' s');
        }, 500 );
    })();

    /**
     * 定时网站统计
     */
    (() => {
        if (_.__config.cnzz) {
            _.__timeIds.cnzzTId = window.setInterval( () => {
                let cnzzStat = $('.id_cnzz_stat_icon a');
                if (cnzzStat.length > 0) {
                    let cnzzInfo = [];
                    let cnzzArr  = $(cnzzStat[1]).text().split('|');
                    $.each(cnzzArr, (i) => {
                        let str = $.trim(cnzzArr[i]);
                        if (str !== '') {
                            str = str.replace('今日','Today').replace('昨日','Yesterday').replace('[',':').replace(']','');
                            cnzzInfo.push(str)
                        }
                    });
                    cnzzInfo.push($(cnzzStat[2]).text().replace('当前在线','Online').replace('[',':').replace(']',''));
                    $('#cnzzInfo').text(cnzzInfo.join(' | ')).show();
                    _.__tools.clearIntervalTimeId(_.__timeIds.cnzzTId);
                }
            }, 1000 );
        }
    })();
}