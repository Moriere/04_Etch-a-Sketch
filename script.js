// CANVAS

const canvasContainer = document.getElementById('canvasContainer');
let canvasSize = 3;
let brushColor = "black";

for (let i = 0; i < canvasSize ** 2; i++) {
    const canvasPixel = document.createElement('div');
    canvasContainer.appendChild(canvasPixel);
    canvasPixel.classList.add('grid');
    canvasPixel.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: rgb(255, 255, 255);`;
}

// EVENT LISTENERS

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', clickedButton));
const slider = document.getElementById('slider');
slider.addEventListener('input', redrawCanvas);
const rangeNumber = document.getElementById('rangeNumber');
rangeNumber.textContent = `${slider.valueAsNumber} x ${slider.valueAsNumber}`;
let canvasPixels = document.querySelectorAll('#canvasContainer div');
canvasPixels.forEach(pixel => pixel.addEventListener('mouseover', colorPixel));

function redrawCanvas() {
    this.addEventListener('mouseup', (slider) => {
        canvasSize = slider.target.valueAsNumber;
        rangeNumber.textContent = `${slider.target.valueAsNumber} x ${slider.target.valueAsNumber}`;
        resetCanvas();

        if (canvasPixels.length < canvasSize ** 2) {
            for (let i = canvasPixels.length; i < canvasSize ** 2; i++) {
                const canvasPixel = document.createElement('div');
                canvasContainer.appendChild(canvasPixel);
                canvasPixels = document.querySelectorAll('#canvasContainer div');
            }
            canvasPixels.forEach(pixel => pixel.addEventListener('mouseover', colorPixel));
            canvasPixels.forEach(pixel => pixel.classList.add('grid'));
        }
        if (canvasPixels.length >= canvasSize ** 2) {
            for (let i = canvasPixels.length; i > canvasSize ** 2; i--) {
                canvasContainer.removeChild(canvasContainer.lastElementChild);
                canvasPixels = document.querySelectorAll('#canvasContainer div');
            }
        }
            
        canvasPixels.forEach(pixel => pixel.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: rgb(255, 255, 255);`);
    });
}

function resetCanvas () {
    canvasPixels.forEach(pixel => pixel.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: rgb(255, 255, 255);`);
}

function randomRGB() {
    let r = Math.floor(Math.random()*250)+1;
    let g = Math.floor(Math.random()*250)+1;
    let b = Math.floor(Math.random()*250)+1;

    return `rgb(${r}, ${g}, ${b})`;
}

function darken(pixel) {
    let currentColor = pixel.target.style.backgroundColor.slice(4, -1).split(", ");
    
    if (currentColor[0] === '250' && currentColor[1] === '250' && currentColor[2] === '250') {
        for (let i = 0; i < 3; i++) currentColor[i] = +currentColor[i];
    }
    for (let i = 0; i < 3; i++) currentColor[i] = currentColor[i]-25;
    return `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
}

function colorPixel(pixel) {
    if (brushColor === "black") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: rgb(0, 0, 0);`;
    if (brushColor === "random") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: ${randomRGB()};`;
    if (brushColor === "shader") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: ${darken(pixel)};`;
    if (brushColor === "erase") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background-color: rgb(255, 255, 255);`;
}

function toggleGrid() {
    canvasPixels.forEach(pixel => pixel.classList.toggle('grid'));
}

function clickedButton(clickedBtn) {
    switch (clickedBtn.target.id) {
        case ("setBlack"):
            brushColor = "black";
            break;
        case ("setRGB"):
            brushColor = "random"
            break;
        case ("setShader"):
            brushColor = "shader";
            break;
        case ("eraser"):
            brushColor = "erase";
            break;
        case ("resetBTN"):
            resetCanvas();
            break;
        case ("toggleGrid"):
            toggleGrid();
            break;
    }
}