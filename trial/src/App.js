import { layout } from './Layout.js';
import React from 'react';
import Model from './model/Model.js';
import {redrawCanvas} from "./boundary/Boundary.js"
import {adjust} from "./controller/Controller.js"

function App() {

  // new constant: model, new method: setModel
  // useState: returns a stateful value, and a function to update it
  const [model, setModel] = React.useState(new Model(5,10,15)); // declare once

  const appRef = React.useRef(null);    //Later need to be able to refer to App
  const canvasRef = React.useRef(null); //Later need to be able to refer to App

  // Whenever Model changes, the canvas needs to be redrawn
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model])


  const adjustController = (direction) => {
    let newModel = adjust(model, direction);
    setModel(newModel);
  }

  return (
    <main style = {layout.Appmain} ref={appRef}>
      <canvas className="{layout.canvas}"
      width = {layout.canvas.width}
      height = {layout.canvas.height}
      ref = {canvasRef}>

      </canvas>
      <label style = {layout.text}>{"Width : " + model.value}</label>
      <div style = {layout.buttons}>
        <button style = {layout.upbutton} onClick={(e) => adjustController(+1)}>^</button>
        <button style = {layout.downbutton} onClick={(e) => adjustController(-1)}>v</button>
      </div>
    </main>
  );
}

export default App;
