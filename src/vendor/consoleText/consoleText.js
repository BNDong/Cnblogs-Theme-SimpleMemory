/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * @param words [] 循环文字数组
 * @param id string 文字domId
 * @param conId string 符合domId
 * @param colors [] 颜色
 * @param isCycle boolean 是否循环
 * @param callback fun 每个文字设置后回调
 */
export default function main(words, id, conId, colors, isCycle, callback) {
    if (colors === undefined) colors = ['#fff'];

    let visible = true;
    let con = document.getElementById(conId);
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById(id);

    con.innerHTML = '_';
    target.setAttribute('style', 'color:' + colors[0]);

    let conTId = window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);

            window.setTimeout(function () {
                let usedColor = colors.shift();
                colors.push(usedColor);
                let usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0]);
                letterCount += x;
                waiting = false;
            }, 1000);

        } else if (isCycle && letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
              x = -1;
              letterCount += x;
              waiting = false;
            }, 1000);
        } else if (waiting === false) {
            let ih = words[0].substring(0, letterCount);
            if (!isCycle && ih === words[0]) {
                window.clearInterval(conTId);
            } else {
                target.innerHTML = words[0].substring(0, letterCount);
                letterCount += x;
            }
        }

        callback && callback();
    }, 180);

    window.setInterval(function () {
        if (visible === true) {
            con.style.visibility = 'hidden';
            visible = false;
        } else {
            con.style.visibility = 'visible';
            visible = true;
        }
    }, 400);
}