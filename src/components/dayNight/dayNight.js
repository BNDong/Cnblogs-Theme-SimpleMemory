/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 日夜间模式处理
 */
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
    _.__status.dayNightCssHref = ''; // 夜间模式css样式文件路径，用于记录webpack打包后路径

    /**
     * 判断当前日/夜模式
     */
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

    /**
     * 判断是否强制夜间
     */
    (() => {
        if (_.__config.switchDayNight.nightMode) daySwitch = '';
    })();

    /**
     * 设置基础模版
     */
    (() => {
        $('body').prepend(_.__tools.tempReplacement(dayNightTemp, 'daySwitch', daySwitch));
    })();

    /**
     * 初始化样式
     */
    (() => {
        if (!daySwitch) loadDarkCss();
    })();

    /**
     * 模式切换事件
     */
    (() => {
        $('#dayNightSwitch .onOff').click(function () {
            if ($(this).hasClass('daySwitch')) { // 夜间
                _.__tools.setCookie(cookieKey, 'night', exp);
                $(this).removeClass('daySwitch');
                loadDarkCss();
                dayNightControl(_, 'night');
            } else { // 日间
                _.__tools.setCookie(cookieKey, 'day', exp);
                $(this).addClass('daySwitch');
                $('head link#baseDarkCss').remove();
                dayNightControl(_, 'day');
            }
        });
    })();

    /**
     * 加载夜间模式样式文件
     * 第一次初始化使用 import 加载并记录路径
     * 第二次及以后使用标签构建文件加载
     */
    function loadDarkCss() {
        if (_.__status.dayNightCssHref) {
            $('head').append('<link type="text/css" id="baseDarkCss" rel="stylesheet" href="'+_.__status.dayNightCssHref+'">');
        } else {
            import(/* webpackChunkName: "dayNight" */ '../../style/base.dark.css');

            setTimeout(function () {
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