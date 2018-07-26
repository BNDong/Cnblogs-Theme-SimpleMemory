require.config({
    baseUrl:'https://files.cnblogs.com/files/bndong/',
    waitSeconds: 100,
    map: {
        '*': {
            'css': 'css.min'
        }
    },
    paths: {
        //-- loading
        loading: 'loading',
        //-- 滚动条
        optiscroll: 'jquery.optiscroll',
        //-- 进度条
        ToProgress: 'ToProgress.min',
        //-- 旋转
        rotate: 'jquery.rotate.min',
        //-- snap svg
        snapSvg: 'snap.svg-min',
        //-- 菜单
        classie: 'classie',
        main4: 'main4',
        //-- bootstrap
        bootstrap: 'https://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min',
        //-- baguetteBox 图片灯箱
        baguetteBox: 'baguetteBox.min',
        //-- 文章目录
        marvin: 'marvin.nav2',
        //-- 文章后缀
        articleStatement: 'articleStatement',
        //-- 主页动画
        circleMagic: 'circleMagic',
        //-- 非主页动画
        TweenMax: 'TweenMax.min',
        MyTween: 'MyTween',
        //-- tools
        tools: 'SimpleMemory-tools',
        //-- base
        base: 'SimpleMemory-base',
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