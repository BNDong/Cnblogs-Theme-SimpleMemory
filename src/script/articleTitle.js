$(document).ready(function () {
    const s       = $('#cnblogs_post_body'),
          tools   = new myTools;

    if (s.length === 0) return;
    const h = s.find(':header');
    if (h.length === 0) return;

    // 开始获取页面顶级标题
    let topLev = (s.find('h1').length ? 1 : false)
        || (s.find('h2').length ? 2 : false)
        || (s.find('h3').length ? 3 : false)
        || (s.find('h4').length ? 4 : false)
        || (s.find('h5').length ? 5 : false)
        || (s.find('h6').length ? 6 : false);
    if (!topLev || topLev > 4) return;

    // 处理标题缩放级别
    let hScale = {};
    for (let i = topLev, j = 1; i < 6; i++, j = j - 0.1) {
        hScale['h'+i] = j.toFixed(1);
    }

    let topHT = 'h' + topLev, topTwHT = 'h' + (topLev + 1), topHTN = 0, topTwHTN = 0, bw = s.outerWidth(false);
    h.each(function () {
        let u = $(this), v = u[0], ht = v.tagName.toLowerCase(), ln = 1, rn = 0, style = '', icon = '';
        if (ht === 'h6') return true;
        u.attr('tid', 'tid-' + tools.randomString(6));
        let thText = tools.HTMLEncode(u.text()), headerStyle = 'transform:scale('+ hScale[ht] +');';

        // 判断标题级别
        switch (ht) {
            case topHT: // 一级标题
                topHTN++; ln = topHTN; topTwHTN = 0;
                break;

            case topTwHT: // 二级标题
                style = 'position: relative;left: -5px;';
                topTwHTN++; ln = topHTN; rn = topTwHTN;
                headerStyle += 'left: -' +  (((1 - hScale[ht]) * bw / 2) - ((1 - hScale[ht]) * 10 * 8)).toFixed(2) + 'px;';
                break;

            default: // 其它级别标题
                style = 'visibility: hidden;';
                icon  = '<span class="iconfont icon-weibiaoti22 titleIcon" style="left: '+ (40 - ((1 - hScale[ht] - 0.1) * 80)).toFixed(2) + 'px;"></span>';
                headerStyle += 'left: -' +  (((1 - hScale[ht]) * bw / 2) - ((1 - hScale[ht]) * 10 * 8)).toFixed(2) + 'px;';
                break;
        }

        u.wrap('<span title-type="' + ht + '" class="header__span" style="' + headerStyle + '"></span>').text('').addClass('header__dev');

        var thHtml = '<span style="' + style + '"><b class="dev__fe"><i>' + ln + '</i></b>';
        thHtml += '<span class="dev__slash">|</span>';
        thHtml += '<b class="dev__ux"><i>' + rn + '</i></b></span>';
        thHtml += icon + '<b class="dev__developer"><span class="dev__title">' + thText + '</span></b>';

        u.append(thHtml);

        u.parent(".header__span").hover(
            function(){
                $(this).find('.header__dev').addClass("header__dev--open");
            } ,
            function(){
                $(this).find('.header__dev').removeClass("header__dev--open");
            }
        );
    });

});