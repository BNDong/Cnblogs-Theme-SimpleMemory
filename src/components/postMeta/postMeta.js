/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章信息
 */

export default function main(postDescText) {
    let getPostMetaInfo = (postDescText) => {
        postDescText = postDescText.replace(/[\r\n]/g, '');

        let postMetaRex  = /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\(([0-9]*)\).*评论\s*\(([0-9]*)\).*推荐\s*\(([0-9]*)\).*/,
            postMetaRex2 = /.*posted\s*@\s*([0-9\-:\s]{16}).*阅读\s*\(([0-9]*)\).*评论\s*\(([0-9]*)\).*/,
            postMetaRex3 = /.*posted\s*@\s*([0-9\-:\s]{16}).*/,
            diggCount = $('#digg_count'),
            info = postDescText.match(postMetaRex)
                || postDescText.match(postMetaRex2)
                || postDescText.match(postMetaRex3),
            date = typeof info[1] === 'undefined' ? '1970-01-01 00:00' : info[1],
            vnum = typeof info[2] === 'undefined' ? '0' : info[2],
            cnum = typeof info[3] === 'undefined' ? '0' : info[3],
            tnum = typeof info[4] === 'undefined' ?
                (diggCount.length ? diggCount.text() : '0')
                : info[4];

        return {
            date: date,
            vnum: vnum,
            cnum: cnum,
            tnum: tnum,
        };
    };

    return getPostMetaInfo(postDescText);
}