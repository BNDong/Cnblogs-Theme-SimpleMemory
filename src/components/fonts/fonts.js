// fonts.families 未配置或为空数组时加载全部字体。
const loaders = {
    'Long Cang': () => import(/* webpackChunkName: "font-long-cang" */ '../../style/google-fonts/long-cang.css'),
    'Noto Sans SC': () => import(/* webpackChunkName: "font-noto-sans-sc" */ '../../style/google-fonts/noto-sans-sc.css'),
    'Noto Serif SC': () => import(/* webpackChunkName: "font-noto-serif-sc" */ '../../style/google-fonts/noto-serif-sc.css'),
    'Playball': () => import(/* webpackChunkName: "font-playball" */ '../../style/google-fonts/playball.css'),
    'Ubuntu Mono': () => import(/* webpackChunkName: "font-ubuntu-mono" */ '../../style/google-fonts/ubuntu-mono.css'),
    'ZCOOL XiaoWei': () => import(/* webpackChunkName: "font-zcool-xiaowei" */ '../../style/google-fonts/zcool-xiaowei.css'),
};

export default function loadFonts(_) {
    const families = _.__config.fonts && _.__config.fonts.families;
    if (!Array.isArray(families) || !families.length || families.some(name => !Object.prototype.hasOwnProperty.call(loaders, name))) {
        return import(/* webpackChunkName: "google-fonts" */ '../../style/google-fonts.css');
    }
    return Promise.all([...new Set(families)].map(name => loaders[name]()));
}
