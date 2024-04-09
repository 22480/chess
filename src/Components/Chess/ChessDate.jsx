import React, { useImperativeHandle } from "react"
import Chess from "./Chess.jsx"
import useChessStore from "../../Store/store.jsx"
import useCurrentPlayerStore from "../../Store/player.jsx"
import "./ChessDate.css"

function getChessInPosition(x, y, chessAll) {
    const foundChess = chessAll.find(chess => chess.props.x === x && chess.props.y === y)
    return foundChess || null
}

function canJumpTo(x, y, currentChess, chessAll) {
    switch (currentChess.props.type) {
        case "車":
            if (x !== currentChess.props.x && y !== currentChess.props.y) return false
            if (x === currentChess.props.x) {
                const start = Math.min(currentChess.props.y, y)
                const end = Math.max(currentChess.props.y, y)
                if (end === start + 1) return true
                for (let i = start + 1; i < end; i++) {
                    const chess = getChessInPosition(x, i, chessAll)
                    if (chess !== null) return false
                }
                return true
            }
            if (y === currentChess.props.y) {
                const start = Math.min(currentChess.props.x, x)
                const end = Math.max(currentChess.props.x, x)
                if (end === start + 1) return true
                for (let i = start + 1; i < end; i++) {
                    const chess = getChessInPosition(i, y, chessAll)
                    if (chess !== null) return false
                }
                return true
            }
        case "馬":
            if (!((Math.abs(x - currentChess.props.x) === 2 && Math.abs(y - currentChess.props.y) === 1) || (Math.abs(x - currentChess.props.x) === 1 && Math.abs(y - currentChess.props.y) === 2))) return false
            let horseLegX
            let horseLegY
            if (Math.abs(x - currentChess.props.x) === 2) {
                horseLegX = (x + currentChess.props.x) / 2
                horseLegY = currentChess.props.y
            } else {
                horseLegX = currentChess.props.x
                horseLegY = (y + currentChess.props.y) / 2
            }
            const horseLegChess = getChessInPosition(horseLegX, horseLegY, chessAll)
            if (horseLegChess !== null) return false
            return true
        case "象":
            if (!(Math.abs(x - currentChess.props.x) === 2 && Math.abs(y - currentChess.props.y) === 2)) return false
            const elephantLegX = (x + currentChess.props.x) / 2
            const elephantLegY = (y + currentChess.props.y) / 2
            const elephantLegChess = getChessInPosition(elephantLegX, elephantLegY, chessAll)
            if (elephantLegChess !== null) return false
            return true
        case "相":
            if (!(Math.abs(x - currentChess.props.x) === 2 && Math.abs(y - currentChess.props.y) === 2)) return false
            const elephantsLegX = (x + currentChess.props.x) / 2
            const elephantsLegY = (y + currentChess.props.y) / 2
            const elephantsLegChess = getChessInPosition(elephantsLegX, elephantsLegY, chessAll)
            if (elephantsLegChess !== null) return false
            return true
        case "士":
            let inShiPositions = false
            for (let i = 0; i < shiPositions[currentChess.props.player].length; i++) {
                const position = shiPositions[currentChess.props.player][i]
                if (position.x === x && position.y === y) {
                    inShiPositions = true
                    break
                }
            }
            if (inShiPositions === false) return false
            if (!(Math.abs(x - currentChess.props.x) === 1 && Math.abs(y - currentChess.props.y) === 1)) return false
            return true
        case "将":
            const jiangRange = jiangPositions[currentChess.props.player]

            if (!(x >= jiangRange.x.start && x <= jiangRange.x.end && y >= jiangRange.y.start && y <= jiangRange.y.end)) return false

            if (!(Math.abs(x - currentChess.props.x) + Math.abs(y - currentChess.props.y) === 1)) return false
            return true
        case "帥":
            const shuaiRange = jiangPositions[currentChess.props.player]

            if (!(x >= shuaiRange.x.start && x <= shuaiRange.x.end && y >= shuaiRange.y.start && y <= shuaiRange.y.end)) return false

            if (!(Math.abs(x - currentChess.props.x) + Math.abs(y - currentChess.props.y) === 1)) return false
            return true
        case "炮":
            if (x !== currentChess.props.x && y !== currentChess.props.y) return false
            if (x === currentChess.props.x) {
                const targetChess = getChessInPosition(x, y, chessAll)
                let middleChessCount = 0
                const start = Math.min(currentChess.props.y, y)
                const end = Math.max(currentChess.props.y, y)
                if (end > start + 1) {
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(x, i, chessAll)
                        if (chess !== null) {
                            middleChessCount = middleChessCount + 1
                        }
                    }
                }

                if (targetChess !== null && middleChessCount === 1) return true
                if (targetChess === null && middleChessCount === 0) return true

                return false
            }
            if (y === currentChess.props.y) {
                const targetChess = getChessInPosition(x, y, chessAll)
                let middleChessCount = 0
                const start = Math.min(currentChess.props.x, x)
                const end = Math.max(currentChess.props.x, x)
                if (end > start + 1) {
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(i, y, chessAll)
                        if (chess !== null) {
                            middleChessCount = middleChessCount + 1
                        }
                    }
                }
                if (targetChess !== null && middleChessCount === 1) return true
                if (targetChess === null && middleChessCount === 0) return true

                return false
            }
        case "砲":
            if (x !== currentChess.props.x && y !== currentChess.props.y) return false
            if (x === currentChess.props.x) {
                const targetChess = getChessInPosition(x, y, chessAll)
                let middleChessCount = 0
                const start = Math.min(currentChess.props.y, y)
                const end = Math.max(currentChess.props.y, y)
                if (end > start + 1) {
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(x, i, chessAll)
                        if (chess !== null) {
                            middleChessCount = middleChessCount + 1
                        }
                    }
                }

                if (targetChess !== null && middleChessCount === 1) return true
                if (targetChess === null && middleChessCount === 0) return true

                return false
            }
            if (y === currentChess.props.y) {
                const targetChess = getChessInPosition(x, y, chessAll)
                let middleChessCount = 0
                const start = Math.min(currentChess.props.x, x)
                const end = Math.max(currentChess.props.x, x)
                if (end > start + 1) {
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(i, y, chessAll)
                        if (chess !== null) {
                            middleChessCount = middleChessCount + 1
                        }
                    }
                }
                if (targetChess !== null && middleChessCount === 1) return true
                if (targetChess === null && middleChessCount === 0) return true

                return false
            }
        case "兵":
            if (!(Math.abs(x - currentChess.props.x) + Math.abs(y - currentChess.props.y) === 1)) return false
            if (currentChess.props.player === "red" && y > currentChess.props.y) {
                return false
            }
            if (currentChess.props.player === "black" && y < currentChess.props.y) {
                return false
            }
            if (currentChess.props.player === "red" && x !== currentChess.props.x && currentChess.props.y < 5) {
                return false
            }
            if (currentChess.props.player === "black" && x !== currentChess.props.x && currentChess.props.y > 4) {
                return false
            }
            return true

        case "卒":
            if (!(Math.abs(x - currentChess.props.x) + Math.abs(y - currentChess.props.y) === 1)) return false
            if (currentChess.props.player === "red" && y > currentChess.props.y) {
                return false
            }
            if (currentChess.props.player === "black" && y < currentChess.props.y) {
                return false
            }
            if (currentChess.props.player === "red" && x !== currentChess.props.x && currentChess.props.y < 5) {
                return false
            }
            if (currentChess.props.player === "black" && x !== currentChess.props.x && currentChess.props.y > 4) {
                return false
            }
            return true
    }
}

