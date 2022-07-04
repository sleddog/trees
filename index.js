const canvas = document.getElementById("tree_canvas");
const ctx = canvas.getContext("2d");

canvas.style.height = "100vh";
canvas.style.width = "100vw";

const brownColor = "#43302E";
const greenColor = "#254117";

function draw(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    // const color = randColor();
    ctx.strokeStyle = brownColor;
    ctx.fillStyle = brownColor;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    ctx.shadowBlur = 14;
    ctx.shadowColor = "rgba(0,0,0,0.5)";

    if (len < 15) {
        ctx.restore();

        // draw a "leaf"
        drawLeaf(startX, startY);
        return;
    }

    // now create branches (recursive calls)
    draw(0, -len, len * 0.8, angle - 15, branchWidth * 0.8);
    draw(0, -len, len * 0.8, angle + 15, branchWidth * 0.8);

    ctx.restore();
}

function drawLeaf(x, y) {
    const leafRadiusX = 6;
    const leafRadiusY = 10;
    ctx.beginPath();
    ctx.strokeStyle = greenColor;
    ctx.fillStyle = greenColor;
    ctx.ellipse(x, y - 10, leafRadiusX, leafRadiusY, Math.PI / 4 + 15, 0, 2 * Math.PI);
    ctx.fill();
}

function userClickRedraw() {
    // get form values
    let branchLength = parseInt(document.getElementById('branchLength').value);
    let angle = parseInt(document.getElementById('angle').value);
    let branchWidth = parseInt(document.getElementById('branchWidth').value);

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw
    draw(400, 600, branchLength, angle, branchWidth);
}

// mimic a user click on startup to draw initial tree with default values
userClickRedraw();