var mouseX = mouseY = mouseOldX = mouseOldY = 0,
                    C,c,viewWidth,viewHeight,
                    triW = window.cnblogsConfig.essayTopAnimation.triW,
                    triH = window.cnblogsConfig.essayTopAnimation.triH,
                    neighbours = window.cnblogsConfig.essayTopAnimation.neighbours,
                    speedTrailAppear = window.cnblogsConfig.essayTopAnimation.speedTrailAppear,
                    speedTrailDisappear = window.cnblogsConfig.essayTopAnimation.speedTrailDisappear,
                    speedTriOpen = window.cnblogsConfig.essayTopAnimation.speedTriOpen,
                    trailMaxLength = window.cnblogsConfig.essayTopAnimation.trailMaxLength,
                    trailIntervalCreation = window.cnblogsConfig.essayTopAnimation.trailIntervalCreation,
                    delayBeforeDisappear = window.cnblogsConfig.essayTopAnimation.delayBeforeDisappear,
                    cols, rows,
                    tris,
                    randomAlpha = true,

                    colors = window.cnblogsConfig.essayTopAnimation.colors;

            Triangle = function(pos, column, row) {
                var thisTri = this;
                this.selectedForTrail = false;
                this.pos = pos;
                this.col = column;
                this.row = row;
                this.alpha = this.tAlpha = 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rgb = hexToRgb(this.color);
                this.opened = false;
                this.opening = false;
                this.closing = false;
                this.isLeft = (this.pos % 2);

                this.tX1 = (this.isLeft) ? (this.col + 1) * triW : this.col * triW;
                this.tX2 = (this.isLeft) ? this.col * triW : (this.col + 1) * triW;
                this.tX3 = (this.isLeft) ? (this.col + 1) * triW : this.col * triW;

                this.x1 = this.tX1;
                this.x2 = this.tX1;
                this.x3 = this.tX1;

                this.tY1 = .5 * this.row * triH;
                this.tY2 = .5 * (this.row + 1) * triH;
                this.tY3 = .5 * (this.row + 2) * triH;

                this.y1 = this.tY1;
                this.y2 = this.tY1;
                this.y3 = this.tY1;

                this.tweenClose, this.tweenOpen;
                this.draw = function() {
                    c.fillStyle = 'rgba(' + this.rgb.r + ',' + this.rgb.g + ',' + this.rgb.b + ',' + this.alpha + ')';
                    c.beginPath();
                    c.moveTo(this.x1, this.y1);
                    c.lineTo(this.x2, this.y2);
                    c.lineTo(this.x3, this.y3);
                    c.closePath();
                    c.fill();
                }

                this.open = function(direction, targetSpeed, targetAlpha, targetDelay) {

                    if (!this.opened || !this.opening) {
                        if (this.tweenClose) this.tweenClose.kill();
                        this.opening = true;
                        this.direction = direction || "top";
                        this.delay = targetDelay || 0;
                        this.tAlpha = targetAlpha;
                        this.tSpeed = targetSpeed || 1.5;
                        if (this.direction == "side") {
                            this.x1 = this.x2 = this.x3 = this.tX1;
                            this.y1 = this.tY1;
                            this.y2 = this.tY2;
                            this.y3 = this.tY3;
                        } else if (this.direction == "top") {
                            this.x1 = (this.tX2 + this.tX3) / 2;
                            this.x2 = this.tX2;
                            this.x3 = this.tX3;
                            this.y1 = (this.tY2 + this.tY3) / 2;
                            this.y2 = this.tY2;
                            this.y3 = this.tY3;
                        } else if (this.direction == "bottom") {
                            this.x1 = this.tX1;
                            this.x2 = this.tX2;
                            this.x3 = (this.tX1 + this.tX2) / 2;
                            this.y1 = this.tY1;
                            this.y2 = this.tY2;
                            this.y3 = (this.tY1 + this.tY2) / 2;
                        }
                        this.tweenOpen = TweenMax.to(this, this.tSpeed, {
                            x1: this.tX1,
                            x2: this.tX2,
                            x3: this.tX3,
                            y1: this.tY1,
                            y2: this.tY2,
                            y3: this.tY3,
                            alpha: this.tAlpha,
                            ease: Strong.easeInOut,
                            delay: this.delay,
                            onComplete:openComplete,
                            onCompleteParams:[thisTri]
                        });
                    }
                }

                this.close = function(direction, targetSpeed, targetDelay) {
                    //if (this.opened) {
                    this.direction = direction || "top";
                    this.delay = targetDelay || 1;
                    this.tSpeed = targetSpeed || .8;
                    this.opened = false;
                    this.closing = true;
                    var closeX1, closeX2, closeX3, closeY1, closeY2, closeY3;

                    if (this.direction == "side") {
                        closeX1 = closeX2 = closeX3 = this.tX1;
                        closeY1 = this.tY1;
                        closeY2 = this.tY2;
                        closeY3 = this.tY3;
                    } else if (this.direction == "top") {
                        closeX1 = (this.tX2 + this.tX3) / 2;
                        closeX2 = this.tX2;
                        closeX3 = this.tX3;
                        closeY1 = (this.tY2 + this.tY3) / 2;
                        closeY2 = this.tY2;
                        closeY3 = this.tY3;
                    } else if (this.direction == "bottom") {
                        closeX1 = this.tX1;
                        closeX2 = this.tX2;
                        closeX3 = (this.tX1 + this.tX2) / 2;
                        closeY1 = this.tY1;
                        closeY2 = this.tY2;
                        closeY3 = (this.tY1 + this.tY2) / 2;
                    }
                    if (this.tweenClose) this.tweenClose.kill();
                    this.tweenClose = TweenMax.to(this, this.tSpeed, {
                        x1: closeX1,
                        x2: closeX2,
                        x3: closeX3,
                        y1: closeY1,
                        y2: closeY2,
                        y3: closeY3,
                        alpha: 0,
                        ease: Strong.easeInOut,
                        delay: this.delay,
                        onComplete:closeComplete,
                        onCompleteParams:[thisTri]
                    });
                    // }
                }
            }

            function openComplete(tri){
                tri.opened = true;
                tri.opening = false;
                tri.closing = false;
            }

            function closeComplete(tri){
                tri.opened = false;
                tri.opening = false;
                tri.closing = false;
            }

            /*
             function handleMouseMove(e){
             mouseX = event.clientX - rectCanvas.left;
             mouseY = event.clientY - rectCanvas.top;
             mouseSpeedX = mouseX - mouseOldX;
             mouseSpeedY = mouseY - mouseOldY;
             if (Math.abs(mouseSpeedX)>Math.abs(mouseSpeedY)){
             mouseDirection = "h";
             }else{
             mouseDirection = "v";
             }
             mouseOldX = mouseX;
             mouseOldY = mouseY;

             var tcol = Math.floor(mouseX/triW);
             var trow = Math.floor((mouseY-triH/4)/(triH/2));
             var trianglePos = tcol + (trow*cols);
             var ts = tris[trianglePos];
             var openDirection;

             for (var i=0;i<tris.length;i++){
             var tt = tris[i];
             if (tt == ts){
             if (mouseDirection == "v"){
             if (mouseSpeedY>0){
             openDirection = "bottom";
             }else{
             openDirection  = "top";
             }

             }else { // mouse direction horizontal
             if (mouseSpeedX>0){
             if (tt.isLeft){
             openDirection = "bottom";
             }else{
             openDirection = "side";
             }
             }else{
             if (tt.isLeft){
             openDirection = "side";
             }else{
             openDirection = "bottom";
             }
             }
             }
             tt.open(openDirection, .5, 1, 0);
             }else{
             tt.close();
             }
             }
             draw();
             }
             */

            function unselectTris() {
                for (var i = 0; i < tris.length; i++) {
                    tris[i].selectedForTrail = false;
                }
            }

            function createTrail() {
                unselectTris();
                var currentTri;
                var trailLength = Math.floor(Math.random() * trailMaxLength - 2) + 2;
                var index = Math.round(Math.random() * tris.length);
                startTri = tris[index];
                if (typeof(startTri) != "undefined" && typeof(startTri.selectedForTrail) != "undefined") {
                    startTri.selectedForTrail = true;
                } else {
                    return false;
                }
                currentTri = {
                    tri: startTri,
                    openDir: "side",
                    closeDir: "side"
                };

                for (var i = 0; i < trailLength; i++) {
                    var o = getNeighbour(currentTri.tri);
                    if (o != null) {
                        o.tri.selectedForTrail = true;
                        var opacity;
                        if (randomAlpha){
                            opacity = (Math.random()<.8) ? Math.random()*.5 : 1;
                        }else{
                            opacity = 1;
                        }
                        currentTri.tri.closeDir = o.openDir;
                        currentTri.tri.open(currentTri.openDir, speedTriOpen, opacity, i* speedTrailAppear);
                        currentTri.tri.close(currentTri.closeDir, 1, delayBeforeDisappear + i*speedTrailDisappear);
                        currentTri = o;
                    } else {
                        currentTri.tri.open(currentTri.openDir, speedTriOpen, opacity, (i+1)* speedTrailAppear);
                        currentTri.tri.close(currentTri.closeDir, 1, delayBeforeDisappear + (i+1)*speedTrailDisappear);
                        break;
                    }
                }
            }

            function getNeighbour(t) {
                shuffleArray(neighbours);
                for (var i = 0; i < neighbours.length; i++) {
                    if (neighbours[i] == "top") {
                        if (t.row != 0 && !tris[t.pos - cols].selectedForTrail && !tris[t.pos-cols].opened) {
                            return {
                                tri: tris[t.pos - cols],
                                openDir: "top",
                                closeDir: "top"
                            };
                        }

                    } else if (neighbours[i] == "bottom") {
                        if (t.row != rows - 1 && !tris[t.pos + cols].selectedForTrail && !tris[t.pos+cols].opened) {
                            return {
                                tri: tris[t.pos + cols],
                                openDir: "bottom",
                                closeDir: "top"
                            };
                        }
                    } else {
                        if (t.isLeft && t.col != cols - 1 && !tris[t.pos + 1].selectedForTrail && !tris[t.pos+1].opened) {
                            return {
                                tri: tris[t.pos + 1],
                                openDir: "side",
                                closeDir: "top"
                            };
                        } else if (!t.isLeft && t.col != 0 && !tris[t.pos - 1].selectedForTrail && !tris[t.pos-1].opened) {
                            return {
                                tri: tris[t.pos - 1],
                                openDir: "side",
                                closeDir: "top"
                            };
                        }
                    }
                }
                return null;
            }

            function draw() {
                c.clearRect(0, 0, C.width, C.height);
                for (var i = 0; i < tris.length; i++) {
                    tris[i].draw();
                }
            }

            function handleResize() {
                viewWidth = C.width = C.scrollWidth;
                viewHeight = C.height  = C.scrollHeight;
                rectCanvas = C.getBoundingClientRect();
                start();
            }

            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            function shuffleArray(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            }

            function initCanvas(canvasId) {
                C = document.getElementById(canvasId),
                        c = C.getContext('2d'),
                        viewWidth = C.width = C.scrollWidth,
                        viewHeight = C.height  = C.scrollHeight,
                        initParams();
                //document.onmousemove = handleMouseMove;
                window.addEventListener("resize", handleResize);
                TweenLite.ticker.addEventListener("tick", draw);
                handleResize();
            }


            function initParams(){
                cols = Math.floor(viewWidth / triW);
                cols = (cols % 2) ? cols : cols - 1; // => keep it odd
                rows = Math.floor(viewHeight / triH) * 2;
                tris = [];
            }

            function initGrid() {
                for (var j = 0; j < rows; j++) {
                    for (var i = 0; i < cols; i++) {
                        var pos = i + (j * cols);
                        var triangle = new Triangle(pos, i, j);
                        tris.push(triangle);
                        triangle.draw();
                    }
                }
            }

            var interval;

            function start(){
                if (interval) clearInterval(interval);
                initParams();
                initGrid();
                interval = setInterval(createTrail, trailIntervalCreation);
                createTrail();
            }

            function pause(){
                if (interval) clearInterval(interval);
                for (var i = 0; i < tris.length; i++) {
                    if (tris[i].tweenClose) tris[i].tweenClose.kill();
                }
            }

            function closeAll(){
                var count = 0;
                if (interval) clearInterval(interval);
                for (var i = 0; i < tris.length; i++) {
                    if (tris[i].tweenOpen) tris[i].tweenOpen.kill();
                    if (tris[i].opened || tris[i].opening){
                        count++;
                        tris[i].close("top", .8, .2+.0015*count);
                    }
                }
            }

            function kill(){
                if (interval) clearInterval(interval);
                for (var i = 0; i < tris.length; i++) {
                    TweenLite.killTweensOf(tris[i]);
                    tris[i].alpha = 0;
                }
            }