/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 鼠标移动特效
 */
import '../../style/mouse.css';
import {gsap} from "gsap/all";

export default function main(_) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';

    const cursorF = document.createElement('div');
    cursorF.className = 'cursor-f';

    let cursorX = 0;
    let cursorY = 0;
    let pageX = 0;
    let pageY = 0;
    let size = _.__config.animate.mouse.options.size;
    let sizeF = _.__config.animate.mouse.options.sizeF;
    let followSpeed = .16;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorF);

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorF.style.display = 'none';
    }

    cursor.style.setProperty('--size', size + 'px');
    cursorF.style.setProperty('--size', sizeF + 'px');

    window.addEventListener('mousemove', function (e) {
        pageX = e.pageX;
        pageY = e.pageY;
        cursor.style.top = pageY - size / 2 + 'px';
        let cursorLeft  = pageX - size / 2;
        let offsetWidth = document.body.offsetWidth;
        cursorLeft = cursorLeft < 0 ? 0 : (
            offsetWidth - size < cursorLeft ? offsetWidth - size : cursorLeft
        );
        cursor.style.left = cursorLeft + 'px';
    });

    function lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
    }

    function loop() {
        cursorX = lerp(cursorX, pageX, followSpeed);
        cursorY = lerp(cursorY, pageY, followSpeed);
        cursorF.style.top = cursorY - sizeF / 2 + 'px';
        let cursorFLeft = cursorX - sizeF / 2;
        let offsetWidth = document.body.offsetWidth;
        cursorFLeft = cursorFLeft < 0 ? 0 : (
            offsetWidth - sizeF < cursorFLeft ? offsetWidth - sizeF : cursorFLeft
        );
        cursorF.style.left = cursorFLeft + 'px';

        requestAnimationFrame(loop);
    }

    loop();

    let startY;
    let endY;
    let clicked = false;

    function mousedown(e) {
        gsap.to(cursor, {scale: 4.5});
        gsap.to(cursorF, {scale: .4});

        clicked = true;
        startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
    }

    function mouseup(e) {
        gsap.to(cursor, {scale: 1});
        gsap.to(cursorF, {scale: 1});

        endY = e.clientY || endY;
        if (clicked && startY && Math.abs(startY - endY) >= 40) {
            // go(!Math.min(0, startY - endY) ? 1 : -1);
            clicked = false;
            startY = null;
            endY = null;
        }
    }

    window.addEventListener('mousedown', mousedown, false);
    window.addEventListener('touchstart', mousedown, false);
    window.addEventListener('touchmove', function (e) {
        if (clicked) {
            endY = e.touches[0].clientY || e.targetTouches[0].clientY;
        }
    }, false);
    window.addEventListener('touchend', mouseup, false);
    window.addEventListener('mouseup', mouseup, false);
}