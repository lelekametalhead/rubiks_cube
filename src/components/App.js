import React from 'react'
import {connect} from 'react-redux'
import Canvas from "./Canvas/Canvas";
// import Errors from "./Errors/Errors";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = ({})

const App$ = (props) => {

  const width = 600
  const height = 600
  // let pointer = new Point2D(0, 0);

  function draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.height = height;
    ctx.canvas.width  = width;

    ctx.fillStyle = "#fdfdfd";
    ctx.fillRect(0, 0, width, height);

  }

  const mouseDownHandler = (e) => {

  }

  const mouseUpHandler = () => {

  }


  return (
    <div onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} className="wrapper d-flex jc-center ai-center">
      {/*<Errors/>*/}
      <Canvas draw={draw} width={width} height={height}/>
    </div>
  )
}

const App = connect(mapStateToProps, mapDispatchToProps)(App$)

export default App
