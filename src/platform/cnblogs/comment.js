const selectors = {
    authorAvatars: '.author_avatar',
    items: '.feedbackItem',
    postedAuthor: '.comment_my_posted a',
    postedText: '.bq_post_comment',
    posted: '.comment_my_posted',
    placeholder: '#blog-comments-placeholder',
    lastItem: '.feedbackItem:last',
    images: '.feedbackCon img',
};
const children = {
    content: '.feedbackCon',
    subtitle: '.feedbackListSubtitle',
    body: '.blog_comment_body',
    owner: '.louzhu',
};
const requests = {
    list: 'comments-block',
    add: 'PostComment/Add.aspx',
    remove: 'comment/DeleteComment.aspx',
};

export function getCommentNode(name, id) {
    if (name === 'avatar') return $('#comment_' + id + '_avatar');
    if (name === 'author') return $('#a_comment_author_' + id);
    if (name === 'body') return $(`#comment_body_${id}`);
    return $(selectors[name]);
}

export function isCommentRequest(url, type) {
    return url.includes(requests[type]);
}

export function findCommentNode(parent, name) {
    return parent.find(children[name]);
}
