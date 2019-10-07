$(document).ready(function () {
    const cparent = 'cnblogs_post_body',
          s       = $('#' + cparent);

    if (s.length === 0) return;
    const h = s.find(':header');
    if (h.length === 0) return;

    var th = [], th1i = 0, th1set = false, th2num = 0, th2last = 0;
    h.each(function () {
        var u = $(this), v = u[0];
        if ($.inArray((v.tagName.toLowerCase()), ["h1", "h2"]) === -1) return true;
        th.push(u);
    });

    if (th.length > 0) {
        $.each(th, function (i) {
            var u = $(this), v = u[0];

            switch (v.tagName.toLowerCase()) {
                case 'h1':
                    setTh1(u);break;

                case 'h2':
                    if (th1set) setTh2(u, i);break;
            }
        });
    }

    function setTh1(th1) {
        var th1Text = HTMLEncode(th1.text());

        if (!th1set) th1set = true;

        th1.wrap('<span title-type="h1" class="header__span"></span>');
        th1.text('');
        th1.addClass('header__dev');

        var th1Html = '<b class="dev__fe"><i>' + (th1i+1) + '</i></b>';
        th1Html += '<span class="dev__slash">|</span>';
        th1Html += '<b class="dev__ux"><i>0</i></b>';
        th1Html += '<b class="dev__developer"><span class="dev__title">' + th1Text + '</span></b>';

        th1.append(th1Html);
        th1.parents('.header__span').after('<br>');

        th1.parent(".header__span").hover(
            function(){
                $(this).find('.header__dev').addClass("header__dev--open");
            } ,
            function(){
                $(this).find('.header__dev').removeClass("header__dev--open");
            }
        );
        th1i++;
    }

    function setTh2(th2, index) {

        var th2Text = HTMLEncode(th2.text());

        th2.wrap('<span title-type="h2" class="header__span"></span>');
        th2.text('');
        th2.addClass('header__dev');

        var their = [];
        $.each(th, function (i) {
            if (i > index) return false;
            var u = $(this), v = u[0];
            if (v.tagName.toLowerCase() === 'h1') {
                their.push(u.parents('.header__span'));
            }
        });

        if (their.length > 0) {
            their = $(their[their.length - 1]);
            var current  = parseInt(their.find('.dev__fe i').text());
            if (current !== th2last) {
                th2num  = 0;
            }
            th2last = current;
        } else {
            th2num = 0;
        }

        var th2Html = '<b class="dev__fe"><i>' + th2last + '</i></b>';
        th2Html += '<span class="dev__slash">|</span>';
        th2Html += '<b class="dev__ux"><i>' + (++th2num) + '</i></b>';
        th2Html += '<b class="dev__developer"><span class="dev__title">' + th2Text + '</span></b>';

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

    /**
     * @return {string}
     */
    function HTMLEncode(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
});