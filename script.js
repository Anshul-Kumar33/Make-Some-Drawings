const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing  = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    clearCanvas();
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
    clearCanvas();
})



const textContainers = document.querySelectorAll(".word");

const defaultScale = 1;
const maxScale = 2;
const neighborScale = 1.5;

textContainers.forEach((textContainer) => {
    const spans = textContainer.querySelectorAll("span");

    textContainer.addEventListener("mousemove", (e) => {
        const target = e.target.closest("span");
        if (!target) return;

        const index = Array.from(spans).indexOf(target);

        spans.forEach((span, i) => {
            let scale = defaultScale;

            if (i === index) {
                scale = maxScale;
            } else if (i === index - 1 || i === index + 1) {
                scale = neighborScale;
            }

            span.style.transform = `scaleY(${scale})`;
        });
    });

    textContainer.addEventListener("mouseleave", () => {
        spans.forEach((span) => {
            span.style.transform = `scaleY(${defaultScale})`;
        });
    });
});
