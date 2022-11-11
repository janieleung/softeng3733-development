
// not using now..
export class Cell {
    /**
     * Constructor of a cell
     * @param {int} r - row
     * @param {int} c - col
     * @param {String} type - if the cell is empty/wall/door/key 
     */
    constructor(r, c, type, color) {
        this.row = r
        this.column = c
        this.type = type
        this.color = color
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
        this.numRow = numRow
        this.numCol = numCol
        this.ninjase = ninjase
        this.wall = wall
        this.door = door
        this.key = key

        // this is where you would create the nr x nc Cell objects that you need.
        // OPTION 1: Create what looks like a 2D array this.cells[R][C]
        this.cells = []
        for (let r = 0; r < numRow; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < numCol; c++) {
                this.cells[r][c] = new Cell(r, c, "empty", null)
            }
        }

        // set ninjase cell
        this.cells[ninjase.row][ninjase.column].type = "ninjase"

        // set wall cells
        for (let w of this.wall) {
            this.cells[w.row][w.column].type = "wall"
        }
        
        // set door
        for (let d of this.door) {
            this.cells[d.row][d.column].type = "door"
            this.cells[d.row][d.column].color = d.color
        }
        
        // set key
        for (let k of this.key) {
            this.cells[k.row][k.column].type = "key"
            this.cells[k.row][k.column].color = k.color
        }
    }
}

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
}
