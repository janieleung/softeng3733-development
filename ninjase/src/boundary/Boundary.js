import ninja_path from './ninja-se.png'
import { availableMoves } from '../model/Model.js';
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

export function showAvailable(puzzle, moves, ctx){
    // goes through the list of moves
    for(let move of moves){
        let cell = puzzle.cells[move.row][move.column]  // get cell
        let sq = computeSquare(cell)    // compute square
        // ctx.fillRect(sq.x, sq.y, sq.size, sq.size)  // draw
        
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = `rgb(176, 212, 171)`
        ctx.rect(sq.x, sq.y, sq.size, sq.size)
        ctx.stroke()
    }
}

export function showSelected(puzzle, ctx){
    let selectedCell = puzzle.selected;
    console.log("selected cell = ", selectedCell)
    let sq = computeSquare(selectedCell)
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = 'red'
    ctx.rect(sq.x, sq.y, sq.size, sq.size)
    ctx.stroke()
    ctx.lineWidth = 1
}

/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    console.log("redrawing canvas....")
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

            if(type === 'empty'){
                ctx.beginPath()
                ctx.strokeStyle = 'blue'
                ctx.rect(sq.x, sq.y, sq.size, sq.size)
                ctx.stroke()
            }
            else if(type === 'wall'){
                ctx.beginPath()
                ctx.strokeStyle = 'blue'
                ctx.fillStyle = 'black'
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
                ctx.stroke()
                // ctx.fillStyle = 'black';
                // ctx.rect(sq.x, sq.y, sq.size, sq.size)
            }
            else if(type === 'ninjase'){
                const ninjaImg = new Image()
                ninjaImg.src = ninja_path
                ctx.drawImage(ninjaImg, sq.x, sq.y, sq.size, sq.size)
            }
            else if(type === 'key'){
                //var color = parsecell.color
                ctx.beginPath()
                ctx.strokeStyle = 'blue'
                ctx.rect(sq.x, sq.y, sq.size, sq.size)
                ctx.fillStyle = cell.color
                ctx.fillRect(sq.x + 30, sq.y + 30, sq.size - 60, sq.size - 60)
                ctx.stroke()
            }
            else if(type === 'door'){
                ctx.beginPath()
                ctx.strokeStyle = 'blue'
                ctx.fillStyle = 'black'
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
                ctx.fillStyle = cell.color
                ctx.fillRect(sq.x + 10, sq.y + 10, sq.size - 20, sq.size - 20)
                ctx.fillStyle = 'white'
                ctx.fillRect(sq.x + 30, sq.y + 30, sq.size - 60, sq.size - 60)
                ctx.stroke()
            }
        }
    }
    
    let moves = model.puzzle.availableMoves();
    //console.log(moves)

    showAvailable(model.puzzle, moves, ctx);
    showSelected(model.puzzle, ctx);
    
    // // goes through the list of moves
    // for(let move of moves){
    //     let cell = model.puzzle.cells[move.row][move.column]  // get cell
    //     let sq = computeSquare(cell)    // compute square
    //     // ctx.fillRect(sq.x, sq.y, sq.size, sq.size)  // draw
        
    //     ctx.beginPath()
    //     ctx.lineWidth = 5
    //     ctx.strokeStyle = `rgb(176, 212, 171)`
    //     ctx.rect(sq.x, sq.y, sq.size, sq.size)
    //     ctx.stroke()
    // }
}