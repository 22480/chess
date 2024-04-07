import React,{ createContext, useContext } from 'react'
import './Box.css'

export default function Box(props) {
    
    // const {handleClick} = React.useContext(Context)
    const {event} = props
    const publish = (e)=>{
        event.current.handleClick(e)
    }

    const chessbox = () => {
        const box = []
        for (let row = 0; row < 10; row++) {
            const rowBox = []
            for (let col = 0; col < 9; col++) {
                const left = col* 80
                const top = row *80
                rowBox.push(<div onClick={publish} className="box-list" key={`${row}-${col}`} style={{ left: `${left-40}px`, top: `${top-40}px` }} ></div>)
            }
            box.push(
                <div className="box-row" key={row}>
                    {rowBox}
                </div>
            )
        }
        return box
    }
    return <div className="box">{chessbox()}</div>
}
