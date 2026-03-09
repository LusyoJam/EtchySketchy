const buttonContainer = document.querySelector('#buttonDiv');
const container = document.querySelector(".container");
const clear = document.querySelector("#clear");
const start = document.querySelector('#start');
const rainbow = document.querySelector('#rainbow');
const boxes = [];
let isEmpty = false;
let rainbowMode = false;



buttonContainer.addEventListener('click', (e)=> {

    switch(e.target.id){

        case 'start':
            let num = prompt("Type a number from 1 to 100:");
            if (boxes.length > 1) {
                clearCanvas();
            }
            createGrid(num);
            boxes.forEach((b) => container.append(b));
            break;

        case 'clear':
            if (isEmpty) {
                clearCanvas();
            }
            boxes.forEach(b => {
                b.style.backgroundColor = 'white';
                b.dataset.darkCount = '1';
                b.style.filter = `brightness(${1})`;
            });
            isEmpty = true;
            break;

        case 'rainbow':
            if (rainbowMode){
                rainbowMode = false;
                rainbow.style.backgroundColor = "rgb(69, 220, 215)"
            } else {
                rainbowMode = true;
                rainbow.style.backgroundColor = "rgb(207, 69, 220)"
            }
            break;

        default:
            console.log("Invalid");
    }
});


function createGrid(num) {
    const containerSize = container.clientHeight;

    num = Number(num);
    if (isNaN(num) || (num < 1 || num > 100) || num % 1 !== 0) {
        alert('Please input a valid number from 1 to 100.');
        return;
    }

    container.innerHTML = ''; 

    const totalBoxes = num**2;
    const boxSize = containerSize / num;
    const borderSize = (boxSize * 0.000001) / 4;


    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.style.cssText = `
        box-sizing: border-box;
        height: ${boxSize}px;
        width: ${boxSize}px;
        border: ${borderSize}px solid hsl(0, 0.90%, 56.90%);
        background-color: white; `;
        box.dataset.darkCount = "1";
        boxes.push(box);
    }

}

function clearCanvas(){
    boxes.splice(0, boxes.length);
    container.replaceChildren();
}
function darken(box){
    let darkValue = +box.dataset.darkCount;

    if (darkValue >= 0.1) {
        darkValue -= 0.1;
        box.style.filter = `brightness(${darkValue})`;
    }

    box.dataset.darkCount = `${darkValue}`;
}

function randomColor(){
    const colors = [
        "#FF0000", // Red
        "#FF7F00", // Orange
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#0000FF", // Blue
        "#4B0082", // Indigo
        "#8B00FF"  // Violet
    ];
    const colorIndex = Math.floor(Math.random() * colors.length);

    return colors[colorIndex];
}


container.addEventListener('mouseover', (e) =>{
    if (isEmpty) isEmpty = false;

    if (e.target.style.backgroundColor === "white"){

    e.target.style.backgroundColor = rainbowMode ? randomColor() : 'yellow';
    } else {
        darken(e.target);
    }
})
