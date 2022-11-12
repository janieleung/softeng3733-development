export function selectMove(model, direction) {
    // check if it is movable in that direction

    // if movable, change selected to that cell

    model.puzzle.moveSelected(direction)
    return model.copy();
}

// Use Case 2: Move NinjaSe
export function moveHere(model){
    model.puzzle.moveNinjase()
    return model.copy();
}

// Use Case 3: Pick Up Key
export function pickUpKey(model){
    model.puzzle.pickUpKey();
    return model.copy();
}

// Use Case 5:: Reset Level
export function resetLevel(model){
    return model.reset(model.level);
}