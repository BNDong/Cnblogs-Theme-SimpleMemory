$(document).ready(function () {
    var cbody   = $('body'),
        cparent = 'cnblogs_post_body',
        ch1,
        ch2,
        s = $('#' + cparent);
    if (s.length === 0) {
        return
    }
    ch1 = s.find('h1');
    ch2 = s.find('h2');

    if (ch1.length > 0) {
        for (var i = 0; i < ch1.length; i++) {
            var th1 = $(ch1[i]);
            th1.wrap('<span title-type="h1" class="header__span"></span>');
            var th1Text = th1.text();
            th1.text('');
            th1.addClass('header__dev');
            var th1Html = '<b class="dev__fe"><i>'+(i+1)+'</i></b>';
            th1Html += '<span class="dev__slash">|</span>';
            th1Html += '<b class="dev__ux"><i>0</i></b>';
            th1Html += '<b class="dev__developer"><span class="dev__title">'+th1Text+'</span></b>';
            th1.append(th1Html);
            th1.parents('.header__span').after('<br>');
            th1.parent(".header__span").hover(
                function(){
                    $(this).find('.header__dev').addClass("header__dev--open");
                } ,
                function(){
                    $(this).find('.header__dev').removeClass("header__dev--open");
                }
            ) ;
        }
    }

    if (ch2.length > 0) {
        var num  = 0;
        var last = 0;
        for (i = 0; i < ch2.length; i++) {
            var th2 = $(ch2[i]);
            th2.wrap('<span title-type="h2" class="header__span"></span>');
            var th2Text = th2.text();
            th2.text('');
            th2.addClass('header__dev');
            var their = th2.parents('.header__span').prevAll('.header__span[title-type="h1"]');
            if (their.length > 0) {
                their = $(their[0]);
                var current  = their.find('.dev__fe i').text();
                if (current != last) {
                    num  = 0;
                }
                last = current;
            } else {
                num = 0;
            }
            var th2Html = '<b class="dev__fe"><i>'+last+'</i></b>';
            th2Html += '<span class="dev__slash">|</span>';
            th2Html += '<b class="dev__ux"><i>'+(++num)+'</i></b>';
            th2Html += '<b class="dev__developer"><span class="dev__title">'+th2Text+'</span></b>';
            th2.append(th2Html);
            th2.parents('.header__span').after('<br>');
            th2.parent(".header__span").hover(
                function(){
                    $(this).find('.header__dev').addClass("header__dev--open");
                } ,
                function(){
                    $(this).find('.header__dev').removeClass("header__dev--open");
                }
            ) ;
        }
    }
});