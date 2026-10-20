/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 日夜间模式处理
 */
import resources from '../../core/resources';
import dayNightTemp from '../../template/dayNight.html';
import dayNightControl from "../../hooks/dayNightControl";

export default function main(_) {

    if (!_.__config.switchDayNight.enable) {
        return true;
    }

    let h         = parseInt(new Date().getHours()),
        cookieKey = 'cnblogs_config_isNight',
        exp       =  4 * 3600,
        daySwitch;
    _.__status.dayNightCssHref = '';

    const commentBackgroundHandler = (dayStatus) => {
        if (!_.__config.articleComment.background.enable) return;
        dayStatus === 'day'
            ? $('textarea').css('background', _.__config.articleComment.background.options.day)
            : $('textarea').css('background', _.__config.articleComment.background.options.night)
    };

    (() => {
        switch (_.__tools.getCookie(cookieKey)) {
            case 'day':
                daySwitch = 'daySwitch'; break;
            case 'night':
                daySwitch = ''; break;
            default:
                daySwitch = _.__config.switchDayNight.auto.enable ?
                    (h >= _.__config.switchDayNight.auto.nightHour ? '' :
                            (h >= _.__config.switchDayNight.auto.dayHour ? 'daySwitch' : '')
                    ) : 'daySwitch'; break;
        }
    })();

    (() => {
        if (_.__config.switchDayNight.nightMode) daySwitch = '';
    })();

    (() => {
        $('body').prepend(_.__tools.tempReplacement(dayNightTemp, 'daySwitch', daySwitch));
    })();

    (() => {
        if (!daySwitch) loadDarkCss();
    })();

    (() => {
        resources(_).onJQuery($('#dayNightSwitch .onOff'), 'click', function () {
            if ($(this).hasClass('daySwitch')) {
                _.__tools.setCookie(cookieKey, 'night', exp);
                $(this).removeClass('daySwitch');
                loadDarkCss();
                dayNightControl(_, 'night');
                commentBackgroundHandler('night');
            } else {
                _.__tools.setCookie(cookieKey, 'day', exp);
                $(this).addClass('daySwitch');
                $('head link#baseDarkCss').remove();
                dayNightControl(_, 'day');
                commentBackgroundHandler('day');
            }
        });
    })();

    (() => {
        daySwitch ? commentBackgroundHandler('day') : commentBackgroundHandler('night');
    })();

    // 首次通过 import 加载并记录样式路径，之后直接创建 link。
    function loadDarkCss() {
        if (_.__status.dayNightCssHref) {
            $('head').append('<link type="text/css" id="baseDarkCss" rel="stylesheet" href="'+_.__status.dayNightCssHref+'">');
        } else {
            import(/* webpackChunkName: "dayNight" */ '../../style/base.dark.css');

            resources(_).timeout(function () {
                let links = $('head link');
                for (let i = links.length - 1; i > 0; i--) {
                    let obj  = $(links[i]);
                    let href = obj.attr('href');
                    if (/^.*\/dayNight\.[a-z0-9]{8}\.css$/.test(href)) {
                        _.__status.dayNightCssHref = href;
                        obj.attr('id', 'baseDarkCss');
                        break;
                    }
                }
            }, 500);
        }
    }
}