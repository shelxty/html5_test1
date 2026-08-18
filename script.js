const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fillColor"),
    sizeSlider = document.querySelector("#sizeSlider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#colorPicker"),
    cleatCanvas = document.querySelector(".clearCanvas"),
    saveImage = document.querySelector(".saveImg"),
    ctx = canvas.getContext("2d");

const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");

let prevMouseX, 
    prevMouseY, 
    snapshot, 
    isDrawing = false, 
    selectedTool = "pencil",
    brushWidth = 5, 
    selectedColor = "#000000";

let history = []; 
let historyStep = -1; 

const setCanvasBackground = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; 
}

window.addEventListener("load", ()=>{
    canvas.width = canvas.offsetWidth; 
    canvas.height = canvas.offsetHeight;
    setCanvasBackground(); 
});

toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});


const startDraw = (e) => {
    isDrawing = true; 
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;

    ctx.beginPath();
    
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor; 
    ctx.fillStyle = selectedColor; 
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawPencil = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.shadowBlur = 0; 
    ctx.stroke();
};

// btw to make an empty const, "const drawTriangle = (e) => {};""
const drawRect = (e) => {
    const width = prevMouseX - e.offsetX;
    const height = prevMouseY - e.offsetY;
    if(!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, width, height);
    }
    // const width = prevMouseX - e.offsetX; 
    // const height = prevMouseY - e.offsetY; 
    ctx.fillRect(e.offsetX, e.offsetY, width, height);
};

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(
        Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
    );
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke(); // the quintessential line that actually draws stuff
};

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath(); 
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawSquare = (e) => {
    const sideLength = Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath(); 
    ctx.rect(e.offsetX, e.offsetY, sideLength, sideLength);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawHexagon = (e) => {
    const sideLength = Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath();
    for (let i = 0; i < 6; i++){
        const angle = ((2 * Math.PI) / 6) * i;
        const x = e.offsetX + sideLength * Math.cos(angle);
        const y = e.offsetY + sideLength * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawPentagon = (e) => {
    const sideLength = Math.abs(prevMouseX - e.offsetX);
    ctx.beginPath();
    for (let i = 0; i < 5; i++){
        const angle = ((2 * Math.PI) / 5) * i - Math.PI / 2;
        const x = e.offsetX + sideLength * Math.cos(angle);
        const y = e.offsetY + sideLength * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawLine = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};
const drawArrow = (e) => {
    const headLength = 15;
    const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
        e.offsetX - headLength * Math.cos(angle - Math.PI / 6), 
        e.offsetY - headLength * Math.sin(angle - Math.PI / 6)
    );
    
    ctx.lineTo(e.offsetX, e.offsetY);
    
    ctx.lineTo(
        e.offsetX - headLength * Math.cos(angle + Math.PI / 6), 
        e.offsetY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
}; 

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));

const drawCurve = (e) => {};

const drawBrush = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.shadowColor = selectedColor; 
    ctx.shadowBlur = 15; 
    ctx.stroke();
}

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if(
        (selectedTool === "pencil" || selectedTool === "brush") || selectedTool === "eraser")
    {
        ctx.strokeStyle = selectedTool === "eraser" ?"#ffffff":selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else if (selectedTool == "rectangle"){
        drawRect(e); /* self-explanatory el uh may oh */
    }
    else if (selectedTool == "circle"){
        drawCircle(e); /* functions yay */
    }
    else if (selectedTool == "triangle"){
        drawTriangle(e);
    }
    else if (selectedTool == "square"){
        drawSquare(e);
    }
    else if (selectedTool == "hexagon"){
        drawHexagon(e);
    }
    else if (selectedTool == "pentagon"){
        drawPentagon(e);
    }
    else if (selectedTool == "line"){
        drawLine(e);
    }
    else if (selectedTool == "arrow"){
        drawArrow(e);
    }
    else if (selectedTool == "curve"){
        drawCurve(e);
    }
    else if (selectedTool == "brush"){
        drawBrush(e);
    }
    else {
        drawPencil(e);
    }
};

function saveState() {
    history = history.slice(0, historyStep + 1); // remove state if undo 
    history.push(canvas.toDataURL());
    historyStep++;

    console.log(history); // check what to store in save state 

}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    saveState(); 
});
// store history whenever savestate

undoButton.addEventListener("click", () => {
    if(historyStep >= 0){
        historyStep--; /* get the previous state */
        const img = new Image(); 
        img.src = history[historyStep]; /* load the previous image from the last save */
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        }
    }
    if(historyStep == -1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); /* allows history of first step to be cleared w/ help of clearRect */
    }
});

redoButton.addEventListener("click", () => { 
    if (historyStep < history.length - 1){
        historyStep++;
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
});


// console.log(canvas);
