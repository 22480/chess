import { useRef, useState } from 'react'
import React from 'react'
import './App.css'
import ChessBoard from "./Components/ChessBoard/ChessBoard"
import ChessDate from "./Components/Chess/ChessDate"
import Box from "./Components/Box/Box"

function App(props) {

    const event = useRef()
  return (
    <>
     {/* <Context.Provider> */}
    <div className="app">
        <ChessBoard />
        <ChessDate event={event}/>
        <Box event={event}/>
    </div>
    {/* </Context.Provider> */}
    </>
  )
}

export default App
