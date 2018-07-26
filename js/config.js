require.config({
    baseUrl: getJsDelivrUrl(),
    waitSeconds: 100,
    map: {
        '*': {
            'css': setFileNameMin('css.min')
        }
    },
    paths: {
        //-- 滚动条
        optiscroll: setFileNameMin('jquery.optiscroll'),
        //-- 进度条
        ToProgress: setFileNameMin('ToProgress.min'),
        //-- 旋转
        rotate: setFileNameMin('jquery.rotate.min'),
        //-- snap svg
        snapSvg: setFileNameMin('snap.svg-min'),
        //-- 菜单
        classie: setFileNameMin('classie'),
        main4: setFileNameMin('main4'),
        //-- bootstrap
        bootstrap: setFileNameMin('bootstrap.min'),
        //-- baguetteBox 图片灯箱
        baguetteBox: setFileNameMin('baguetteBox.min'),
        //-- 文章目录
        marvin: setFileNameMin('marvin.nav2'),
        //-- 文章后缀
        articleStatement: setFileNameMin('articleStatement'),
        //-- 主页动画
        circleMagic: setFileNameMin('circleMagic'),
        //-- 非主页动画
        TweenMax: setFileNameMin('TweenMax.min'),
        MyTween: setFileNameMin('MyTween'),
        //-- tools
        tools: setFileNameMin('tools'),
        //-- base
        base: setFileNameMin('base'),
    },
    shim:{
        optiscroll: {
            deps: ['css!https://files.cnblogs.com/files/bndong/optiscroll.css']
        },
        classie: {
            deps: ['snapSvg'],
        },
        main4: {
            deps: ['snapSvg','classie', 'css!https://files.cnblogs.com/files/bndong/menu_bubble.css']
        },
        baguetteBox: {
            exports: 'baguetteBox',
            deps: ['css!https://files.cnblogs.com/files/bndong/baguetteBox.min.css', 'css!https://files.cnblogs.com/files/bndong/gallery-clean.css']
        },
        marvin: {
            deps: ['bootstrap', 'css!https://files.cnblogs.com/files/bndong/marvin.nav2.css']
        },
        MyTween: {
            deps: ['TweenMax']
        },
        base: {
            deps: ['tools']
        },
        cssResources: [
            'css!https://at.alicdn.com/t/font_543384_hfku19m6z8ouhaor.css', // 阿里云字体图标
            'css!https://cdn.webfont.youziku.com/webfonts/nomal/111379/47284/5a531cbbf629dc07a8fbd011.css', // 有字库字体
        ]
    }
});