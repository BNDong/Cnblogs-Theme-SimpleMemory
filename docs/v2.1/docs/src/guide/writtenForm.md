# 书写规范

### 编辑器

* 富文本编辑器建议：`TinyMCE`
* MD 编辑器建议：`Markdown`

### 规范

|                                    **类型**                                    |  **TinyMCE**   | **Markdown** |
| :----------------------------------------------------------------------------: | :------------: | :----------: |
|                                  **一级标题**                                  |     `<h1>`     |     `#`      |
|                                  **二级标题**                                  |     `<h2>`     |     `##`     |
|                                  **引用文字**                                  | `引用 or <h6>` |     `>`      |
|                                  **行内代码**                                  |   `行内代码`   |      `       |
|   [代码折叠](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/381)    |   见下方示例   |  见下方示例  |
| [重要/警告引用](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/380) |      `!>`      |     `!>`     |
| [普通/信息引用](https://github.com/BNDong/Cnblogs-Theme-SimpleMemory/pull/380) |      `?>`      |     `?>`     |
|**下划线**|`<mu>内容</mu>`| `~u内容u~` |
|**圆圈**|`<mc>内容</mc>`| `~c内容c~`|
|**盒子**|`<mbox>内容</mbox>`| `~b内容b~` |
|**高亮**|`<mhl>内容</mhl>`| `~h内容h~`|
|**大括号**|`<mbk>内容</mbk>`|`~bk内容bk~` |
|**删除线**|`<mst>内容</mst>`| `~s内容s~`|
|**划掉**|`<mco>内容</mco>`| `~x内容x~`|

**代码折叠示例**

```html
<details>
    <summary> 代码 </summary>
    代码块内容
</details>
```