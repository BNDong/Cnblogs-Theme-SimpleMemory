!function(){var e,s,t,l,a,r,o={434:function(e,s,t){"use strict";function l(e){let s={init:()=>{e.__event.scroll={},e.__event.scroll.handle=[],e.__event.scroll.temScroll=0,e.__event.scroll.docScroll=$(document).scrollTop(),e.__event.scroll.homeScroll=$("#home").offset().top-40,$(window).scroll((()=>{e.__event.scroll.docScroll=$(document).scrollTop(),e.__event.scroll.homeScroll=$("#home").offset().top-40,s.handle.scroll(),e.__event.scroll.temScroll=e.__event.scroll.docScroll})),e.__event.resize={},e.__event.resize.handle=[],$(window).resize((()=>{s.handle.resize()}))},handle:{scroll:()=>{for(let s=0;s<e.__event.scroll.handle.length;s++)e.__event.scroll.handle[s]()},resize:()=>{for(let s=0;s<e.__event.resize.handle.length;s++)e.__event.resize.handle[s]();e.__tools.setDomHomePosition()}}};return s}t.d(s,{Z:function(){return l}})},2865:function(e,s,t){var l={"./article":[8277,3138,7361,269],"./article.js":[8277,3138,7361,269],"./books":[7024,3138,7361,4463],"./books.js":[7024,3138,7361,4463],"./common/comArticle":[8103,3138,7361],"./common/comArticle.js":[8103,3138,7361],"./home":[565,9628],"./home.js":[565,9628],"./links":[1099,3138,7361,9583],"./links.js":[1099,3138,7361,9583]};function a(e){if(!t.o(l,e))return Promise.resolve().then((function(){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}));var s=l[e],a=s[0];return Promise.all(s.slice(1).map(t.e)).then((function(){return t(a)}))}a.keys=function(){return Object.keys(l)},a.id=2865,e.exports=a}},c={};function n(e){var s=c[e];if(void 0!==s)return s.exports;var t=c[e]={exports:{}};return o[e].call(t.exports,t,t.exports,n),t.exports}n.m=o,n.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(s,{a:s}),s},s=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},n.t=function(t,l){if(1&l&&(t=this(t)),8&l)return t;if("object"==typeof t&&t){if(4&l&&t.__esModule)return t;if(16&l&&"function"==typeof t.then)return t}var a=Object.create(null);n.r(a);var r={};e=e||[null,s({}),s([]),s(s)];for(var o=2&l&&t;"object"==typeof o&&!~e.indexOf(o);o=s(o))Object.getOwnPropertyNames(o).forEach((function(e){r[e]=function(){return t[e]}}));return r.default=function(){return t},n.d(a,r),a},n.d=function(e,s){for(var t in s)n.o(s,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:s[t]})},n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(s,t){return n.f[t](e,s),s}),[]))},n.u=function(e){return"script/"+({131:"hljs/atelier-savanna-light-css",269:"page-article",336:"hljs/atelier-plateau-dark-css",393:"hljs/darcula-css",604:"hljs/srcery-css",620:"hljs/docco-css",655:"hljs/isbl-editor-light-css",657:"hljs/qtcreator_dark-css",759:"hljs/atelier-estuary-dark-css",1089:"hljs/googlecode-css",1151:"hljs/atelier-cave-light-css",1417:"hljs/atelier-sulphurpool-light-css",1437:"hljs/foundation-css",1480:"dayNight",1504:"hljs/qtcreator_light-css",1589:"hljs/atelier-estuary-light-css",1761:"bannerImages",1936:"hljs/atelier-plateau-light-css",2056:"hljs/stackoverflow-light-css",2080:"hljs/routeros-css",2089:"circleMagic",2122:"hljs/monokai-sublime-css",2144:"hljs/atelier-dune-light-css",2171:"hljs/atom-one-dark-reasonable-css",2251:"hljs/gruvbox-dark-css",2299:"hljs/atelier-savanna-dark-css",2447:"hljs/hybrid-css",2456:"hljs/atelier-seaside-light-css",2519:"hljs/gruvbox-light-css",2565:"hljs/lioshi-css",2600:"hljs/nnfx-css",2785:"hljs/codepen-embed-css",3062:"hljs/gradient-dark-css",3113:"hljs/brown-paper-css",3191:"article-code",3199:"hljs/zenburn-css",3258:"comAfter",3290:"hljs/nord-css",3304:"comBefore",3352:"hljs/atelier-cave-dark-css",3353:"fonticon",3374:"hljs/atom-one-light-css",3429:"hljs/atelier-forest-dark-css",3449:"mouse",3539:"hljs/nnfx-dark-css",3670:"hljs/ascetic-css",3731:"hljs/tomorrow-css",3749:"hljs/color-brewer-css",3774:"hljs/an-old-hope-css",3851:"hljs/tomorrow-night-css",3854:"hljs/atelier-sulphurpool-dark-css",3950:"hljs/gradient-light-css",4033:"hljs/atelier-seaside-dark-css",4104:"hljs/lightfair-css",4149:"hljs/far-css",4168:"hljs/tomorrow-night-blue-css",4321:"hljs/kimbie-light-css",4463:"page-books",4495:"hljs/atelier-forest-light-css",4751:"hljs/xt256-css",4761:"hljs/idea-css",4802:"hljs/mono-blue-css",4824:"hljs/atelier-lakeside-light-css",5064:"hljs/atelier-dune-dark-css",5114:"hljs/magula-css",5191:"hljs/grayscale-css",5206:"hljs/sunburst-css",5360:"hljs/paraiso-dark-css",5518:"hljs/atelier-lakeside-dark-css",5561:"nhBannerAnimation",5706:"hljs/hopscotch-css",5980:"hljs/tomorrow-night-eighties-css",6312:"hljs/ocean-css",6387:"hljs/atelier-heath-light-css",6493:"hljs/isbl-editor-dark-css",6520:"hljs/obsidian-css",6586:"code-hljs",6655:"hljs/a11y-dark-css",6764:"hljs/xcode-css",6865:"hljs/vs-css",7335:"hljs/dracula-css",7361:"page-common-comArticle",7531:"hljs/agate-css",7591:"hljs/tomorrow-night-bright-css",7661:"hljs/github-gist-css",7732:"google-fonts",7898:"hljs/solarized-light-css",8004:"hljs/ir-black-css",8046:"hljs/solarized-dark-css",8132:"particles",8203:"hljs/default-css",8208:"hljs/arta-css",8209:"hljs/monokai-css",8265:"ribbonsEffect",8694:"hljs/school-book-css",8794:"hljs/purebasic-css",8813:"hljs/pojoaque-css",8826:"hljs/atelier-heath-dark-css",8905:"hljs/androidstudio-css",8981:"hljs/kimbie-dark-css",9053:"hljs/stackoverflow-dark-css",9089:"hljs/github-css",9105:"hljs/vs2015-css",9188:"hljs/a11y-light-css",9368:"hljs/night-owl-css",9446:"hljs/arduino-light-css",9550:"hljs/dark-css",9583:"page-links",9624:"hljs/shades-of-purple-css",9628:"page-home",9678:"hljs/railscasts-css",9714:"hljs/gml-css",9769:"hljs/atom-one-dark-css",9914:"hljs/paraiso-light-css",9996:"hljs/rainbow-css"}[e]||e)+"."+{131:"5ef3965d",269:"3e80bbb8",336:"b39eb59a",393:"44618225",604:"e629cbff",620:"2703660e",655:"92eb3539",657:"8073ef2b",759:"9fdb60f1",1089:"ff832cd9",1151:"a93d745a",1417:"24a88231",1437:"1f31a120",1480:"15b99d8c",1504:"ca8ed0d8",1589:"f178e0c0",1606:"94fb0ce4",1761:"2cb69811",1936:"5d14ef39",2056:"d781a115",2080:"1a9ff5ec",2089:"92a35ec0",2122:"24cb0dfb",2144:"089dc7c3",2152:"c5d09194",2171:"ba97e187",2251:"65cf7d98",2299:"de6a3237",2447:"7d74105c",2456:"0f590143",2519:"c9c6f01f",2565:"3921b636",2600:"a85e68dd",2785:"99bb25e2",3062:"78290325",3113:"fc72b4b4",3138:"48ea129f",3191:"28c5662a",3199:"b729f28a",3258:"a07d2cd3",3290:"0ff24aff",3304:"917dae4a",3352:"36209f60",3353:"d5dacf45",3374:"be36b06c",3429:"d1d1508d",3449:"49c8b510",3539:"c33b48f7",3670:"a86a1a92",3731:"c617a785",3749:"7a807cb6",3774:"eaeee6a4",3851:"ce777c86",3854:"21e8cc68",3950:"73b85a82",4033:"203bf3a6",4104:"41e5cb8f",4149:"30e9733d",4168:"cb5fec0d",4321:"2bd24199",4463:"aee59046",4495:"1836dcbe",4751:"b72a728c",4761:"330b1aa1",4802:"426a1876",4824:"72fde174",5064:"0a5ea54f",5114:"2e3c69d7",5191:"bca5e91c",5206:"a421eddc",5360:"3ca1c338",5518:"fdb87888",5561:"0866edaf",5706:"bb3c070f",5980:"8608175e",6312:"2266fbff",6387:"e739752f",6493:"947156ff",6520:"e634662c",6586:"c1df3071",6655:"24b7ea1a",6764:"fd24697e",6865:"77add605",7335:"39933e6d",7361:"4add58ee",7531:"4c2927b6",7591:"d8b16056",7661:"a30cf7fc",7732:"cb294b68",7869:"160e78c1",7898:"48f1283b",8004:"650ad0fc",8046:"1bc770a8",8132:"481480f4",8203:"3f3c1b61",8208:"625b9f53",8209:"bd6fb9d9",8265:"91d1fd58",8694:"a6ffdbeb",8794:"8c818cb1",8813:"ec3f7534",8826:"4ea04994",8905:"3433b21d",8981:"a41c5b53",9053:"4ef507df",9089:"66fa68e9",9105:"86518181",9188:"c1307678",9368:"a839f485",9446:"981eefab",9509:"011e6913",9550:"8a4b8575",9583:"05927986",9624:"9678d5ad",9628:"cf26c07f",9678:"754588c8",9714:"47750825",9769:"97454fd7",9914:"e5afd34d",9996:"2d85a1d3"}[e]+".js"},n.miniCssF=function(e){return"style/"+{131:"hljs/atelier-savanna-light-css",269:"page-article",336:"hljs/atelier-plateau-dark-css",393:"hljs/darcula-css",604:"hljs/srcery-css",620:"hljs/docco-css",655:"hljs/isbl-editor-light-css",657:"hljs/qtcreator_dark-css",759:"hljs/atelier-estuary-dark-css",1089:"hljs/googlecode-css",1151:"hljs/atelier-cave-light-css",1417:"hljs/atelier-sulphurpool-light-css",1437:"hljs/foundation-css",1480:"dayNight",1504:"hljs/qtcreator_light-css",1589:"hljs/atelier-estuary-light-css",1936:"hljs/atelier-plateau-light-css",2056:"hljs/stackoverflow-light-css",2080:"hljs/routeros-css",2122:"hljs/monokai-sublime-css",2144:"hljs/atelier-dune-light-css",2171:"hljs/atom-one-dark-reasonable-css",2251:"hljs/gruvbox-dark-css",2299:"hljs/atelier-savanna-dark-css",2447:"hljs/hybrid-css",2456:"hljs/atelier-seaside-light-css",2519:"hljs/gruvbox-light-css",2565:"hljs/lioshi-css",2600:"hljs/nnfx-css",2785:"hljs/codepen-embed-css",3062:"hljs/gradient-dark-css",3113:"hljs/brown-paper-css",3199:"hljs/zenburn-css",3290:"hljs/nord-css",3304:"comBefore",3352:"hljs/atelier-cave-dark-css",3353:"fonticon",3374:"hljs/atom-one-light-css",3429:"hljs/atelier-forest-dark-css",3449:"mouse",3539:"hljs/nnfx-dark-css",3670:"hljs/ascetic-css",3731:"hljs/tomorrow-css",3749:"hljs/color-brewer-css",3774:"hljs/an-old-hope-css",3851:"hljs/tomorrow-night-css",3854:"hljs/atelier-sulphurpool-dark-css",3950:"hljs/gradient-light-css",4033:"hljs/atelier-seaside-dark-css",4104:"hljs/lightfair-css",4149:"hljs/far-css",4168:"hljs/tomorrow-night-blue-css",4321:"hljs/kimbie-light-css",4463:"page-books",4495:"hljs/atelier-forest-light-css",4751:"hljs/xt256-css",4761:"hljs/idea-css",4802:"hljs/mono-blue-css",4824:"hljs/atelier-lakeside-light-css",5064:"hljs/atelier-dune-dark-css",5114:"hljs/magula-css",5191:"hljs/grayscale-css",5206:"hljs/sunburst-css",5360:"hljs/paraiso-dark-css",5518:"hljs/atelier-lakeside-dark-css",5561:"nhBannerAnimation",5706:"hljs/hopscotch-css",5980:"hljs/tomorrow-night-eighties-css",6312:"hljs/ocean-css",6387:"hljs/atelier-heath-light-css",6493:"hljs/isbl-editor-dark-css",6520:"hljs/obsidian-css",6655:"hljs/a11y-dark-css",6764:"hljs/xcode-css",6865:"hljs/vs-css",7335:"hljs/dracula-css",7361:"page-common-comArticle",7531:"hljs/agate-css",7591:"hljs/tomorrow-night-bright-css",7661:"hljs/github-gist-css",7732:"google-fonts",7898:"hljs/solarized-light-css",8004:"hljs/ir-black-css",8046:"hljs/solarized-dark-css",8132:"particles",8203:"hljs/default-css",8208:"hljs/arta-css",8209:"hljs/monokai-css",8694:"hljs/school-book-css",8794:"hljs/purebasic-css",8813:"hljs/pojoaque-css",8826:"hljs/atelier-heath-dark-css",8905:"hljs/androidstudio-css",8981:"hljs/kimbie-dark-css",9053:"hljs/stackoverflow-dark-css",9089:"hljs/github-css",9105:"hljs/vs2015-css",9188:"hljs/a11y-light-css",9368:"hljs/night-owl-css",9446:"hljs/arduino-light-css",9550:"hljs/dark-css",9583:"page-links",9624:"hljs/shades-of-purple-css",9678:"hljs/railscasts-css",9714:"hljs/gml-css",9769:"hljs/atom-one-dark-css",9914:"hljs/paraiso-light-css",9996:"hljs/rainbow-css"}[e]+"."+{131:"1927a43f",269:"eea4482f",336:"6d3d2072",393:"9f2970cb",604:"a9d42e34",620:"fe1edc6b",655:"eb127b26",657:"03ce43be",759:"1a42c90d",1089:"44b6a34e",1151:"1936ce7b",1417:"5d6a0ba4",1437:"c4691bc8",1480:"5ae535ab",1504:"aabfe8f5",1589:"3a16caf8",1936:"db18ceb2",2056:"1856d9c7",2080:"d1ca4651",2122:"6f07b7d2",2144:"40f29cc3",2171:"56beeedd",2251:"4b81b15e",2299:"61f12180",2447:"8ed0b8d5",2456:"9a9812d9",2519:"16659adc",2565:"06db991f",2600:"dd652696",2785:"73ec9c68",3062:"51870c0f",3113:"97f51fb5",3199:"877995c4",3290:"be884f0f",3304:"57c20dc6",3352:"0b577133",3353:"34d91d99",3374:"1f4c93b9",3429:"24c00093",3449:"3bbc61ee",3539:"1ab303ed",3670:"f9a24ba0",3731:"a0467948",3749:"6b13b497",3774:"b6848636",3851:"a36dd7a5",3854:"ff400d29",3950:"bd3615d6",4033:"3c8885d4",4104:"4cea2f50",4149:"5ac10474",4168:"f4c1e798",4321:"2b7e53e2",4463:"4bc80495",4495:"5fc38342",4751:"35ef6250",4761:"96e2c7c2",4802:"e5cbdcca",4824:"3f423031",5064:"34079eaa",5114:"2ee09dfe",5191:"fa8dceee",5206:"59426e75",5360:"04b6bbdd",5518:"95af2bd4",5561:"0630e6eb",5706:"831f84d4",5980:"ca143c00",6312:"00992d32",6387:"d7b45496",6493:"acb7b373",6520:"4aaa1a1d",6655:"e50c1ca5",6764:"8c20198f",6865:"e1edaf6d",7335:"37cfa243",7361:"8c839482",7531:"527ecdc6",7591:"778fafab",7661:"3a8c6005",7732:"14239708",7898:"7a910396",8004:"5033adc0",8046:"d96304dd",8132:"472e4232",8203:"a8a3587c",8208:"757e7eda",8209:"a475d254",8694:"3fdfd26d",8794:"0021c7e3",8813:"92d4b093",8826:"44c7a88e",8905:"8a689c45",8981:"c5ed797c",9053:"94827cf1",9089:"f969c0c4",9105:"22baba47",9188:"c59658bd",9368:"2590a66b",9446:"98134817",9550:"ba75f0bc",9583:"37688e29",9624:"e92654ec",9678:"39fa42fc",9714:"733af03a",9769:"5471d564",9914:"172a7462",9996:"14fde1f1"}[e]+".css"},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},t={},l="Cnblogs-Theme-SimpleMemory:",n.l=function(e,s,a,r){if(t[e])t[e].push(s);else{var o,c;if(void 0!==a)for(var i=document.getElementsByTagName("script"),h=0;h<i.length;h++){var d=i[h];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==l+a){o=d;break}}o||(c=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",l+a),o.src=e),t[e]=[s];var f=function(s,l){o.onerror=o.onload=null,clearTimeout(u);var a=t[e];if(delete t[e],o.parentNode&&o.parentNode.removeChild(o),a&&a.forEach((function(e){return e(l)})),s)return s(l)},u=setTimeout(f.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=f.bind(null,o.onerror),o.onload=f.bind(null,o.onload),c&&document.head.appendChild(o)}},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;n.g.importScripts&&(e=n.g.location+"");var s=n.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var t=s.getElementsByTagName("script");if(t.length)for(var l=t.length-1;l>-1&&!e;)e=t[l--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}(),a=function(e){return new Promise((function(s,t){var l=n.miniCssF(e),a=n.p+l;if(function(e,s){for(var t=document.getElementsByTagName("link"),l=0;l<t.length;l++){var a=(o=t[l]).getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===s))return o}var r=document.getElementsByTagName("style");for(l=0;l<r.length;l++){var o;if((a=(o=r[l]).getAttribute("data-href"))===e||a===s)return o}}(l,a))return s();!function(e,s,t,l){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=function(r){if(a.onerror=a.onload=null,"load"===r.type)t();else{var o=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.href||s,n=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");n.code="CSS_CHUNK_LOAD_FAILED",n.type=o,n.request=c,a.parentNode.removeChild(a),l(n)}},a.href=s,document.head.appendChild(a)}(e,a,s,t)}))},r={179:0},n.f.miniCss=function(e,s){r[e]?s.push(r[e]):0!==r[e]&&{131:1,269:1,336:1,393:1,604:1,620:1,655:1,657:1,759:1,1089:1,1151:1,1417:1,1437:1,1480:1,1504:1,1589:1,1936:1,2056:1,2080:1,2122:1,2144:1,2171:1,2251:1,2299:1,2447:1,2456:1,2519:1,2565:1,2600:1,2785:1,3062:1,3113:1,3199:1,3290:1,3304:1,3352:1,3353:1,3374:1,3429:1,3449:1,3539:1,3670:1,3731:1,3749:1,3774:1,3851:1,3854:1,3950:1,4033:1,4104:1,4149:1,4168:1,4321:1,4463:1,4495:1,4751:1,4761:1,4802:1,4824:1,5064:1,5114:1,5191:1,5206:1,5360:1,5518:1,5561:1,5706:1,5980:1,6312:1,6387:1,6493:1,6520:1,6655:1,6764:1,6865:1,7335:1,7361:1,7531:1,7591:1,7661:1,7732:1,7898:1,8004:1,8046:1,8132:1,8203:1,8208:1,8209:1,8694:1,8794:1,8813:1,8826:1,8905:1,8981:1,9053:1,9089:1,9105:1,9188:1,9368:1,9446:1,9550:1,9583:1,9624:1,9678:1,9714:1,9769:1,9914:1,9996:1}[e]&&s.push(r[e]=a(e).then((function(){r[e]=0}),(function(s){throw delete r[e],s})))},function(){var e={179:0};n.f.j=function(s,t){var l=n.o(e,s)?e[s]:void 0;if(0!==l)if(l)t.push(l[2]);else{var a=new Promise((function(t,a){l=e[s]=[t,a]}));t.push(l[2]=a);var r=n.p+n.u(s),o=new Error;n.l(r,(function(t){if(n.o(e,s)&&(0!==(l=e[s])&&(e[s]=void 0),l)){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;o.message="Loading chunk "+s+" failed.\n("+a+": "+r+")",o.name="ChunkLoadError",o.type=a,o.request=r,l[1](o)}}),"chunk-"+s,s)}};var s=function(s,t){var l,a,r=t[0],o=t[1],c=t[2],i=0;if(r.some((function(s){return 0!==e[s]}))){for(l in o)n.o(o,l)&&(n.m[l]=o[l]);if(c)c(n)}for(s&&s(t);i<r.length;i++)a=r[i],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0},t=self.webpackChunkCnblogs_Theme_SimpleMemory=self.webpackChunkCnblogs_Theme_SimpleMemory||[];t.forEach(s.bind(null,0)),t.push=s.bind(null,t.push.bind(t))}(),function(){"use strict";var e=JSON.parse('{"info":{"name":"","startDate":"2021-01-01","avatar":"","blogIcon":""},"sidebar":{"navList":[],"customList":{},"infoBackground":"","titleMsg":"欢迎访问本博客~","submenu":{"pointsRank":false,"latestPosts":false,"myTags":false,"postsClassify":false,"articleClassify":false,"readRank":false,"recommendRank":false,"latestComment":false,"postsArchive":false,"articleArchive":false,"customList":false}},"banner":{"home":{"background":[],"title":[],"titleSource":"jinrishici"},"article":{"background":[]}},"loading":{"rebound":{"tension":16,"friction":5},"spinner":{"id":"spinner","radius":90,"sides":3,"depth":4,"colors":{"background":"#f0f0f0","stroke":"#272633","base":null,"child":"#272633"},"alwaysForward":true,"restAt":0.5,"renderBase":false}},"fontIconExtend":"","progressBar":{"id":"top-progress-bar","color":"#77b6ff","height":"2px","duration":0.2},"title":{"onblur":"(oﾟvﾟ)ノ Hi","onblurTime":500,"focus":"(*´∇｀*) 欢迎回来！","focusTime":1000},"footer":{"text":{"left":"","right":"","iconFont":{"icon":"icon-xl","color":"red","fontSize":"16px"}},"style":2,"aplayer":{"enable":false,"cdn":{"aplayer":"https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/aplayer/1.10.1/APlayer.min.js","aplayercss":"https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/aplayer/1.10.1/APlayer.min.css","meting":"https://cdn.staticfile.org/meting/2.0.1/Meting.min.js"},"options":{"id":"3778678","api":"","server":"netease","type":"playlist","auto":"netease","fixed":"true","mini":"true","autoplay":"false","theme":"#2980b9","loop":"all","order":"random","preload":"auto","volume":"0.7","mutex":"true","lrcType":"0","listFolded":"true","listMaxHeight":"340px","storageName":"cnblogsTheme"}}},"links":{"footer":[],"page":[]},"cnzz":"","rtMenu":{"qrCode":"","reward":{"alipay":"","wechatpay":""},"downScrollDom":""},"switchDayNight":{"enable":true,"nightMode":false,"auto":{"enable":false,"dayHour":5,"nightHour":19}},"animate":{"bannerImages":{"enable":false,"options":{"itemNum":5,"current":0,"sort":1,"time":30000}},"homeBanner":{"enable":false,"options":{"radius":15,"density":0.2,"color":"rgba(255,255,255, .2)","clearOffset":0.3}},"articleTitle":{"enable":true},"articleBanner":{"enable":false},"background":{"enable":false,"options":{"colorSaturation":"60%","colorBrightness":"50%","colorAlpha":0.5,"colorCycleSpeed":5,"verticalPosition":"random","horizontalSpeed":200,"ribbonCount":3,"strokeSize":0,"parallaxAmount":-0.2,"animateSections":true}},"backgroundMouse":{"enable":false},"mouse":{"enable":false,"options":{"size":8,"sizeF":36}},"avatar":{"enable":false}},"code":{"type":"","options":{"hljs":{"theme":"atom-one-dark-reasonable","languages":[]},"maxHeight":"","fontSize":14,"line":false,"macStyle":true}},"articleSuffix":{"imgUrl":"","aboutHtml":"","copyrightHtml":"","supportHtml":""},"articleDirectory":{"position":"right","minBodyWeight":900,"autoWidthScroll":false},"consoleList":[],"bookList":[],"hooks":{}}');var s=n(434);$(document).ready((function(){let t={};t.__config=function(){const s=void 0===window.cnblogsConfig?{}:window.cnblogsConfig;return $.extend(!0,e,s)}(),t.__status=function(){let e={};e.url=window.location.href;let s=e.url.split("/");if(e.user=s[3],e.articleId="",e.homeUrl=[s[0],s[1],s[2],s[3]].join("/"),$("#topics").length){$("#bookListFlg").length?e.pageType="books":$("#linkListFlg").length?e.pageType="links":e.pageType="article";let t=s[s.length-1].split(".");e.articleId=t[0]}else e.pageType="home";return e}(),t.__tools={tempReplacement:(e,s,t)=>{let l=new RegExp("##"+s+"##","g");return e.replace(l,t)},batchTempReplacement:(e,s)=>{let t=e;return $.each(s,(function(e){let l=s[e],a=new RegExp("##"+l[0]+"##","g");t=t.replace(a,l[1])})),t},dynamicLoadingCss:e=>{if(!e||0===e.length)throw new Error('argument "path" is required !');let s=document.getElementsByTagName("head")[0],t=document.createElement("link");t.href=e,t.rel="stylesheet",t.type="text/css",s.appendChild(t)},dynamicLoadingJs:e=>new Promise(((s,t)=>{$.ajax({type:"GET",dataType:"script",cache:!0,url:e,success:function(e){s(e)},error:function(e){t(e)}})})),htmlFiltrationScript:e=>{let s=new RegExp("<script.*<\/script>","ig");return e.replace(s,"")},clearIntervalTimeId:e=>{null!=e&&window.clearInterval(e)},actScroll:(e,s)=>{$("html,body").stop().animate({scrollTop:e},s)},getScrollPercent:()=>($(window).scrollTop()/($(document).height()-$(window).height())*100).toFixed(0),randomNum:function(e,s){switch(arguments.length){case 1:return parseInt(Math.random()*e+1);case 2:return parseInt(Math.random()*(s-e+1)+e);default:return 0}},setDomHomePosition:()=>{$("#home").css("margin-top",$(".main-header").outerHeight()+"px")},getNowFormatDate:()=>{let e=new Date,s=e.getFullYear(),t=e.getMonth()+1,l=e.getDate();return t>=1&&t<=9&&(t="0"+t),l>=0&&l<=9&&(l="0"+l),s+"-"+t+"-"+l},getRunDate:e=>{e=e.toString().split("-");let s=new Date;s.setUTCFullYear(e[0],e[1]-1,e[2]),s.setUTCHours(0,0,0,0);let t=s,l=(new Date).getTime()-t.getTime(),a=l/1e3,r=(Math.floor(a),l/864e5),o=Math.floor(r),c=-24*(o-r),n=Math.floor(c),i=-60*(n-c),h=Math.floor(-60*(n-c));return{daysold:o,hrsold:n,minsold:h,seconds:Math.floor(-60*(h-i)).toString()}},setCookie:(e,s,t)=>{let l=new Date;l.setTime(l.getTime()+1e3*t),document.cookie=e+"="+escape(s)+"; expires="+l.toGMTString()+"; path=/"},getCookie:e=>{let s,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return s=document.cookie.match(t),s?unescape(s[2]):null},randomString:e=>{e=e||32;let s="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",t="";for(let l=0;l<e;l++)t+=s.charAt(Math.floor(48*Math.random()));return t},minToTime:e=>{let s=parseInt(e),t=parseInt(60*(e-s));return t=1===(""+t).length?"0"+t:t,`${s}:${t}`},htmlReplace:(e,s,t)=>{$(e).html($(e).html().replace(s,t))},articleInfo:(e,s)=>{let t=1===s?"icon-marketing_fill":"icon-label-fill",l=1===s?"article-tag-class-color":"article-tag-color";$.each(e,(s=>{let a=$(e[s]);a.prepend(`<span class="iconfont ${t}"></span>`),$("#articleInfo").append(`<a href=" ${a.attr("href")}" target="_blank"><span class="article-info-tag ${l}"> ${a.text()}</span></a>`)}))}},t.__timeIds={},t.__event={},""===t.__config.info.name&&(t.__config.info.name=t.__status.user),n(2865)(`./${t.__status.pageType}`).then((e=>{const l=e.default;Promise.all([n.e(9509),n.e(3304)]).then(n.bind(n,7157)).then((e=>{(0,e.default)(t),l(t),n.e(3258).then(n.bind(n,9450)).then((e=>{(0,e.default)(t),t.__tools.setDomHomePosition(),(0,s.Z)(t).handle.scroll(),(0,s.Z)(t).handle.resize()}))}))}))}))}()}();