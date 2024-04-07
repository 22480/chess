import React from "react"
import "./ChessBoard.css"

export default function ChessBoard() {
    const chessboard = () => {
        const board = []
        for (let row = 0; row < 9; row++) {
            const rowDivs = []
            for (let col = 0; col < 8; col++) {
                if (row === 4) continue
                const left = col* 80
                const top = row *80
                rowDivs.push(<div className="board-list" key={`${row}-${col}`} style={{ left: `${left}px`, top: `${top}px` }} ></div>)
            }
            board.push(
                <div className="board-row" key={row}>
                    {rowDivs}
                </div>
            )
        }
        return board
    }
    return <div className="board">{chessboard()}</div>
}
