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
    setCanvasBackground; 
});

toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false), saveState());

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

const drawRect = (e) => {};
const drawTriangle = (e) => {};
const drawSquare = (e) => {};
const drawHexagon = (e) => {};
const drawPentagon = (e) => {};
const drawLine = (e) => {};
const drawArrow = (e) => {}; 
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
        (selectedTool === "pencil" && selectedTool === "brush") || selectedTool === "eraser")
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
canvas.addEventListener("mouseup", () => (isDrawing = false), saveState()); 
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

redoButtonButton.addEventListener("click", () => { 
    if(historyStep < historyStep.length - 1){
        historyStep++;
        const img
    }
});


// console.log(canvas);
