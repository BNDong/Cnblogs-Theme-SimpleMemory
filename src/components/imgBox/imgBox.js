/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 图片灯箱处理
 */
import "../../vendor/fancybox/jquery.fancybox";
import "../../vendor/fancybox/jquery.fancybox.min.css";

export default function main(_) {
    setTimeout(() =>  {
        let cpb         = $('#cnblogs_post_body')
            ,imgList    = $('#cnblogs_post_body img')
            ,comImgList = $('.feedbackItem img')
            ,data       = [];

        $.each(imgList, function (i) {
            data.push(imgList[i]);
        });

        $.each(comImgList, function (i) {
            data.push(comImgList[i]);
        });

        if (cpb.length > 0 && data.length > 0) {
            $.each(data, (i) => {
                let tem = $(data[i]);
                if (!tem.hasClass('code_img_closed') && !tem.hasClass('code_img_opened')) {
                    let width  = tem.attr('width');
                    let height = tem.attr('height');
                    tem.after('<a data-fancybox="gallery" href="'+tem.attr('src')+'"><img ' +
                        (width ? ' width="' + width + '" ' : '') +
                        (height ? ' height="' + height + '" ' : '') +
                        ' src="'+tem.attr('src')+'"/></a>');
                    tem.remove();
                }
            });
        }
    },800);
}