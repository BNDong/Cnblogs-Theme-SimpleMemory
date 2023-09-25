/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 文章信息处理
 */
import postMeta from "../../components/postMeta/postMeta";
import consoleText from "../../vendor/consoleText/consoleText";

export default function main(_) {
  /**
   * 设置文章标题
   */
  (() => {
    const sbTitle = $("#cb_post_title_url").text();
    if (_.__config.animate.articleTitle.enable) {
      consoleText(
        [sbTitle],
        "sbTitleText",
        "sbTitleConsole",
        ["#fff"],
        false,
        _.__tools.setDomHomePosition
      );
    } else {
      $("#sbTitleText").text(sbTitle).css("color", "#fff");
    }
    $(".inner").css("max-width", "100vw");
    _.__tools.setDomHomePosition();
  })();

  /**
   * 设置文章信息
   */
  (() => {
    $("#articleInfo").append('<p class="article-info-text"></p>');
    _.__timeIds.postDescTid = window.setInterval(() => {
      if (
        $("#post_view_count").text() !== "..." &&
        $("#post_comment_count").text() !== "..."
      ) {
        let postDescText = $(".postDesc").show().text();
        $("#articleInfo p.article-info-text").html(postMetaHtml(postDescText));
        _.__tools.setDomHomePosition();
        _.__tools.clearIntervalTimeId(_.__timeIds.postDescTid);
      }
    }, 1000);

    function postMetaHtml(postDescText) {
      let info = postMeta(postDescText);
      let textNum = $("#cnblogs_post_body").text().length;

      return (
        '<span class="postMeta"><i class="simple-memory-iconfont simple-memory-icon-time1"></i>' +
        info.date +
        "" +
        '<i class="simple-memory-iconfont simple-memory-icon-browse"></i>' +
        info.vnum +
        "" +
        '<i class="simple-memory-iconfont simple-memory-icon-interactive"></i>' +
        info.cnum +
        "" +
        '<i class="simple-memory-iconfont simple-memory-icon-hot"></i>' +
        info.tnum +
        "" +
        '<br><i class="simple-memory-iconfont simple-memory-icon-wenzi4"></i>' +
        textNum +
        "" +
        '<i class="simple-memory-iconfont simple-memory-icon-shangwutubiao-"></i>' +
        _.__tools.minToTime(textNum / 500) +
        " ~ " +
        _.__tools.minToTime(textNum / 300) +
        "</span>"
      );
    }
  })();

  /**
   * 设置文章信息-分类
   */
  (() => {
    _.__timeIds.articleInfoClassTId = window.setInterval(() => {
      let obj = $("#BlogPostCategory").find("a");
      if (obj.length > 0) {
        _.__tools.htmlReplace("#BlogPostCategory", /,/g, "");
        _.__tools.articleInfo(obj, 1);
        _.__tools.setDomHomePosition();
        _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoClassTId);
      }
    }, 1000);
  })();

  /**
   * 设置文章信息-标签
   */
  (() => {
    _.__timeIds.articleInfoTagTId = window.setInterval(() => {
      let obj = $("#EntryTag").find("a");
      if (obj.length > 0) {
        _.__tools.htmlReplace("#EntryTag", /,/g, "");
        _.__tools.articleInfo(obj, 2);
        _.__tools.setDomHomePosition();
        _.__tools.clearIntervalTimeId(_.__timeIds.articleInfoTagTId);
      }
    }, 1000);
  })();

  /**
   * 设置文章引用 | 扩展markdown语法
   */
  (() => {
    $(".blogpost-body p").html((i, c) => {
      if (/^\?&gt;/.test(c))
        return '<p class="tip">' + c.slice(5).trim() + "</p>";
      if (/^!&gt;/.test(c))
        return '<p class="warn">' + c.slice(5).trim() + "</p>";
    });
  })();

  /**
   * 设置文章标题-iconfont
   */
  (() => {
    let titleInfo = $("#cnblogs_post_body").find(":header");
    if (_.__config.articleContent.prefixIcon.enable && titleInfo.length > 0) {
      _.__tools
        .dynamicLoadingJs(_.__config.articleContent.prefixIcon.options.link)
        .then((r) => {
          let iconfonts =
            _.__config.articleContent.prefixIcon.options.iconfontArr;
          titleInfo.html((i, c) => {
            let arr = [];
            let num = Math.floor(Math.random() * (iconfonts.length - i) + i);
            let h = parseInt(titleInfo[i].tagName.replace(/H/g, ""));
            if (arr.indexOf(num) === -1 && h !== 6) {
              arr.push(num);
              $(
                '<svg class="simple-memory-symbol"> <use xlink:href="#icon-' +
                  iconfonts[num] +
                  '"></use></svg>'
              ).prependTo(titleInfo[i]);
            } else {
              i--;
            }
          });
        })
        .catch((e) => console.error("iconfont.js", e));
    }
  })();

  /**
   * 设置文章手绘效果
   */
  (() => {
    if (!_.__config.articleContent.RoughNotation.enable) return;
    const tokenMap = {
      "~bk": "<mbk>",
      "bk~": "</mbk>",
      "~b": "<mbox>",
      "b~": "</mbox>",
      "~c": "<mc>",
      "c~": "</mc>",
      "~u": "<mu>",
      "u~": "</mu>",
      "~h": "<mhl>",
      "h~": "</mhl>",
      "~s": "<mst>",
      "s~": "</mst>",
      "~x": "<mco>",
      "x~": "</mco>",
    };

    const { cdn, options } = _.__config.articleContent.RoughNotation;


    const configMap = {
        mu: options.underline,
        mc: options.circle,
        mbox: options.box,
        mhl: options.highlight,
        mbk: options.bracket,
        mst: options.strikeThrough,
        mco: options.crossedOff,
    };


    const annotateElements = () => {
        const { annotate } = window.RoughNotation;
        Object.keys(configMap).forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
                annotate(el, configMap[selector]).show();
            });
        });
    };

    const init = async () => {
        await _.__tools.dynamicLoadingJs(cdn.roughNotation);

        $(".blogpost-body p").html((i, c) => {
            return c.replace(/~[a-z]{1,2}|[a-z]{1,2}~/g, (match) => tokenMap[match]);
        });

        setTimeout(() => {
            annotateElements();
        }, 2000);
    };

    init();
  })();
}
