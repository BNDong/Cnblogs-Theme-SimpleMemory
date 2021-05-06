# 书单

样式参考：[https://www.cnblogs.com/bndong/p/10300036.html](https://www.cnblogs.com/bndong/p/10300036.html)

## 配置方式

### 标识页面为书单页面

首先需要在页面源码中加入以下代码，来标识该页面为书单页面：

```html
<input id="bookListFlg" type="hidden">
```

!> 注意：是添加到Html源码中，博客园文章的富文本编辑器和 Markdown 都有添加Html代码的方式！

#### 富文本编辑器

![reprinted_01](../../Images/reprinted_01.png)

#### Markdown

直接拷贝到文本即可。

### 配置书单数据

书单的配置，可以参考其他[配置](https://bndong.github.io/Cnblogs-Theme-SimpleMemory/v2/#/Docs/Customization/config)的方式。例如：

```javascript
window.cnblogsConfig = {
    bookList: [],
}
```

但是一般书单的数据比较多，所以建议将此配置单独出来。例如：

```javascript

    //  正常配置
    window.cnblogsConfig = {
        ...
    };

    // 书单配置
    window.cnblogsConfig.bookList = [
        {
            title: '标题1',
            books: [
                {
                    cover: 'https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s29934992.jpg',
                    name: '后物欲时代的来临',
                    formerName: '',
                    author: '郑也夫',
                    translator: '',
                    press: '中信出版社',
                    year: '2016-8',
                    score: 2,
                    readDate: '21.02.05',
                    readPercentage: '100%'
                }
            ]
        },
        {
            title: '标题2',
            books: [
                {
                    cover: 'https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s29934992.jpg',
                    name: '后物欲时代的来临',
                    formerName: '',
                    author: '郑也夫',
                    translator: '',
                    press: '中信出版社',
                    year: '2016-8',
                    score: 5,
                },
                {
                    cover: 'https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s2180473.jpg',
                    name: '厚黑学',
                    formerName: '',
                    author: '李宗吾',
                    translator: '',
                    press: '群言出版社',
                    year: '2006-9',
                    score: 3,
                }
            ]
        },
    ];
```

?> 请按照此格式配置，无内容可以不配置。

|**Key**|**Description**|
|:-----:|:-----:|
|**title**|书目标题，可以不填|
|**books**|书目数据|
|**books.cover**|封面|
|**books.name**|书名|
|**books.formerName**|原书名|
|**books.author**|作者|
|**books.translator**|译者|
|**books.press**|出版社|
|**books.year**|出版年|
|**books.score**|评级1～5，支持.5|
|**books.readDate**|阅读日期|
|**books.readPercentage**|阅读进度|