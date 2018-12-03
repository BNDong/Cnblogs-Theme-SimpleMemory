var a = $(document);
a.ready(function () {
    var b = $('body'),
        c = 'cnblogs_post_body',
        d = 'sideToolbar',
        e = 'sideCatalog',
        f = 'sideCatalog-catalog',
        g = 'sideCatalogBtn',
        h = 'sideToolbar-up',
        i = '<div id="sideToolbar"style="display:none;">\<div class="sideCatalogBg"id="sideCatalog">\<div id="sideCatalog-sidebar">\<div class="sideCatalog-sidebar-top"></div>\<div class="sideCatalog-sidebar-bottom"></div>\</div>\<div id="sideCatalog-catalog">\<ul class="nav"style="width:230px;zoom:1">\</ul>\</div>\</div>\<a href="javascript:void(0);"id="sideCatalogBtn"class="sideCatalogBtnDisable"></a>\</div>',
        j = '',
        k = 200,
        l = 0,
        m = 0,
        n = 0,
        o, p = 18,
        q = true,
        r = true,
        s = $('#' + c);
    if (s.length === 0) {
        return
    };
    b.append(i);
    o = s.find(':header');
    if (o.length > p) {
        r = false;
        var t = s.find('h1');
        var u = s.find('h2');
        if (t.length + u.length > p) {
            q = false
        }
    };
    o.each(function (t) {
        var u = $(this),
            v = u[0];
        
        if ($.inArray((v.tagName.toLowerCase()), ["h1", "h2"]) == -1) return true;
        
        var title=u.text();
        var text=u.text();

        u.attr('id', 'autoid-' + l + '-' + m + '-' + n);

        if (v.localName === 'h1') {
            l++;
            m = 0;
            if(text.length>26) text=text.substr(0,26)+"...";

            var titleContent = text.replace(/^\d+\|[0-9]+/g, '');

            j += '<li lin=""><a href="#' + u.attr('id') + '" title="' + title + '">' + (text.replace('|', '.').replace(titleContent, '&nbsp;&nbsp;'+titleContent)) + '</a><span class="sideCatalog-dot"></span></li>';
        } else if (v.localName === 'h2') {
            m++;
            n = 0;
            if(q){
                if(text.length>30) text=text.substr(0,30)+"...";

                var titleContent = text.replace(/^\d+\|[0-9]+/g, '');

                j += '<li class="h2Offset"><a href="#' + u.attr('id') + '" title="' + title + '">' + (text.replace('|', '.').replace(titleContent, '&nbsp;&nbsp;'+titleContent)) + '</a></li>';
            }
        }
    });
    $('#' + f + '>ul').html(j);
    b.data('spy', 'scroll');
    b.data('target', '.sideCatalogBg');
    $('body').scrollspy({
        target: '.sideCatalogBg'
    });
    $sideCatelog = $('#' + e);
    $('#' + g).on('click', function () {
        if ($(this).hasClass('sideCatalogBtnDisable') && $sideCatelog.css('visibility') == 'visible') {
            $sideCatelog.css('visibility', 'hidden');
            $(this).removeClass('sideCatalogBtnDisable');
        } else {
            $sideCatelog.css('visibility', 'visible');
            $(this).addClass('sideCatalogBtnDisable');
        }
    });
    $('#' + h).on('click', function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    });
    $sideToolbar = $('#' + d);

    var nav_li = $('#sideCatalog-catalog ul li');
    
    if (nav_li.length == 0) {
        $sideCatelog.css('visibility', 'hidden');
        $('#' + g).removeClass('sideCatalogBtnDisable');
    }
});
