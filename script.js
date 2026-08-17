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

let history = [], 
    historyStep = -1; 

const setCanvasBackground = () =>{
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; 
}

window.addEventListener("load", ()=>{
    canvas.width = canvas.offsetWidth; 
    canvas.height = canvas.offsetHeight;
})

toolBtns.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
})

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

const drawPencil = (e) => (
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.shadowBlur = 0; 
    ctx.stroke();
)

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if((selectedTool === "pencil" && selectedTool === "brush")||selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser"?"#ffffff":selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
};

function saveState() {}

// console.log(canvas);
