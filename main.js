"use strict"

const WIDTH = 720;
const HEIGHT = 540;
const MESH = 24;
const MAG = 6;
const TIMER_INTERVAL = 33;

var gStyle = "#00ffff";
var gX = WIDTH / 2;
var gY = HEIGHT - MESH * 3;
var gScore = 0;
var gLife = 3;
var gKey = new Uint8Array(0x100);
var gTimer;
var gBall = [];
var gColor = ["#ff0000", "#ff00ff", "#00ff00", "#ffff00"];

class Ball {
    constructor(c) {
        this.mX = WIDTH / 2;
        this.mY = MESH;
        let a = Math.random() * 2.5 + (Math.PI - 2.5) / 2;
        this.mDX = Math.cos(a);
        this.mDY = Math.sin(a);
        this.mStyle = gColor[c];
    }
    draw(g) {
        g.fillStyle = this.mStyle;
        g.fillRect(this.mX - MAG, this.mY - MAG, MAG * 2, MAG * 2);
    }
    tick() {
        if (IsInRect(this.mX, this.mY, gX, gY, MESH, MESH)) {
            return (true);
        }

        this.mX += this.mDX;
        this.mY += this.mDY;
        if (this.mX < MESH || this.mX > WIDTH - MESH) {
            this.mDX = -this.mDX;
            this.mX += this.mDX;
            gScore++;
        }
        if (this.mY < MESH || this.mY > HEIGHT - MESH) {
            this.mDY = -this.mDY;
            this.mY += this.mDY;
            gScore++;
        }
        return (false);

    }
}

function IsInRect(x, y, rx, ry, rw, rh) {
    return (rx < x && x < rx + rw &&
        ry < y && y < ry + rh)
}

function draw() {

    let g = document.getElementById("main").getContext("2d");

    // game background
    g.fillStyle = "#ffffff";
    g.fillRect(0, 0, WIDTH, HEIGHT);

    // game board
    g.fillStyle = "#000000";
    g.fillRect(MESH, MESH, WIDTH - MESH * 2, HEIGHT - MESH * 2);

    // player
    g.fillStyle = gStyle;
    g.fillRect(gX, gY, MESH, MESH);


    // enemy
    for (let b of gBall) {
        b.draw(g)
    }

    g.font = "36px monospace";
    g.fillStyle = "#ffffff";
    g.fillText("Score:" + gScore, MESH * 2, MESH * 2.5);
    g.fillText("Life:" + gLife, MESH * 23, MESH * 2.5);

    if (gLife <= 0) {
        g.fillText("GAME OVER", WIDTH / 2 - MESH * 3, HEIGHT / 2)
    }

}

function start() {
    for (let i = 0; i < 8; i++) {
        gBall.push(new Ball(i % 3));
    }
}

function tick() {
    if (gLife <= 0) {
        return;
    }
    // if (gKey[37]) {
    //     gX -= MAG;
    // } 
    // if (gKey[39]) {
    //     gX += MAG;
    // }
    // above can be written as below
    gX = Math.max(MESH, gX - gKey[37] * MAG);
    gX = Math.min(WIDTH - MESH * 2, gX + gKey[39] * MAG);
    gY = Math.max(MESH, gY - gKey[38] * MAG);
    gY = Math.min(HEIGHT - MESH * 2, gY + gKey[40] * MAG);

    for (let i = 0; i < 4 + gScore / 20; i++) { // call 4 time to increase speed of ball
        // for (let b of gBall) {
        for (let i = gBall.length - 1; i >= 0; i--) {
            if (gBall[i].tick()) {
                gLife--;
                gStyle = gBall[i].mStyle;
                gBall.splice(i, 1);
            }
        }
    }

}
function onPaint() {
    if (!gTimer) {
        gTimer = performance.now();
    }

    if (gTimer + TIMER_INTERVAL < performance.now()) {
        gTimer += TIMER_INTERVAL
        tick()
        draw();
    }
    requestAnimationFrame(onPaint);

}

// called once key is pressed
window.onkeydown = function (ev) {
    // console.log(ev.keyCode);
    gKey[ev.keyCode] = 1;

    // console.log(gX);
}

// called once pressed key is released
window.onkeyup = function (ev) {
    gKey[ev.keyCode] = 0;
    // console.log(ev.keyCode);
}
// called once browser run
window.onload = function () {

    start();

    // called function, depend on cpu perfomace the hertz is different
    requestAnimationFrame(onPaint);

}
