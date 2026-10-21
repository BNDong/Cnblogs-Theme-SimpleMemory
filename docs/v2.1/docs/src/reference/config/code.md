---
outline: [2, 4]
---

# 代码配置

## code - 代码 {#code-代码}

### type - 代码渲染类型 {#type-代码渲染类型}

* 类型：`String`
* 默认值：`""`

使用何种方式渲染代码。

```javascript
window.cnblogsConfig = {
  code: {
    type: 'hljs',
  }
}

/** 所有可配置项
cnblogs: 使用博客园默认代码高亮样式。
hljs: 使用 Highlighting 插件渲染代码高亮样式。
*/
```

### options - 代码配置 {#options-代码配置}

#### hljs - Highlighting 插件样式配置 {#hljs-highlighting-插件样式配置}

* 类型：`Object`
* 默认值：

```json5
{
    theme: 'atom-one-dark-reasonable',
    languages: []
}
```

只有 `code.type` 为 `hljs` 时，此配置才生效。

* theme：代码高亮主题。

<details>
<summary>可用高亮主题</summary>

`default`, `a11y-dark`, `a11y-light`, `agate`, `an-old-hope`, `androidstudio`, `arduino-light`, `arta`, `ascetic`, `atelier-cave-dark`, `atelier-cave-light`, `atelier-dune-dark`, `atelier-dune-light`, `atelier-estuary-dark`, `atelier-estuary-light`, `atelier-forest-dark`, `atelier-forest-light`, `atelier-heath-dark`, `atelier-heath-light`, `atelier-lakeside-dark`, `atelier-lakeside-light`, `atelier-plateau-dark`, `atelier-plateau-light`, `atelier-savanna-dark`, `atelier-savanna-light`, `atelier-seaside-dark`, `atelier-seaside-light`, `atelier-sulphurpool-dark`, `atelier-sulphurpool-light`, `atom-one-dark-reasonable`, `atom-one-dark`, `atom-one-light`, `brown-paper`, `codepen-embed`, `color-brewer`, `darcula`, `dark`, `darkula`, `docco`, `dracula`, `far`, `foundation`, `github-gist`, `github`, `gml`, `googlecode`, `grayscale`, `gruvbox-dark`, `gruvbox-light`, `hopscotch`, `hybrid`, `idea`, `ir-black`, `isbl-editor-dark`, `isbl-editor-light`, `kimbie.dark`, `kimbie.light`, `lightfair`, `magula`, `mono-blue`, `monokai-sublime`, `monokai`, `nord`, `obsidian`, `ocean`, `paraiso-dark`, `paraiso-light`, `pojoaque`, `purebasic`, `qtcreator_dark`, `qtcreator_light`, `railscasts`, `rainbow`, `routeros`, `school-book`, `shades-of-purple`, `solarized-dark`, `solarized-light`, `sunburst`, `tomorrow-night-blue`, `tomorrow-night-bright`, `tomorrow-night-eighties`, `tomorrow-night`, `tomorrow`, `vs`, `vs2015`, `xcode`, `xt256`, `zenburn`

</details>

* languages：自动识别的候选语言，使用小写名称或已支持的别名。空数组加载完整语言集。

当前代码支持按需加载 `xml`、`css`、`javascript`、`handlebars`、`typescript`、`json`、`bash`、`java`、`python`、`sql`、`go`、`rust`、`c`、`cpp`、`markdown`、`ruby`、`yaml` 和 `plaintext`，正文显式标记的语言及语法依赖也会一并加载。遇到不支持按需加载的语言或无法识别的代码样式类时，会回退到完整语言集。

这是当前源码的行为，旧版本不一定包含按需加载优化。主题使用 Highlight.js 10.x；可用语法以安装版本为准。

```javascript
window.cnblogsConfig = {
  code: {
    type: 'hljs',
    options: {
      hljs: {
        theme: 'atom-one-dark-reasonable',
        languages: ['bash', 'css', 'javascript', 'go', 'xml']
      },
    },
  },
}
```

#### maxHeight - 代码框高度限制 {#maxheight-代码框高度限制}

* 类型：`String`
* 默认值：`""`

限制高度，例如 `70vh` 或 `480px`。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      maxHeight: '70vh',
    },
  },
}
```

#### line - 代码行号渲染 {#line-代码行号渲染}

* 类型：`Boolean`
* 默认值：`false`

是否渲染代码行号，如开启会在代码框左侧增加行号显示，默认不开启。
不与博客园行号渲染兼容，如果博客园添加代码时勾选显示行号并同时开启此配置，会出现双行号的现象。大家自己权衡使用此配置。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      line: true,
    },
  },
}
```

#### macStyle - Mac 风格代码框 {#macstyle-mac-风格代码框}

* 类型：`Boolean`
* 默认值：`true`

Mac 风格代码框样式。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
      macStyle: true,
    },
  },
}
```

#### fontSize - 代码字体大小 <Badge type="tip" text="v2.1.1" /> {#fontsize-代码字体大小}

* 类型：`Number`
* 默认值：`14`

代码字体大小，数值类型，单位px。

```javascript
window.cnblogsConfig = {
  code: {
    options: {
        fontSize: 20,
    },
  },
}
```