export default function ChessDate(props) {
    const [chessPieces, setChessPieces] = useChessStore()
    const [currentPlayer, setCurrentPlayer] = useCurrentPlayerStore()
    const { event } = props

    const chessAll = chessPieces.map(item => <Chess key={`${item.x}-${item.y}`} id={item.id} type={item.type} x={item.x} y={item.y} player={item.player} />)

    const shiPositions = {
        red: [
            {
                x: 3,
                y: 9
            },
            {
                x: 5,
                y: 9
            },
            {
                x: 3,
                y: 7
            },
            {
                x: 5,
                y: 7
            },
            {
                x: 4,
                y: 8
            }
        ],
        black: [
            {
                x: 3,
                y: 0
            },
            {
                x: 3,
                y: 2
            },
            {
                x: 5,
                y: 0
            },
            {
                x: 5,
                y: 2
            },
            {
                x: 4,
                y: 1
            }
        ]
    }

    const jiangPositions = {
        red: {
            x: {
                start: 3,
                end: 5
            },
            y: {
                start: 7,
                end: 9
            }
        },
        black: {
            x: {
                start: 3,
                end: 5
            },
            y: {
                start: 0,
                end: 2
            }
        }
    }

    let winner = null
    let currentChess = null
    const handleClick = e => {
        console.log(currentPlayer)
        const clickX = e.pageX
        const clickY = e.pageY
        const offsetX = clickX - 200 + 32
        const offsetY = clickY - 200 + 32
        const x = Math.floor(offsetX / 80)
        const y = Math.floor(offsetY / 80)
        if (winner != null) {
            alert(`${winner}赢了`)
            return
        }
        const clickChess = getChessInPosition(x, y, chessAll)
        if (currentChess === null) {
            if (clickChess == null) return
            if (clickChess.props.player !== currentPlayer) {
                console.log(clickChess.props.player, currentPlayer)
                alert("当前不是你的回合")
                return
            }
            currentChess = clickChess
        } else {
            if (clickChess !== null && clickChess === currentChess) {
                currentChess = null
                return
            }
            if (clickChess !== null && clickChess.props.player === currentPlayer) {
                currentChess = clickChess
                return
            }
            if (clickChess === null) {
                if (!canJumpTo(x, y, currentChess, chessAll)) {
                    alert("无法到达")
                    currentChess = null
                } else {
                    setChessPieces(prevPieces => {
                        return prevPieces.map(piece => {
                            if (piece.id === +`${currentChess.props.id}`) {
                                return { id: `${currentChess.props.id}`, type: `${currentChess.props.type}`, x: x, y: y, player: `${currentChess.props.player}` }
                            } else {
                                return piece
                            }
                        })
                    })
                    currentChess = null
                    setCurrentPlayer(currentPlayer === "red" ? "black" : "red")
                }
            } else {
                setChessPieces(chessPieces.filter(p => p.id !== clickChess.props.id))
                setChessPieces(prevPieces => {
                    return prevPieces.map(piece => {
                        if (piece.id === `${currentChess.props.id}`) {
                            return { id: `${currentChess.props.id}`, type: `${currentChess.props.type}`, x: `${clickChess.props.x}`, y: `${clickChess.props.y}`, player: `${currentChess.props.player}` }
                        } else {
                            return piece
                        }
                    })
                })
                currentChess = null
                setCurrentPlayer(currentPlayer === "red" ? "black" : "red")
            }
        }
    }
    useImperativeHandle(event, () => ({
        handleClick
    }))

    return (
        <div className="chessAll">{chessAll}</div>
        // 1.useRef 2.useImperativeHandle 3.命名 4.方法剥离 5.自己写逻辑
    )
}
