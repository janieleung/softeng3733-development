import React from 'react';
import { level1 } from './model/Levels.js'
import { redrawCanvas} from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { layout } from './Layout.js';

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {

    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  return (
    <main>
      <canvas style={layout.canvasPos} 
        tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800"
        height = "800" />
      
      <button style={layout.upbutton}>^</button>
      <button style={layout.leftbutton}>&lt;</button>
      <button style={layout.downbutton}>v</button>
      <button style={layout.rightbutton}>&gt;</button>
      <button style={layout.chooseLevelButton}>Choose Level</button>
      <button style={layout.resetLevelButton}>Reset Level</button>
      <button style={layout.moveButton}>Move Here</button>
      <button style={layout.pickKeyButton}>Pick Up Key</button>
      <label style={layout.moveCounter}>Move Counter: Display</label>
      <label style={layout.levelDisplay}>Level: Display</label>
    </main>
  );
}

export default App;
