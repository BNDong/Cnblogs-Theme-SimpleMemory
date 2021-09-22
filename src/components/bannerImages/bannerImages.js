/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: banner 背景切换处理
 */
import {gsap, Power4} from "gsap/all";

export default function main(id, images, cols, time, sort, current) {
    const main = document.getElementById(id);

    let parts   = []; // 列容器对象
    let playing = false; // 是否执行动画

    // 生成图片对象
    for (let i in images) {
        new Image().src = images[i];
    }

    // 生成列dom
    for (let col = 0; col < cols; col++) {
        let part = document.createElement('div');
        part.className = 'part';

        let el = document.createElement('div');
        el.className = "section";

        let img = document.createElement('img');
        img.src = images[current];

        el.appendChild(img);
        part.style.setProperty('--x', -100 / cols * col + 'vw');
        part.appendChild(el);
        main.appendChild(part);
        parts.push(part);
    }

    // 动画配置
    let animOptions = {
        duration: 2.3,
        ease: Power4.easeInOut
    };


    function go(dir) {
        if (!playing) {
            playing = true;
            if (current + dir < 0) current = images.length - 1; else if (current + dir >= images.length) current = 0; else
                current += dir;

            function up(part, next) {
                part.appendChild(next);
                gsap.to(part, {...animOptions, y: (document.getElementById(id).offsetHeight * -1)}).then(function () {
                    part.children[0].remove();
                    gsap.to(part, {duration: 0, y: 0});
                });
            }

            function down(part, next) {
                part.prepend(next);
                gsap.to(part, {duration: 0, y: (document.getElementById(id).offsetHeight * -1)});
                gsap.to(part, {...animOptions, y: 0}).then(function () {
                    part.children[1].remove();
                    playing = false;
                });
            }

            for (let p in parts) {
                let part = parts[p];
                let next = document.createElement('div');
                next.className = 'section';
                let img = document.createElement('img');
                img.src = images[current];
                next.appendChild(img);

                if ((p - Math.max(0, dir)) % 2) {
                    down(part, next);
                } else {
                    up(part, next);
                }
            }
        }
    }

    // 定时执行
    window.setInterval(() => {
        go(sort);
    }, time);
}