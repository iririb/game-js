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

    g.font = "36px monospace";
    g.fillStyle = "#ffffff";
    g.fillText("Score:" + gScore, MESH * 2, MESH * 2.5);
    g.fillText("Life:" + gLife, MESH * 23, MESH * 2.5);

}

function tick() {
    // if (gKey[37]) {
    //     gX -= MAG;
    // } 
    // if (gKey[39]) {
    //     gX += MAG;
    // }
    // above can be written as below
    gX -= gKey[37] * MAG;
    gX += gKey[39] * MAG;
    gY -= gKey[38] * MAG;
    gY += gKey[40] * MAG;

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

    // called function, depend on cpu perfomace the hertz is different
    requestAnimationFrame(onPaint);

}
