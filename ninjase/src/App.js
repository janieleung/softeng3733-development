import React from 'react';
import { level1, level2, level3 } from './model/Levels.js'
import { redrawCanvas} from './boundary/Boundary.js' ;
import { layout } from './Layout.js';
import { selectMove, moveHere, pickUpKey} from './controller/Controller.js';
import { Model } from './model/Model.js';

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  const selectMoveHandler = (direction) => {
    // console.log("SelectMoveHandler: selected ", direction)
    let newModel = selectMove(model, direction);
    setModel(newModel);   // react to changes, if model has changed.
  }

  const moveHereHandler = (e) => {
    console.log("MoveHere clicked")
    let newModel = moveHere(model);
    setModel(newModel);
  }

  const pickUpKeyHandler = (e) => {
    console.log("Pick Up Key clicked")
    let newModel = pickUpKey(model);
    setModel(newModel);
  }

  return (
    <main>
      <canvas style={layout.canvasPos} 
        tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800"
        height = "800" />
      
      <button style={layout.upbutton}     onClick={(e) => selectMoveHandler("up")}>^</button>
      <button style={layout.leftbutton}   onClick={(e) => selectMoveHandler("left")}>&lt;</button>
      <button style={layout.downbutton}   onClick={(e) => selectMoveHandler("down")}>v</button>
      <button style={layout.rightbutton}  onClick={(e) => selectMoveHandler("right")}>&gt;</button>

      <button style={layout.chooseLevelButton}>Choose Level</button>
      <button style={layout.resetLevelButton}>Reset Level</button>
      <button style={layout.moveButton} onClick={(e) => moveHereHandler()}>Move Here</button>
      <button style={layout.pickKeyButton} onClick={(e) => pickUpKeyHandler()}>Pick Up Key</button>
      <label style={layout.moveCounter}>Move Counter: Display</label>
      <label style={layout.levelDisplay}>Level: Display</label>
    </main>
  );
}

export default App;
