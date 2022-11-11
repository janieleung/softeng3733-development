// redraw the Puzzle so I can see it

// Scaling Constants for Canvas
var BOXSIZE = 100;
const OFFSET = 8;

/** Represents a rectangle. */
export class Square {
    constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE*cell.column + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET, BOXSIZE-2*OFFSET)
}


/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  
   
    // showing the outermost information
    let nr = model.puzzle.numRow 
    let nc = model.puzzle.numCol

    ctx.fillStyle = 'black'

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)
            let type = cell.type
            // HERE is where you draw everything about this cell that you know about...
            console.log(cell)
            if(type === 'empty'){
                ctx.beginPath()
                ctx.strokeStyle = 'blue'
                ctx.rect(sq.x, sq.y, sq.size, sq.size)
                ctx.stroke()
            }
        }
    }
}