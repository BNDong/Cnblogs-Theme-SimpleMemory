/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 控制台输出处理
 */

export default function main(_) {

    // 输出默认版权信息
    let github = ["\n %c %c %c CnblogsTheme-GitHub %c  %c github.com/BNDong/Cnblogs-Theme-SimpleMemory %c \n\n", "background: #fadfa3; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "background: #FCEDC9; color:#030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"];
    let gitee = ["\n %c %c %c CnblogsTheme-Gitee %c  %c gitee.com/dbnuo/Cnblogs-Theme-SimpleMemory %c \n\n", "background: #fadfa3; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "background: #FCEDC9; color:#030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"];
    window.console.log.apply(console, github);
    window.console.log.apply(console, gitee);

    // 输出用户配置信息
    if (_.__config.consoleList.length) {
        $.each(_.__config.consoleList, function (i) {
            let fl = _.__config.consoleList[i];
            console.log('\n' + ' %c '+(fl[0])+' %c '+(fl[1])+' ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; color:#000;padding:5px 0;');
        });
    }
}