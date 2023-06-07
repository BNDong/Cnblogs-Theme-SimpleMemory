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

    if (header.length > 0) {
        let tagList = [];

        // 获取标题处理
        $.each(header, function () {
            tagList.push(parseInt($(this)[0].tagName.replace(/H/g, '')));
        });

        // 标题级别
        let uniqTagList = uniq(tagList).sort();

        // 处理标题
        let html = '';
        $.each(header, function () {
            let obj = $(this);
            let h = parseInt(obj[0].tagName.replace(/H/g, ''));

            // 不处理 h6 级别标题
            if (h === 6) return true;

            // 设置标题标识
            let hid = obj.attr('id');
            let titleId = 'tid-' + _.__tools.randomString(6);
            obj.attr('tid', titleId);
            obj.attr('id', titleId);
            let tocObj = $('.toc a[href="#'+hid+'"]');
            tocObj.length && tocObj.attr('href', '#' + titleId);

            // 添加标题
            let num = uniqTagList.indexOf(h);
            let str = num === 0 || num === -1 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(num);
            let text =  str + obj.text().replace(/</g, "&lt;").replace(/>/g, "&gt;")
            html += '<li class="nav-item"><a class="nav-link" href="#' + titleId + '" goto="' + titleId + '" onclick="return false;">' + text + '</a></li>';
        });

        let dirHtml = _.__tools.tempReplacement(articleDirectoryTemp, 'dirHtml', html);

        body.append(dirHtml);

        // 锚点监听
        postBody.attr('data-bs-spy', 'scroll');
        postBody.attr('data-bs-target', '#articleDirectory');
        postBody.attr('data-bs-offset', '0');
        postBody.attr('tabindex', '0');

        const scrollSpy = new bootstrap.ScrollSpy($('#cnblogs_post_body'), {
            target: '#articleDirectory'
        });

        // console.log(scrollSpy);

        // 判断是否显示横向滚动条
        if (!_.__config.articleDirectory.autoWidthScroll) {
            $('#articleDirectory ul li').addClass('articleDirectory-overflow');
            $('#articleDirectory ul li a').addClass('articleDirectory-overflow');
        }

        // 滚动监听
        _.__event.scroll.handle.push(() => {
            let articleDirectory = $('#articleDirectory');

            if (_.__event.scroll.temScroll < _.__event.scroll.docScroll) { // 向下滚动

                if (_.__event.scroll.homeScroll <= _.__event.scroll.docScroll) { // 滚过头图
                    articleDirectory.addClass('articleDirectoryFixed');
                }

            } else { // 向上滚动

                if (_.__event.scroll.homeScroll >= _.__event.scroll.docScroll) { // 滚入头图
                    articleDirectory.removeClass('articleDirectoryFixed');
                }
            }
        });

        // 窗口大小变化监听
        _.__event.resize.handle.push(() => {
            const bodyWidth = parseFloat(document.body.clientWidth),
                articleDirectory = $('#articleDirectory');
            if (articleDirectory.length > 0) {
                let mainContentWidth = $('#home').outerWidth(false),
                    listWidth        = articleDirectory.outerWidth(true);
                // listWidth = listWidth > 220 ? listWidth : 242;
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

    /**
     * 数组去重
     * @param array
     * @returns {[]}
     */
    function uniq(array){
         return [...new Set(array)];
    }
}