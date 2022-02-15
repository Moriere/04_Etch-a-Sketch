const body = document.querySelector('body');
const cavnasContainer = document.createElement('div');
cavnasContainer.setAttribute('id', 'canvasContainer');
body.appendChild(cavnasContainer);

let color = "black";

//BUTTON BAR

const buttonBar = document.createElement('div');
buttonBar.setAttribute('id','buttonBar');
body.insertBefore(buttonBar, cavnasContainer);

const colorBtnBlack = document.createElement('button');
colorBtnBlack.setAttribute('id', 'setBlack');
colorBtnBlack.textContent = "Set brush color to Black";
buttonBar.appendChild(colorBtnBlack);

const colorBtnRGB = document.createElement('button');
colorBtnRGB.setAttribute('id', 'setRGB');
colorBtnRGB.textContent = "Set brush color to random";
buttonBar.appendChild(colorBtnRGB);

const resetBtn = document.createElement('button');
resetBtn.setAttribute('id', 'resetBTN');
resetBtn.textContent = "clear screen";
buttonBar.appendChild(resetBtn);

const sliderContainer = document.createElement('div');
sliderContainer.setAttribute('id', 'sliderContainer');
buttonBar.appendChild(sliderContainer);
const slider = document.createElement('input');
slider.setAttribute('type', 'range');
slider.setAttribute('min', '2');
slider.setAttribute('max', '100');
slider.setAttribute('value', '16');
slider.setAttribute('id', 'slider');
sliderContainer.appendChild(slider);

//CANVAS

let canvasSize = 16;

const canvasPixels = [];
for (let i = 0; i < canvasSize ** 2; i++) {
    canvasPixels[i] = document.createElement('div');
    cavnasContainer.appendChild(canvasPixels[i]);
    canvasPixels[i].style.cssText = `flex: 1 1 ${100/canvasSize}%`;
}

// EVENT LISTENERS

//slider.addEventListener()
resetBtn.addEventListener('click', resetCanvas);
colorBtnBlack.addEventListener('click', () => color = "black");
colorBtnRGB.addEventListener('click', () => color = "random");
canvasPixels.map(pixel => pixel.addEventListener('mouseover', colorPixel));

function resetCanvas () {
    canvasPixels.map(pixel => pixel.style.cssText = `flex: 1 1 ${100/canvasSize}%`);
}

function randomRGB() {
    let r = Math.floor(Math.random()*250)+1;
    let g = Math.floor(Math.random()*250)+1;
    let b = Math.floor(Math.random()*250)+1;

    return `rgb(${r}, ${g}, ${b})`;
}

function colorPixel(pixel) {
    if (color === "black") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: rgb(0,0,0);`;
    if (color === "random") pixel.target.style.cssText = `flex: 1 1 ${100/canvasSize}%; background: ${randomRGB()};`;
}

// ------------------------ INITIALIZE BASIC HTML INSTEAD OF DOING EVERYTHING HERE -------------------