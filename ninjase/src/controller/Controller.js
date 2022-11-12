export function selectMove(model, direction) {
    // check if it is movable in that direction

    // if movable, change selected to that cell

    model.puzzle.moveSelected(direction)
    return model.copy();
}