"use strict"

const WIDTH = 720;
const HEIGHT = 540;

const MESH = 24;

var gStyle = "#00ffff";
var gX = WIDTH / 2;
var gY = HEIGHT - MESH * 3;
var gScore = 0;
var gLife = 3;

// called once browser run
window.onload = function () {

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