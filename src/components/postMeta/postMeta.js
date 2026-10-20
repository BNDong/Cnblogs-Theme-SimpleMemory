/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章信息
 */
import { getArticleNode } from '../../platform/cnblogs/article';

export default function main(postDescText) {
    const postDescTextClean = postDescText.replace(/[\r\n]/g, '');
    
    const regexps = [
        /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\((\d*)\).*评论\s*\((\d*)\).*推荐\s*\((\d*)\).*/,
        /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\((\d*)\).*评论\s*\((\d*)\).*/,
        /.*posted\s*@\s*([0-9\-:\s]{16}).*/,
    ];
    
    const match = regexps.reduce((bestMatch, regexp) => {
        const currentMatch = postDescTextClean.match(regexp);
        return currentMatch && currentMatch.length > bestMatch.length ? currentMatch : bestMatch;
    }, []);
    
    const [, date, vnum, cnum, tnum] = match;
    const diggCount = getArticleNode('diggCount');
    
    return {
        date: date || '1970-01-01 00:00',
        vnum: vnum || '0',
        cnum: cnum || '0',
        tnum: tnum || (diggCount.length ? diggCount.text() : '0'),
    };
}