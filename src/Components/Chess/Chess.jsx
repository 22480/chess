import React from 'react'
import './Chess.css'

export default function Chess(props) {
    
  return (
    <div className="chess" style={{ left: `${80*props.x-32}px`, top: `${80*props.y-32}px`,borderColor:`${props.player}` }}>{props.type}</div>
  )
}
