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
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 8 + i % 2; j++) {
            var x = (j * 50 + 50) - 25 * (i % 2);
            var r = new CircleEntity(x, i * 50 + 100, 5, BodyStatic, 1);
            r.color = "blue";
            engine.entities.push(r);
        }
    }

    catcher = new RectangleEntity(0, 550, 150, 25);
    catcher.color = "gold";
    catcher.sign = 1;

    engine.entities.push(catcher);

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
    isMouseDown = true;

}

function mymouseup(e) {
    isMouseDown= false;
    var r = new CircleEntity(475,400,10,BodyDynamic);
    r.color = "yellow";
    r.velocity.y = -offset /5;
    r.onhit = function (me,peer) {
        if (peer == catcher) {
            engine.entities = engine.entities.filter(function(e){
                return e !=me;
            });
            score++;
        }
    }

    offset = 0;
    engine.entities.push(r);
}

function repaint() {
    // 背景クリア
    ctx.fillStyle = "#006600";
    ctx.fillRect(0,0,500,600);

    // ボール　壁の描画
    for(var i=0;i<engine.entities.length;i++){
        var e = engine.entities[i];
        ctx.fillStyle = e.color;
        switch (e.share) {
            case ShapeCircle:
                
                break;
            case ShapeRectangle:
                break;

            case ShapeLine:
                break;
        }
    }


}

