$(document).ready(function () {
    let b = $('body'),
        c = 'cnblogs_post_body',
        e = 'sideCatalog',
        f = 'sideCatalog-catalog',
        g = 'sideCatalogBtn',
        i = '<div id="sideToolbar"style="display:none;">\<div class="sideCatalogBg"id="sideCatalog">\<div id="sideCatalog-sidebar">\<div class="sideCatalog-sidebar-top"></div>\<div class="sideCatalog-sidebar-bottom"></div>\</div>\<div id="sideCatalog-catalog">\<ul class="nav"style="width:230px;zoom:1">\</ul>\</div>\</div>\<a href="javascript:void(0);"id="sideCatalogBtn"class="sideCatalogBtnDisable"></a>\</div>',
        j = '',
        l = 0,
        m = 0,
        n = 0,
        o,
        q = true,
        r = false,
        s = $('#' + c),
       tools = new myTools;

    if (s.length === 0) return;
    b.append(i); o = s.find(':header');
    if (o.length === 0) return;

    // 开始获取页面顶级标题
    let topLev = (s.find('h1').length ? 1 : false)
        || (s.find('h2').length ? 2 : false)
        || (s.find('h3').length ? 3 : false)
        || (s.find('h4').length ? 4 : false)
        || (s.find('h5').length ? 5 : false)
        || (s.find('h6').length ? 6 : false);
    if (!topLev || topLev > 4) return;

    let topHT = 'h' + topLev, topTwHT = 'h' + (topLev + 1);

    o.each(function () {
        let u = $(this),
            v = u[0];
        if ($.inArray((v.tagName.toLowerCase()), [topHT, topTwHT]) === -1) return true;

        let lserialNum   = u.find('.dev__fe').text(),
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

        if (v.localName === topHT) {
            l++; m = 0; r = true;
            if(titleContent.length>26) titleContent=titleContent.substr(0,26) + "...";
            titleContent = tools.HTMLEncode(titleContent);

            j += '<li h="'+topLev+'" g="'+ lserialNum +'"><a href="#'+hId+'" goto="' + titleId + '" onclick="return false;">' + lserialNum + '.' + rserialNum + '&nbsp;&nbsp;' + titleContent + '</a><span class="sideCatalog-dot"></span></li>';
        } else if (r && v.localName === topTwHT) {
            m++; n = 0;
            if(q){

                if(titleContent.length>30) titleContent = titleContent.substr(0,30) + "...";
                titleContent = tools.HTMLEncode(titleContent);

                j += '<li h="'+(topLev+1)+'" g="'+ lserialNum +'" class="h2Offset ceg'+lserialNum+'"><a href="#'+hId+'" goto="' + titleId + '" onclick="return false;">' + lserialNum + '.' + rserialNum + '&nbsp;&nbsp;' + titleContent + '</a></li>';
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
        let obj = $(this), title = $(':header[tid="'+obj.find('a').attr('goto')+'"]').parent('span.header__span');
        title.length && tools.actScroll(title.offset().top + 3, 800);
    });

    let nav_li = $('#sideCatalog-catalog').find('ul li');

    if (nav_li.length === 0) {
        $sideCatelog.css('visibility', 'hidden');
        $('#' + g).removeClass('sideCatalogBtnDisable');
    }

    nav_li.on('activate.bs.scrollspy', function () {
        let gu = $(this).attr("g"),
            catalog = $('#sideCatalog-catalog');
            catalog.find('.h2Offset').hide();
            catalog.find('.ceg' + gu).show();
    })
});