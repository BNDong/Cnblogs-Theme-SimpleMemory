// 动态节点可能被替换，查询结果不缓存。
export function getHome() {
    return $('#home');
}

export function getHeader() {
    return $('.main-header');
}

export function getPostReadMore() {
    return $('#main .c_b_p_desc_readmore');
}

export function getPostTitles() {
    return $('#main .postTitle');
}

export function getEntryTitles() {
    return $('#main .entrylistPosttitle');
}

export function getPostDescriptions() {
    return $('.c_b_p_desc');
}
