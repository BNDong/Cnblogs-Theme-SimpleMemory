require.config({
    baseUrl: getJsDelivrUrl(),
    waitSeconds: 100,
    map: {
        '*': {
            'css': setFileNameMin('css.min', 'js')
        }
    },
    paths: {
        //-- 菜单滚动条
        optiscroll: setFileNameMin('jquery.optiscroll', 'js'),
        //-- 进度条
        ToProgress: setFileNameMin('ToProgress.min', 'js'),
        //-- 旋转
        rotate: setFileNameMin('jquery.rotate.min', 'js'),
        //-- snap svg
        snapSvg: setFileNameMin('snap.svg-min', 'js'),
        //-- 菜单
        classie: setFileNameMin('classie', 'js'),
        main4: setFileNameMin('main4', 'js'),
        //-- bootstrap
        bootstrap: setFileNameMin('bootstrap.min', 'js'),
        //-- 图片灯箱
        fancybox: setFileNameMin('jquery.fancybox.min', 'js'),
        //-- 文章标题
        title: setFileNameMin('articleTitle', 'js'),
        //-- 文章目录
        marvin: setFileNameMin('marvin.nav2', 'js'),
        //-- 文章后缀
        articleStatement: setFileNameMin('articleStatement', 'js'),
        //-- 代码高亮 - prettify
        codePrettify: setFileNameMin('run_prettify', 'js'),
        codeDesert: setFileNameMin('run_prettify', 'js'),
        codeSunburst: setFileNameMin('run_prettify', 'js'),
        codeObsidian: setFileNameMin('run_prettify', 'js'),
        codeDoxy: setFileNameMin('run_prettify', 'js'),
        //-- 代码高亮 - highlightjs
        highlightjs: setFileNameMin('highlight.min', 'js'),
        //-- 拷贝：博客园
        encoder: setFileNameMin('encoder', 'js'),
        //-- 拷贝：clipboard
        clipboard: setFileNameMin('clipboard.min', 'js'),
        //-- 主页头图动画
        circleMagic: setFileNameMin('circleMagic', 'js'),
        //-- 非主页头图动画
        TweenMax: setFileNameMin('TweenMax.min', 'js'),
        MyTween: setFileNameMin('MyTween', 'js'),
	    //-- 背景动画：丝带（随机）
        RibbonsEffect: setFileNameMin('RibbonsEffect', 'js'),
        //-- tools
        tools: setFileNameMin('tools', 'js'),
        //-- base
        base: setFileNameMin('base', 'js'),

        // == 合并压缩文件 == //
        //-- 菜单滚动条 && 进度条 && 旋转
        optiscroll_ToProgress_rotate: setFileNameMin('optiscroll_ToProgress_rotate.min', 'js'),
        //-- 非主页头图动画
        TweenMax_MyTween: setFileNameMin('TweenMax_MyTween.min', 'js'),
    },
    shim:{
        optiscroll: {
            deps: ['css!'+getJsDelivrUrl('optiscroll.css')]
        },
        classie: {
            deps: ['snapSvg'],
        },
        main4: {
            deps: ['snapSvg','classie', 'css!'+getJsDelivrUrl('menu_bubble.css')]
        },
        codePrettify: {
            deps: ['css!'+getJsDelivrUrl('codePrettify.css')]
        },
        fancybox: {
            deps: ['css!'+getJsDelivrUrl('jquery.fancybox.min.css')]
        },
        codeDesert: {
            deps: ['css!'+getJsDelivrUrl('codeDesert.css')]
        },
        codeSunburst: {
            deps: ['css!'+getJsDelivrUrl('codeSunburst.css')]
        },
        codeObsidian: {
            deps: ['css!'+getJsDelivrUrl('codeObsidian.css')]
        },
        codeDoxy: {
            deps: ['css!'+getJsDelivrUrl('codeDoxy.css')]
        },
        marvin: {
            deps: ['title', 'bootstrap', 'css!'+getJsDelivrUrl('marvin.nav2.css')]
        },
        MyTween: {
            deps: ['TweenMax']
        },
        base: {
            deps: [
                'tools',
                'css!//at.alicdn.com/t/font_543384_nt78v73wgg8.css', // 阿里云字体图标
                'css!'+getJsDelivrUrl('google-fonts.css'), // 谷歌字体
            ]
        },

        // == 合并压缩文件 == //
        optiscroll_ToProgress_rotate: {
            deps: ['css!'+getJsDelivrUrl('optiscroll.css')]
        },
    }
});
