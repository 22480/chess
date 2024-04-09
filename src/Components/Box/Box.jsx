import React, { createContext, useContext } from "react"
import "./Box.css"

export default function Box(props) {
    const { event } = props
    const publish = e => {
        event.current.handleClick(e)
    }

    const box = []
    Array.from({ length: 9 }).map((_, indexR) => {
        const rowBox = []
        Array.from({ length: 8 }).map((_, indexL) => {
            const left = indexL * 80
            const top = indexR * 80
            rowBox.push(<div onClick={publish} className="box-list" key={`${indexR}-${indexL}`} style={{ left: `${left - 40}px`, top: `${top - 40}px` }}></div>)
        })
        box.push(
            <div className="box-row" key={indexR}>
                {rowBox}
            </div>
        )
    })

    return <div className="box">{box}</div>
}
