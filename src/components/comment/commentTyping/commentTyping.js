/**
 * UPDATES AND DOCS AT: https://github.com/wangyang0210
 * https://www.cnblogs.com/wangyang0210/
 * @author: https://github.com/disjukr/activate-power-mode
 * @Date 2023-02-19 12:54
 * ----------------------------------------------
 * @describe: POWERMODE
 */

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999';
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
document.body.appendChild(canvas);
let context = canvas.getContext('2d');
let particles = [];
let particlePointer = 0;
let rendering = false;

POWERMODE.shake = true;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getColor(el) {
    if (POWERMODE.colorful) {
        let u = getRandom(0, 360);
        return 'hsla(' + getRandom(u - 10, u + 10) + ', 100%, ' + getRandom(50, 80) + '%, ' + 1 + ')';
    } else {
        return window.getComputedStyle(el).color;
    }
}

function getCaret() {
    let el = document.activeElement;
    let bcr;
    if (el.tagName === 'TEXTAREA' ||
        (el.tagName === 'INPUT' && el.getAttribute('type') === 'text')) {
        let offset = require('./textareaCaretPosition')(el, el.selectionEnd);
        bcr = el.getBoundingClientRect();
        return {
            x: offset.left + bcr.left,
            y: offset.top + bcr.top,
            color: getColor(el)
        };
    }
    let selection = window.getSelection();
    if (selection.rangeCount) {
        let range = selection.getRangeAt(0);
        let startNode = range.startContainer;
        if (startNode.nodeType === document.TEXT_NODE) {
            startNode = startNode.parentNode;
        }
        bcr = range.getBoundingClientRect();
        return {
            x: bcr.left,
            y: bcr.top,
            color: getColor(startNode)
        };
    }
    return { x: 0, y: 0, color: 'transparent' };
}

function createParticle(x, y, color) {
    return {
        x: x,
        y: y,
        alpha: 1,
        color: color,
        velocity: {
            x: -1 + Math.random() * 2,
            y: -3.5 + Math.random() * 2
        }
    };
}

function POWERMODE() {
    { // spawn particles
        let caret = getCaret();
        let numParticles = 5 + Math.round(Math.random() * 10);
        while (numParticles--) {
            particles[particlePointer] = createParticle(caret.x, caret.y, caret.color);
            particlePointer = (particlePointer + 1) % 500;
        }
    }
    { // shake screen
        if (POWERMODE.shake) {
            let intensity = 1 + 2 * Math.random();
            let x = intensity * (Math.random() > 0.5 ? -1 : 1);
            let y = intensity * (Math.random() > 0.5 ? -1 : 1);
            document.body.style.marginLeft = x + 'px';
            document.body.style.marginTop = y + 'px';
            setTimeout(function() {
                document.body.style.marginLeft = '';
                document.body.style.marginTop = '';
            }, 75);
        }
    }
    if(!rendering){
        requestAnimationFrame(loop);
    }
};
POWERMODE.colorful = false;

function loop() {
    rendering = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    let rendered = false;
    let rect = canvas.getBoundingClientRect();
    for (let i = 0; i < particles.length; ++i) {
        let particle = particles[i];
        if (particle.alpha <= 0.1) continue;
        particle.velocity.y += 0.075;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha *= 0.96;
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.fillRect(
            Math.round(particle.x - 1.5) - rect.left,
            Math.round(particle.y - 1.5) - rect.top,
            3, 3
        );
        rendered = true;
    }
    if(rendered){
        requestAnimationFrame(loop);
    }else{
        rendering = false;
    }
}

module.exports = POWERMODE;
