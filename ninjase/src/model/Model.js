
// not using now..
export class Cell {
    /**
     * Constructor of a cell
     * @param {int} r - row
     * @param {int} c - col
     * @param {String} type - if the cell is empty/wall/door/key 
     * @param {String} color - if the cell is a door/key what is the color
     */
    constructor(r, c, type, color) {
        this.row = r
        this.column = c
        this.type = type
        this.color = color
    }
    // used for solving
    copy() {
        let c = new Cell(this.row, this.column, this.type, this.color);
        return c;
    }
}

export class Puzzle {
    /**
     * 
     * @param {int} numRow - number of row 
     * @param {int} numCol - number of column
     * @param {Coordinate} ninjase - Coordinate of ninjase
     * @param {wall[]} wall - information of wall 
     * @param {door[]} door - information of door
     * @param {key[]} key - information of key
     */
    constructor(numRow, numCol, ninjase, wall, door, key) {
        this.numRow = numRow;
        this.numCol = numCol;
        this.ninjase = ninjase;
        this.wall = wall;
        this.door = door;
        this.key = key;
        this.keyHolding = "none";
        this.selected = null;

        // this is where you would create the nr x nc Cell objects that you need.
        // OPTION 1: Create what looks like a 2D array this.cells[R][C]
        this.cells = []
        for (let r = 0; r < numRow; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < numCol; c++) {
                this.cells[r][c] = new Cell(r, c, "empty", null);
            }
        }

        // set ninjase cell
        this.cells[this.ninjase.row][this.ninjase.column].type = "ninjase";
        // set selectedCell
        this.selected = this.cells[this.ninjase.row][this.ninjase.column];

        // set wall cells
        for (let w of this.wall) {
            this.cells[w.row][w.column].type = "wall";
        }
        
        // set door
        for (let d of this.door) {
            this.cells[d.row][d.column].type = "door";
            this.cells[d.row][d.column].color = d.color;
        }
        
        // set key
        for (let k of this.key) {
            this.cells[k.row][k.column].type = "key";
            this.cells[k.row][k.column].color = k.color;
        }
    }

    select(piece) {
        this.selected = piece;
    }
    
    isSelected(piece) {
        return piece === this.selected;
    }

    availableMoves(){
        let moves = [];
        // ninjase coordinate is the current position
        // there are five possible moves: up/down/left/right/none
        let row = this.ninjase.row;
        let col = this.ninjase.column;

        // up one
        if(this.available(row-1,col)){
            moves.push({"row": row -1, "column": col, "direction":"up"});
        }
        // down one
        if(this.available(row+1,col)){
            moves.push({"row": row +1, "column": col, "direction":"down"});
        }
        // left one
        if(this.available(row,col-1)){
            moves.push({"row": row, "column": col -1, "direction":"left"});
        }
        // right one
        if(this.available(row,col+1)){
            moves.push({"row": row, "column": col + 1, "direction":"right"});
        }
        // no move
        moves.push({"row": row, "column": col, "direction": "none"});
        return moves;
    }
    
    // exclude doors, walls, or border
    available(row, col){
        let c = this.cells[row][col];
        // unavailable if cell is out-of-bound
        if(row < 0 || row > this.numRow || col < 0 || col > this.numCol || c.type === "wall"){
            return false;
        }
        // unavailable if cell is a wall or a door
        if(c.type === "door" && this.keyHolding === "none"){
            return false;
        }
        return true;
    }

    /**
     * Check if ninjase has right key for the door
     * @param {int} row - door row coordinate
     * @param {int} col - door column coordinate
     * @returns 
     */
    hasKeyFor(row, col){
        let c = this.cells[row][col];
        if(c.type === 'door' && c.color === this.keyHolding){
            console.log("currently holding correct key! ", this.keyHolding)
            return true;
        }
        console.log("currently holding incorrect key: ", this.keyHolding)
        return false;
    }
    
    /**
     * Pick up a key and set the current key holding to the given color
     * @param {*} color - color of the holding key
     */
    pickUpKey(color){
        this.keyHolding = color;
        console.log("picked up key: ", color)
    }

    moveSelected(direction){
        // check if direction is available 
        let moveList = this.availableMoves();
        console.log("move list = ", moveList)
        for(let move of moveList){
            if(move.direction === direction){
                this.selected = this.cells[move.row][move.column]; // update selected
                break;
            }
        }
    }
    copy() {
        // creating new object for cloning
        let puzzleCopy = new Puzzle(this.numRow, this.numCol, this.ninjase, this.wall, this.door, this.key);   
        puzzleCopy.keyHolding = this.keyHolding;    // set keyHolding field
        
        puzzleCopy.cells = [];      // set cells field by cloning each cell

        for (let r = 0; r < puzzleCopy.numRow; r++) { 
            puzzleCopy.cells[r] = []; 
            for (let c = 0; c < puzzleCopy.numCol; c++) {
                puzzleCopy.cells[r][c] = this.cells[r][c].copy();
            }
        }

        let selectedCopy = this.selected.copy(); // set selected field by cloning selected cell
        puzzleCopy.selected = selectedCopy;
        return puzzleCopy;
    }
}

export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }
    
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(level) {
        this.level = level
        
        let numRow = level.rows
        let numCol = level.columns
        let ninjase = level.ninjase
        let wall = level.walls
        let door = level.doors
        let key = level.keys
        this.puzzle = new Puzzle(numRow, numCol, ninjase, wall, door, key)
    }
    /**
     * Copy a model with the given information
     * @returns {Model} - a new Model with the given information
     */
     copy() {
        let modelCopy = new Model(this.level);                 
        modelCopy.numRow = this.rows
        modelCopy.numCol = this.columns
        modelCopy.ninjase = this.ninjase
        modelCopy.wall = this.walls
        modelCopy.door = this.doors
        modelCopy.key = this.keys
        modelCopy.puzzle = this.puzzle.copy();
        return modelCopy;
    }
}
