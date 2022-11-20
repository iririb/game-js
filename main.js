// called once browser run
window.onload = function () {

    let g = document.getElementById("main").getContext("2d");

    g.fillStyle = "#0000ff";
    g.fillRect(20, 40, 60, 80);

    g.font = "36px monospace";
    g.fillStyle = "#ffffff";
    g.fillText("hello world", 100, 100);


}