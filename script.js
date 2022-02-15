// CANVAS

const canvasContainer = document.getElementById('canvasContainer');
let canvasSize = 3;
let color = "rgb(0, 0, 0)";

for (let i = 0; i < canvasSize ** 2; i++) {
    const canvasPixel = document.createElement('div');
    canvasContainer.appendChild(canvasPixel);
    canvasPixel.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: rgb(250, 250, 250);`;
}

// EVENT LISTENERS

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', clickedButton));
const slider = document.getElementById('slider');
slider.addEventListener('input', redrawCanvas);
let canvasPixels = document.querySelectorAll('#canvasContainer div');
canvasPixels.forEach(pixel => pixel.addEventListener('mouseover', colorPixel));

function redrawCanvas() {
    this.addEventListener('mouseup', (slider) => {
        canvasSize = slider.target.valueAsNumber;
        resetCanvas();

        if (canvasPixels.length < canvasSize ** 2) {
            for (let i = canvasPixels.length; i < canvasSize ** 2; i++) {
                const canvasPixel = document.createElement('div');
                canvasContainer.appendChild(canvasPixel);
                canvasPixels = document.querySelectorAll('#canvasContainer div');
            }
            canvasPixels.forEach(pixel => pixel.addEventListener('mouseover', colorPixel));
        }
        if (canvasPixels.length >= canvasSize ** 2) {
            for (let i = canvasPixels.length; i > canvasSize ** 2; i--) {
                canvasContainer.removeChild(canvasContainer.lastElementChild);
                canvasPixels = document.querySelectorAll('#canvasContainer div');
            }
        }
            
        canvasPixels.forEach(pixel => pixel.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: rgb(250, 250, 250);`);
    });
}

function resetCanvas () {
    canvasPixels.forEach(pixel => pixel.style.cssText = `flex: 1 1 ${100/canvasSize}%`);
}

function randomRGB() {
    let r = Math.floor(Math.random()*250)+1;
    let g = Math.floor(Math.random()*250)+1;
    let b = Math.floor(Math.random()*250)+1;

    return `rgb(${r}, ${g}, ${b})`;
}

function darken(pixel) {
    let currentColor = pixel.target.style.background.slice(4, -1).split(", ");
    
    if (currentColor[0] === '250' && currentColor[1] === '250' && currentColor[2] === '250') {
        for (let i = 0; i < 3; i++) currentColor[i] = +currentColor[i];
    }
    for (let i = 0; i < 3; i++) currentColor[i] = currentColor[i]-25;
    return `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
}

function colorPixel(pixel) {
    if (color === "rgb(0, 0, 0)") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: rgb(0, 0, 0);`;
    if (color === "random") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: ${randomRGB()};`;
    if (color === "shader") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: ${darken(pixel)};`;
}

function clickedButton(clickedBtn) {
    switch (clickedBtn.target.id) {
        case ("setBlack"):
            color = "rgb(0, 0, 0)";
            break;
        case ("setRGB"):
            color = "random"
            break;
        case ("setShader"):
            color = "shader";
            break;
        case ("eraser"):
            break;
        case ("resetBTN"):
            resetCanvas();
            break;
    }
}