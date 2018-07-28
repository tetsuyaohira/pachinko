"use strict";
var ctx, engine, offset = 0, catcher, score = 0, isMouseDown = false;

var walls = [
    [-100, -100, 100, 800],
    [-100, -100, 800, 100],
    [500, -100, 100, 800],
];

var lines = [
    [150, -50, -50, 150],
    [350, -50, 550, 150],
    [450, 200, 450, 800],
];

function init() {
    // エンジン初期化＆イベントハンドラ設定
    engine = new Engine(-100, -100, 700, 800, 0, 9, 8);
    var canvas = document.getElementById("canvas");
    canvas.onmousedown = mymousedown;
    canvas.onmouseup = mymouseup;
    canvas.addEventListener("touchstart", mymousedown);
    canvas.addEventListener("touchend", mymouseup);
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    // 壁
    walls.forEach(function (w) {
        var r = new RectangleEntity(w[0], w[1], w[2], w[3]);
        r.color = "gray";
        engine.entities.push(r);
    })

    lines.forEach(function (w) {
        var r = new LineEntity(w[0], w[1], w[2], w[3], 0.8);
        r.color = "gray";
        engine.entities.push(r);
    })


    // 釘


    // その他（Canvas,Timer）の初期化
    ctx = canvas.getContext("2d");
    ctx.font = "20pt Arial";
    ctx.strokeStyle = "blue";
    var timer = setInterval(tick, 50);

}

function tick() {
    if (isMouseDown) {
        offset = Math.min(offset + 5, 200);
    }
    catcher.sign *= (catcher.x > 500 || catcher.x < 0) ? -1 : 1;
    catcher.x = catcher.x + 5 * catcher.sign;

    engine.step(0.01);
    repaint();

}

function mymousedown(e) {

}

function mymouseup(e) {

}

function repaint() {

}

