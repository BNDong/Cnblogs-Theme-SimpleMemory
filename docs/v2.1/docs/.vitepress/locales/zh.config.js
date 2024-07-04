export default {
  label: "简体中文",
  lang: "zh",
  link: "/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/install", activeMatch: "/guide/" },
      { text: "参考", link: "/reference/configs", activeMatch: "/reference/" },
      { text: "更新历史", link: "/changelog/", activeMatch: "/changelog/" },
    ],
    sidebar: {
      '/guide/': [
        {
          "text": "入门",
          "collapsed": false,
          "items": [
            {
              "text": "安装配置",
              "link": "/guide/install"
            }
          ]
        },
        {
          "text": "写作",
          "collapsed": false,
          "items": [
            {
              "text": "书写规范",
              "link": "/guide/writtenForm"
            },
            {
              "text": "菜单数据",
              "link": "/guide/menuData"
            },
            {
              "text": "标题/目录",
              "link": "/guide/articleDirectory"
            },
          ]
        },
        {
          "text": "其它",
          "collapsed": false,
          "items": [
            {
              "text": "资源托管",
              "link": "/guide/resourceCdn"
            },
            {
              "text": "版本切换",
              "link": "/guide/versionSwitch"
            },
            {
              "text": "调试开发",
              "link": "/guide/codespaces"
            },
            {
              "text": "关于项目",
              "link": "/guide/my"
            },
          ]
        }
      ],
      "/reference/": [
        {
          "text": "参考",
          // "collapsed": false,
          "items": [
            {
              "text": "配置项",
              "link": "/reference/configs"
            },
            {
              "text": "转载文章",
              "link": "/reference/reprinted"
            },
            {
              "text": "字体图标",
              "link": "/reference/fonticon"
            },
            {
              "text": "Loading",
              "link": "/reference/loading"
            },
            {
              "text": "书单页",
              "link": "/reference/bookList"
            },
            {
              "text": "友链页",
              "link": "/reference/links"
            },
            {
              "text": "钩子",
              "link": "/reference/hook"
            },
          ]
        }
      ]
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "上次更新时间"
    },
    darkModeSwitchLabel: "日/夜间模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    editLink: {
      pattern: 'https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/edit/v2/docs/v2.1/docs/src/:path',
      text: "编辑此页面"
    },
    outline: "deep",
    outlineTitle: "文档导读",
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    },
    footer: {
      copyright: " ☘️ SimpleMemory © 2018-2024",
    },
  },
};
