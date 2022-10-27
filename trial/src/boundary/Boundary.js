/** Refraw entire canvas from model. */
export function redrawCanvas(model, canvasObj, appObj){
    const ctx = canvasObj.getContext('2d'); // Get canvas object

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    // fill in unnecessary areas
    let v = model.value;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(100, 100, 10*v, 10*v);

    // create a maximum area
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(100, 100, 10*model.maxValue, 10*model.maxValue)
    ctx.stroke();
}