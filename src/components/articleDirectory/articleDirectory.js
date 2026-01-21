/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章目录处理
 */
import articleDirectoryTemp from '../../template/articleDirectory.html';
import "../../style/articleDirectory.css";
import * as bootstrap from 'bootstrap'

export default function main(_) {
    let body     = $('body');
    let postBody = $('#cnblogs_post_body');
    let header   = postBody.find(':header');

    if (header.length) {
        const tagList = header.map((index, element) => parseInt(element.tagName.replace(/H/g, ''))).get();
        const uniqueTags = [...new Set(tagList)].sort();
        
        // 用于跟踪各级标题的编号
        const counters = {};
        uniqueTags.forEach(level => {
            counters[level] = 0;
        });

        const html = header
            .map((index, element) => {
                const obj = $(element);
                const h = parseInt(obj[0].tagName.replace(/H/g, ''));
                let hid = obj.attr('id');
                const titleId = `tid-${_.__tools.randomString(6)}`;
                obj.attr('tid', titleId);
                if (!hid || /^[\W|\d]+.*/.test(hid)) {
                    if (hid) {
                        const tocObj = $(`.toc a[href="#${hid}"]`);
                        tocObj.length && tocObj.attr('href', `#${titleId}`);
                    }
                    hid = titleId;
                    obj.attr('id', hid);
                }

                const num = uniqueTags.indexOf(h);
                const str = num === 0 || num === -1 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(num);
                
                let numberPrefix = '';
                if (_.__config.articleDirectory.number) {
                    // 当前级别计数器加1
                    counters[h]++;
                    
                    // 重置更低级别的计数器
                    uniqueTags.forEach(level => {
                        if (level > h) {
                            counters[level] = 0;
                        }
                    });
                    
                    // 生成编号
                    const numberParts = [];
                    uniqueTags.forEach(level => {
                        if (level <= h && counters[level] > 0) {
                            numberParts.push(counters[level]);
                        }
                    });
                    
                    if (numberParts.length > 0) {
                        numberPrefix = numberParts.join('.') + '. ';
                    }
                }
                
                const text = str + numberPrefix + obj.text().replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<li class="nav-item"><a class="nav-link" href="#${hid}" goto="${titleId}" onclick="return false;">${text}</a></li>`;
            })
            .get()
            .join('');

        let dirHtml = _.__tools.tempReplacement(articleDirectoryTemp, 'dirHtml', html);

        postBody.append(dirHtml);

        // 锚点监听
        // body.attr('data-bs-spy', 'scroll');
        // body.attr('data-bs-target', '#articleDirectory');
        // body.attr('data-bs-offset', '0');
        // body.attr('tabindex', '0');
        // body.scrollspy({ target: '#articleDirectory' });

        // 锚点监听
        setTimeout(() => {
            const scrollSpy = new bootstrap.ScrollSpy(
                document.documentElement,
                {
                    target: '#articleDirectory',
                    offset: 80
                }
            );
            scrollSpy.refresh();
        }, 0);

        // 判断是否显示横向滚动条
        if (!_.__config.articleDirectory.autoWidthScroll) {
            $('#articleDirectory ul li').addClass('articleDirectory-overflow');
            $('#articleDirectory ul li a').addClass('articleDirectory-overflow');
        }

        // 滚动监听
        const articleDirectory = $('#articleDirectory');
        _.__event.scroll.handle.push(() => {
            const { temScroll, docScroll, homeScroll } = _.__event.scroll;
            const isScrollingDown = temScroll < docScroll;
            const isPassedHeader = homeScroll <= docScroll;
            
            if (isScrollingDown && isPassedHeader) {
                articleDirectory.addClass('articleDirectoryFixed');
            } else if (!isScrollingDown && !isPassedHeader) {
                articleDirectory.removeClass('articleDirectoryFixed');
            }
        });

        // 窗口大小变化监听
        _.__event.resize.handle.push(() => {
            const bodyWidth = parseFloat(document.body.clientWidth),
                articleDirectory = $('#articleDirectory');
            if (articleDirectory.length > 0) {
                let mainContentWidth = $('#home').outerWidth(false),
                    listWidth        = articleDirectory.outerWidth(true);
                let bothWidth        = (bodyWidth - mainContentWidth) / 2,
                    rightPx          = bothWidth - listWidth - 5,
                    sideToolbarTop   = $('.main-header').outerHeight();

                switch (_.__config.articleDirectory.position) {
                    case 'left':
                        articleDirectory.css({
                            'top': (sideToolbarTop + 5) + 'px',
                            'left': (rightPx > 0 ? rightPx : 5) + 'px',
                            'width': (bothWidth > 190 && bothWidth < 260 ? bothWidth - 10 : listWidth) + 'px'
                        });
                        break;
                    case 'right':
                    default:
                        articleDirectory.css({
                            'top': (sideToolbarTop + 5) + 'px',
                            'right' : (rightPx > 0 ? rightPx : 5) + 'px',
                            'width': (bothWidth > 190 && bothWidth < 260 ? bothWidth - 10 : listWidth) + 'px'
                        });
                        break;
                }

                if (bodyWidth <= _.__config.articleDirectory.minBodyWeight || bothWidth <= 190) {
                    articleDirectory.hide();
                } else {
                    articleDirectory.show();
                }
            }
        });

        // 点击事件
        $('#articleDirectory .nav-link').click(function () {
            let titleH = $(':header[tid="' + $(this).attr('goto') + '"]');
            titleH.length && _.__tools.actScroll(titleH.offset().top + 3, 500);
        });
    }
}