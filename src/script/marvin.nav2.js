$(document).ready(function () {
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
        r = false,
        s = $('#' + c),
       tools = new myTools;

    if (s.length === 0) { return };
    b.append(i);

    o = s.find(':header');

    o.each(function () {
        var u = $(this),
            v = u[0];
        if ($.inArray((v.tagName.toLowerCase()), ["h1", "h2"]) === -1) return true;

        var lserialNum   = u.find('.dev__fe').text(),
            rserialNum   = u.find('.dev__ux').text(),
            titleContent = u.find('.dev__developer').text(),
            titleId      = u.attr('tid'),
            hId          = u.attr('id');

        if (!titleId) {
            titleId = tools.randomString(6);
            u.attr('tid', 'tid-' + titleId);
        }

        if (!hId) {
            hId = 'hid-' + tools.randomString(6);
            u.attr('id', hId);
        }

        if (v.localName === 'h1') {
            l++; m = 0; r = true;
            if(titleContent.length>26) titleContent=titleContent.substr(0,26) + "...";
            titleContent = tools.HTMLEncode(titleContent);

            j += '<li h="1" g="'+ lserialNum +'"><a href="#'+hId+'" goto="' + titleId + '" onclick="return false;">' + lserialNum + '.' + rserialNum + '&nbsp;&nbsp;' + titleContent + '</a><span class="sideCatalog-dot"></span></li>';
        } else if (r && v.localName === 'h2') {
            m++; n = 0;
            if(q){

                if(titleContent.length>30) titleContent = titleContent.substr(0,30) + "...";
                titleContent = tools.HTMLEncode(titleContent);

                j += '<li h="2" g="'+ lserialNum +'" class="h2Offset ceg'+lserialNum+'"><a href="#'+hId+'" goto="' + titleId + '" onclick="return false;">' + lserialNum + '.' + rserialNum + '&nbsp;&nbsp;' + titleContent + '</a></li>';
            }
        }
    });

    $('#' + f + '>ul').html(j);
    b.data('spy', 'scroll');
    b.data('target', '.sideCatalogBg');

    b.scrollspy({
        target: '.sideCatalogBg'
    });
    $sideCatelog = $('#' + e);

    $('#' + f + '>ul>li').click(function () {
        var obj = $(this), title = $(':header[tid="'+obj.find('a').attr('goto')+'"]').parent('span.header__span');
        title.length && tools.actScroll(title.offset().top + 3, 800);
    });

    // $('#' + g).on('click', function () {
    //     if ($(this).hasClass('sideCatalogBtnDisable') && $sideCatelog.css('visibility') === 'visible') {
    //         $sideCatelog.css('visibility', 'hidden');
    //         $(this).removeClass('sideCatalogBtnDisable');
    //     } else {
    //         $sideCatelog.css('visibility', 'visible');
    //         $(this).addClass('sideCatalogBtnDisable');
    //     }
    // });

    // $('#' + h).on('click', function () {
    //     $("html,body").animate({
    //         scrollTop: 0
    //     }, 500)
    // });

    // $sideToolbar = $('#' + d);

    var nav_li = $('#sideCatalog-catalog').find('ul li');

    if (nav_li.length === 0) {
        $sideCatelog.css('visibility', 'hidden');
        $('#' + g).removeClass('sideCatalogBtnDisable');
    }

    nav_li.on('activate.bs.scrollspy', function () {
        var gu = $(this).attr("g"),
            catalog = $('#sideCatalog-catalog');
            catalog.find('.h2Offset').hide();
            catalog.find('.ceg' + gu).show();
    })
});