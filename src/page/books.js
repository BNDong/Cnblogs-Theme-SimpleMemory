/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 书单页处理
 */
import '../style/books.css';
import booksTemp from '../template/books.html';
import articleDirectory from "../components/articleDirectory/articleDirectory";
import comArticle from "./common/comArticle";

export default function main(_) {
    /**
     * 文章页公共处理
     */
    (() => {
        comArticle(_);
    })();

    /**
     * 书单页处理
     */
    (() => {
        if (_.__config.bookList.length) {
            let postBody = $('#cnblogs_post_body'),
                html = '';
            $.each(_.__config.bookList, (i) => {
                let list = _.__config.bookList[i];
                if (list.title) html += '<h1>' + list.title + '</h1>';

                html += '<div class="book-cards">';
                $.each(list.books, (j) => {
                    let cardHtml = booksTemp, books = list.books[j];

                    // 评星
                    let scoreHtml = '';
                    if (typeof books.score !== 'undefined' && books.score > 0) {
                        scoreHtml += '<i class="iconfont icon-pingjixingquanxing"></i>'.repeat(parseInt(books.score));
                        if (books.score > parseInt(books.score)) {
                            scoreHtml += '<i class="iconfont icon-pingjixingbanxing"></i>';
                        }
                        scoreHtml += '<i class="iconfont icon-pingjixingxiantiao"></i>'.repeat(parseInt(5 - books.score));
                    } else {
                        scoreHtml += '<i class="iconfont icon-pingjixingxiantiao"></i>'.repeat(5);
                    }

                    // 图书信息
                    let infoHtml = '';
                    if (typeof books.formerName !== 'undefined' && books.formerName)
                        infoHtml += '<span title="' + books.formerName + '">原　名：' + books.formerName + '</span><br>';

                    if (typeof books.author !== 'undefined' && books.author)
                        infoHtml += '<span title="' + books.author + '">作　者：' + books.author + '</span><br>';

                    if (typeof books.translator !== 'undefined' && books.translator)
                        infoHtml += '<span title="' + books.translator + '">译　者：' + books.translator + '</span><br>';

                    if (typeof books.press !== 'undefined' && books.press)
                        infoHtml += '<span title="' + books.press + '">出版社：' + books.press + '</span><br>';

                    if (typeof books.year !== 'undefined' && books.year)
                        infoHtml += '<span title="' + books.year + '">出版年：' + books.year + '</span>';

                    // 阅读时间 & 进度
                    let readDate = typeof books.readDate !== 'undefined' ? books.readDate : '';
                    let readDateStyle = readDate ? 'initial;' : 'none';

                    let readPercentage = typeof books.readPercentage !== 'undefined' ? books.readPercentage : '';
                    let readPercentageStyle = readPercentage ? 'initial;' : 'none';

                    // 处理模版
                    cardHtml = _.__tools.batchTempReplacement(cardHtml, [
                        ['cover', typeof books.cover !== 'undefined' ? books.cover : ''],
                        ['name', typeof books.name !== 'undefined' ? books.name : ''],
                        ['readDate', readDate],
                        ['readDateStyle', readDateStyle],
                        ['readPercentage', readPercentage],
                        ['readPercentageStyle', readPercentageStyle],
                        ['scoreHtml', scoreHtml],
                        ['infoHtml', infoHtml],
                    ]);
                    html += cardHtml;
                });
                html += '</div>';
            });

            // 插入模版
            let articleSuffixFlg = $('.articleSuffix-flg');
            articleSuffixFlg.length ? articleSuffixFlg.before(html) : postBody.append(html);
        }
    })();

    /**
     * 设置文章目录
     */
    (() => {
        articleDirectory(_);
    })();

}