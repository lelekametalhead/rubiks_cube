import React from "react"
import './Loader.css'

const Loader = (props) => {

  const style1 = () => props.color ? {borderBottom: `3px solid ${props.color}`} : {}
  const style2 = () => props.color ? {borderRight: `3px solid ${props.color}`} : {}
  const style3 = () => props.color ? {borderTop: `3px solid ${props.color}`} : {}

  return(
    <div className={props.wrapper ? 'loaderWrapper' : ''}>
      <div className="loaderContainer">
        <div className="loaderInner loaderInnerOne" style={style1()} />
        <div className="loaderInner loaderInnerTwo" style={style2()} />
        <div className="loaderInner loaderInnerThree" style={style3()} />
      </div>
      { props.text && <p>{props.text}</p> }
    </div>
  )

}

export default Loader