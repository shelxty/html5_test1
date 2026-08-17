let canvas = document.getElementsById("canvas"); 

let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

context.fillRect(0, 0, window_width:100, window_height:100); // this creates a black rectangle w/ width of 100 and height of 100 at the top left corner of the canvas