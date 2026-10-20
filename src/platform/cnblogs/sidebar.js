const selectors = {
    news: '#sidebar_news',
    profile: '#profile_block',
    profileImages: '#profile_block img',
    stats: '.blogStats',
    postCount: '#stats_post_count',
    calendarTable: '#blogCalendar',
    calendar: '#blog-calendar',
    search: '#sidebar_search_box',
    scoreRank: '#sidebar_scorerank ul li',
    recentPosts: '#sidebar_recentposts ul li',
    tags: '#sidebar_toptags ul li',
    postCategories: '#sidebar_postcategory ul li',
    articleCategories: '#sidebar_articlecategory ul li',
    postArchive: '#sidebar_postarchive ul li',
    articleArchive: '#sidebar_articlearchive ul li',
    topViews: '#TopViewPostsBlock ul li',
    topDiggs: '#TopDiggPostsBlock ul li',
    comments: '#sidebar_recentcomments ul',
};

export function getSidebarNode(name) {
    return $(selectors[name]);
}
