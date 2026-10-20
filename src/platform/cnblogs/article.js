const selectors = {
    title: '#cb_post_title_url',
    body: '#cnblogs_post_body',
    description: '.postDesc',
    views: '#post_view_count',
    comments: '#post_comment_count',
    categories: '#BlogPostCategory',
    tags: '#EntryTag',
    paragraphs: '.blogpost-body p',
    diggCount: '#digg_count',
};

export function getArticleNode(name) {
    return $(getArticleSelector(name));
}

export function getArticleSelector(name) {
    return selectors[name];
}
