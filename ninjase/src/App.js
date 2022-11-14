import React from 'react';
import { level1, level2, level3 } from './model/Levels.js'
import { redrawCanvas} from './boundary/Boundary.js' ;
import { layout } from './Layout.js';
import { selectMove, moveHere, pickUpKey} from './controller/Controller.js';
import { Model } from './model/Model.js';

var actualLevel1 = JSON.parse(JSON.stringify(level1));   // parses string into JSON object, used below.
var actualLevel2 = JSON.parse(JSON.stringify(level2));   // parses string into JSON object, used below.
var actualLevel3 = JSON.parse(JSON.stringify(level3));   // parses string into JSON object, used below.

function App() {
  const [model, setModel] = React.useState(new Model(actualLevel1));
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  const options = [
    {value: 'level1', text: 'Level 1'},
    {value: 'level2', text: 'Level 2'},
    {value: 'level3', text: 'Level 3'},
  ];

  const [selected, setSelected] = React.useState(options[0].value);


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

  const changeLevelHandler = (e) => {
    console.log("Change Level clicked")
    let newModel = null;
    if(e.target.value === 'level1'){
      var actualLevel1 = JSON.parse(JSON.stringify(level1));
      newModel = new Model(actualLevel1)}
    else if(e.target.value === 'level2'){
      var actualLevel2 = JSON.parse(JSON.stringify(level2));
      newModel = new Model(actualLevel2)}
    else if(e.target.value === 'level3'){
      var actualLevel3 = JSON.parse(JSON.stringify(level3));
      newModel = new Model(actualLevel3)}

    setModel(newModel);
    setSelected(e.target.value);
  };

  const resetLevelHandler = (e) => {
    console.log("ResetLevel clicked")
    let newModel = null;
    if(selected=== 'level1'){
      var actualLevel1 = JSON.parse(JSON.stringify(level1));
      newModel = new Model(actualLevel1)}
    else if(selected === 'level2'){
      var actualLevel2 = JSON.parse(JSON.stringify(level2));
      newModel = new Model(actualLevel2)}
    else if(selected === 'level3'){
      var actualLevel3 = JSON.parse(JSON.stringify(level3));
      newModel = new Model(actualLevel3)}
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

      { model.ninjaseHasEscaped() ? (<label style={layout.victory}>Ninja-Se has escaped!</label>) : (<label style={layout.stuck}>Ninja-Se is still stuck... :-&lt;</label>) }
      

      <button style={layout.upbutton}     onClick={(e) => selectMoveHandler("up")}>^</button>
      <button style={layout.leftbutton}   onClick={(e) => selectMoveHandler("left")}>&lt;</button>
      <button style={layout.downbutton}   onClick={(e) => selectMoveHandler("down")}>v</button>
      <button style={layout.rightbutton}  onClick={(e) => selectMoveHandler("right")}>&gt;</button>

      <select style={layout.levelDisplay} value={selected} onChange={changeLevelHandler}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      <button style={layout.resetLevelButton} onClick={(e) => resetLevelHandler()}>Reset Level</button>
      <button style={layout.moveButton} onClick={(e) => moveHereHandler()}>Move Here</button>
      <button style={layout.pickKeyButton} onClick={(e) => pickUpKeyHandler()}>Pick Up Key</button>
      <label style={layout.moveCounter}>{"Move Counter: " + model.puzzle.moveCounter}</label>
      <label style={layout.keyDisplay}>{"Holding key: " + model.puzzle.keyHolding}</label>
      
    </main>
  );
}

export default App;
