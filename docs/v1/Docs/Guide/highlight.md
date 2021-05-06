# highlight

关于使用 highlight 渲染代码：在使用富文本编辑器时候样式没有问题，但是使用 Markdown 可能出现渲染样式显示不全的问题。

为了解决这个问题我在 v1.1.5 版本开始，将每个主题的样式文件重新处理（执行程序如下），保存至仓库中。该版本后开始引用本仓库的样式文件！

重新处理程序：

```php
<?php

$css = "default、a11y-dark、a11y-light、agate、an-old-hope、androidstudio、arduino-light、arta、ascetic、atelier-cave-dark、atelier-cave-light、atelier-dune-dark、atelier-dune-light、atelier-estuary-dark、atelier-estuary-light、atelier-forest-dark、atelier-forest-light、atelier-heath-dark、atelier-heath-light、atelier-lakeside-dark、atelier-lakeside-light、atelier-plateau-dark、atelier-plateau-light、atelier-savanna-dark、atelier-savanna-light、atelier-seaside-dark、atelier-seaside-light、atelier-sulphurpool-dark、atelier-sulphurpool-light、atom-one-dark-reasonable、atom-one-dark、atom-one-light、brown-paper、codepen-embed、color-brewer、darcula、dark、darkula、docco、dracula、far、foundation、github-gist、github、gml、googlecode、grayscale、gruvbox-dark、gruvbox-light、hopscotch、hybrid、idea、ir-black、isbl-editor-dark、isbl-editor-light、kimbie.dark、kimbie.light、lightfair、magula、mono-blue、monokai-sublime、monokai、nord、obsidian、ocean、paraiso-dark、paraiso-light、pojoaque、purebasic、qtcreator_dark、qtcreator_light、railscasts、rainbow、routeros、school-book、shades-of-purple、solarized-dark、solarized-light、sunburst、tomorrow-night-blue、tomorrow-night-bright、tomorrow-night-eighties、tomorrow-night、tomorrow、vs、vs2015、xcode、xt256、zenburn";
$cssArr = explode('、', $css);

$strPattern = "/\.hljs(,((?!\{).)*)*{(((?!\}).)*)}/i";

// 创建目录
$fileDir = './css' . date('YmdHis');
if (!is_dir($fileDir)) mkdir($fileDir, 0777, true);

foreach ($cssArr as $value) {
    $fileName = $value . '.min.css';
    $filePath = $fileDir . '/' . $fileName;

    $url = 'https://cdn.bootcss.com/highlight.js/9.15.9/styles/' . $fileName;

    // 获取文件内容
    $content = file_get_contents($url);

    // 正则匹配需要的样式
    $arrMatches = [];
    $content && preg_match_all($strPattern, $content, $arrMatches);


    // 扩展样式
    if (array_key_exists(3, $arrMatches) && $arrMatches[3]) {
        $style = implode(';', $arrMatches[3]);
        $style .= ';font-size: 14px!important;font-family: "Source Code Pro",Consolas,Menlo,Monaco,"Courier New",monospace!important;font-weight: 400;padding: 10px!important;white-space: pre;word-wrap: normal;';

        $addStyle = '.cnblogs-markdown .hljs, .cnblogs-post-body .hljs{' . $style . '}';

        $content .= $addStyle;
    }

    // 创建样式文件
    if (is_dir($fileDir) && !file_exists($filePath)) {
        if ($fp = fopen($filePath, 'w')) {
            fwrite($fp, $content);
            fclose($fp);
        }
    }
}

echo 'success';
```