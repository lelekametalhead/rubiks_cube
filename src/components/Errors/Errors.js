import React from "react"
import {connect} from "react-redux"
import {handleError} from "../../store/actions";
import './Errors.css'

const mapStateToProps = (state) => ({
  errors: state.errors
})

const mapDispatchToProps = ({
  handleError
})

const Errors$ = (props) => {

  const errors = props.errors

  const closeHandler = (index) => {
    return () => props.handleError(index)
  }

  const closeAllHandler = () => {
    props.handleError(null)
  }

  const count = () => {
    let acc = 0
    errors.forEach(item => {
      if (!item.isClosed) acc += 1
    })
    return acc
  }

  return (
    <div className="errorsContainer scrollBar">
      {(count() > 1) &&
      <div onClick={closeAllHandler} className="errorsBlock errorsBlockHide">Скрыть все</div>
      }
      {errors.map((error, index) => {
        if (!error.isClosed) return (
          <div key={error.timestamp} className="errorsBlock">
            <p className="errorsTitle">{error.method} request error {error.status}</p>
            <p className="errorsURL">{error.url}</p>
            <p className="errorsMessage">{error.message}</p>
            <p className="errorsMessage">{error.stack}</p>
            <div onClick={closeHandler(index)} className="errorsCloseButton"/>
          </div>
        )
        return null
      })}
    </div>
  )
}

const Errors = connect(mapStateToProps, mapDispatchToProps)(Errors$)

export default Errors