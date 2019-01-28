const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight-4;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let wave = [];
let frames;

function replace(handlerX, handlerY, centerX, centerY) {
    let distX, distY;
    distX = centerX + (centerX - handlerX);
    if (handlerY < centerY) {
        distY = centerY + (centerY - handlerY);
    } else {
        distY = centerY - (handlerY - centerY);
    }
    return [distX, distY];
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randomNumber(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

function init() {
    frames = 0;
    let ileWaveow = 3;
    let odleglosc = canvasWidth / ileWaveow;
    for (let i = 0; i < ileWaveow; i++) {
        wave.push(new Wave((odleglosc * i / 2) + 100, randomNumber(1, 1)));
        // pierwszy argument obiektu moze byc (canvasHeight - 100)
        wave[i].initWave();
    }
}

function animation() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i of wave) {
        i.drawPath();
        i.updatePath();
    }
    frames += 0.05;
}

//-------------------------------------------------------------
//głowny program
init();
setInterval(animation, 1000 / 60);
animation();