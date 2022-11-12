
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
        this.keyHolding = null;
        this.selected = null;
        this.moveCounter = 0;
        this.escaped = false;

        // this is where you would create the nr x nc Cell objects that you need.
        // this could go into a initialize function
        this.cells = []
        for (let r = 0; r < numRow; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < numCol; c++) {
                this.cells[r][c] = new Cell(r, c, "empty", null);
            }
        }

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

    /**
     * Return a list of available moves
     * @returns an array of available moves consisting {row, column, direction}
     */
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
    
    /**
     * Check if the given cell is available
     * @param {int} row - row coordinate of the cell
     * @param {int} col - col coordinate of the cell
     * @returns Boolean
     */
    available(row, col){

        // unavailable if cell is out-of-bound
        if(row < 0 || row > this.numRow - 1 || col < 0 || col > this.numCol - 1 || this.cells[row][col].type === "wall"){
            //console.log("unavailable")
            return false;
        }
        // If cell is a door
        // - doesn't have key -> false
        // - have key but wrong color -> false
        if(this.cells[row][col].type === "door"){
            // console.log("Cell is a door: Do we have the right key?")
            if(this.keyHolding === null){
                // console.log("We don't have the key :(")
                return false;}
            else if(this.keyHolding!== this.cells[row][col].color){
                // console.log("We have key! but wrong color :(")
                return false;}
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
     * Move selected cell with the given direction
     * @param {String} direction 
     */
    moveSelected(direction){
        let nextSelected = null;
        if(direction === "up"){nextSelected = {"row": this.selected.row - 1, "column": this.selected.column}}
        else if(direction === "down"){nextSelected = {"row": this.selected.row + 1, "column": this.selected.column}}
        else if(direction === "left"){nextSelected = {"row": this.selected.row, "column": this.selected.column - 1}}
        else if(direction === "right"){nextSelected = {"row": this.selected.row, "column": this.selected.column + 1}}
        // check if direction is available 
        let moveList = this.availableMoves();
        console.log("move list = ", moveList)
        for(let move of moveList){
            if(move.row === nextSelected.row && move.column === nextSelected.column){
                this.selected = this.cells[move.row][move.column]; // update selected
                break;
            }
        }
    }

    /**
     * Move ninjase to the selected cell
     */
    moveNinjase(){
        // get selected cell
        let selectedCell = this.selected

        if(this.ninjase.row !== selectedCell.row || this.ninjase.column !== selectedCell.column)
        {
            // update ninjase location to it
            this.ninjase.row = selectedCell.row
            this.ninjase.column = selectedCell.column

            // if new location is an unlocked door
            // clear cell property of door
            if(this.cells[selectedCell.row][selectedCell.column].type === 'door'){
                this.cells[selectedCell.row][selectedCell.column].type = 'empty'
                this.cells[selectedCell.row][selectedCell.column].color = null;
                this.keyHolding = null;
            }
            this.moveCounter++;
            if(this.allDoorUnlocked()){
                console.log("ALL DOOR UNLOCKED!")
                this.escaped = true;
            }
        }


    }

    pickUpKey(){
        console.log("----PICKING UP KEY-----")
        this.moveCounter++;
        // check where is ninjase currently at
        let ninjaseCell = this.cells[this.ninjase.row][this.ninjase.column]
        // console.log("Checking if there is key at ", ninjaseCell)
        // check if there is a key
        let isKey = ninjaseCell.type === "key"
        let previouslyKeyHolding = this.keyHolding
        console.log("is key? ", isKey)
        if(isKey){
            console.log("color is ", ninjaseCell.color)
            this.keyHolding = ninjaseCell.color                              // Set keyHolding to color
            this.cells[ninjaseCell.row][ninjaseCell.column].type = 'empty';   // Remove key type from cell
            this.cells[ninjaseCell.row][ninjaseCell.column].color = null;    // Remove key color from cell
            
            console.log("previousKeyHolding: ", previouslyKeyHolding)
            console.log("Is ninjase holding key?: ", previouslyKeyHolding !== null)
            if(previouslyKeyHolding != null){
                this.dropKey(previouslyKeyHolding);
            }
        }
        console.log("------------------")
    }

    dropKey(color){
        console.log("dropping key: ", color)
        // Update cell type and color to the dropped key
        this.cells[this.ninjase.row][this.ninjase.column].type = 'key'        
        this.cells[this.ninjase.row][this.ninjase.column].color = color;    
    }

    allDoorUnlocked(){
        for (let r = 0; r < this.numRow; r++) {  
            for (let c = 0; c < this.numCol; c++) {
                if(this.cells[r][c].type === 'door'){
                    return false;
                }
            }
        }
        return true;
    }

    copy() {
        // creating new object for cloning
        let puzzleCopy = new Puzzle(this.numRow, this.numCol, this.ninjase, this.wall, this.door, this.key);   
        puzzleCopy.keyHolding = this.keyHolding;    // set keyHolding field
        puzzleCopy.moveCounter = this.moveCounter;
        puzzleCopy.escaped = this.escaped;
        
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

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(levelinfo) {
        this.level = levelinfo
        
        let numRow = this.level.rows
        let numCol = this.level.columns
        let ninjase = this.level.ninjase
        let wall = this.level.walls
        let door = this.level.doors
        let key = this.level.keys
        this.puzzle = new Puzzle(numRow, numCol, ninjase, wall, door, key)
    }

    ninjaseHasEscaped(){
        return this.puzzle.escaped;
    }
    /**
     * Copy a model with the given information
     * @returns {Model} - a new Model with the given information
     */
    copy() {
        let modelCopy = new Model(this.level);                 

        modelCopy.puzzle = this.puzzle.copy();
        return modelCopy;
    }
}
