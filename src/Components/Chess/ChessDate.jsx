import React, { useImperativeHandle } from 'react'
import Chess from "./Chess.jsx"
import useChessStore from '../../Store/store.jsx'
import useCurrentPlayerStore from '../../Store/player.jsx'
import './ChessDate.css'

export default function ChessDate(props) {
    const [chessPieces,setChessPieces]=useChessStore()
    const [currentPlayer,setCurrentPlayer]=useCurrentPlayerStore()
    // const Context = React.createContext()
    const {event} = props

    const chessAll = chessPieces.map(item => <Chess key={`${item.x}-${item.y}`} id={item.id} type={item.type} x={item.x} y={item.y} player={item.player} />)
    // console.log(chessAll)

    function getChessInPosition(x, y) {
        let target = null
        for (let i = 0; i < chessAll.length; i++) {
            const chess = chessAll[i]
            // console.log(chess)
            if (chess.props.x === x && chess.props.y === y) {
                target = chess
                break
            }
        }
        return target
    }

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

    function canJumpTo(x, y,currentChess) {
        switch (currentChess.props.type) {
            case "車":
                if (x !== currentChess.props.x && y !== currentChess.props.y) return false
                if (x === currentChess.props.x) {
                    const start = Math.min(currentChess.props.y, y)
                    const end = Math.max(currentChess.props.y, y)
                    if (end === start + 1) return true
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(x, i)
                        if (chess !== null) return false
                    }
                    return true
                }
                if (y === currentChess.props.y) {
                    const start = Math.min(currentChess.props.x, x)
                    const end = Math.max(currentChess.props.x, x)
                    if (end === start + 1) return true
                    for (let i = start + 1; i < end; i++) {
                        const chess = getChessInPosition(i, y)
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
                const horseLegChess = getChessInPosition(horseLegX, horseLegY)
                if (horseLegChess !== null) return false
                return true
            case "象":
                if (!(Math.abs(x - currentChess.props.x) === 2 && Math.abs(y - currentChess.props.y) === 2)) return false
                const elephantLegX = (x + currentChess.props.x) / 2
                const elephantLegY = (y + currentChess.props.y) / 2
                const elephantLegChess = getChessInPosition(elephantLegX, elephantLegY)
                if (elephantLegChess !== null) return false
                return true
            case "相":
                if (!(Math.abs(x - currentChess.props.x) === 2 && Math.abs(y - currentChess.props.y) === 2)) return false
                const elephantsLegX = (x + currentChess.props.x) / 2
                const elephantsLegY = (y + currentChess.props.y) / 2
                const elephantsLegChess = getChessInPosition(elephantsLegX, elephantsLegY)
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
                    const targetChess = getChessInPosition(x, y)
                    let middleChessCount = 0
                    const start = Math.min(currentChess.props.y, y)
                    const end = Math.max(currentChess.props.y, y)
                    if (end > start + 1) {
                        for (let i = start + 1; i < end; i++) {
                            const chess = getChessInPosition(x, i)
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
                    const targetChess = getChessInPosition(x, y)
                    let middleChessCount = 0
                    const start = Math.min(currentChess.props.x, x)
                    const end = Math.max(currentChess.props.x, x)
                    if (end > start + 1) {
                        for (let i = start + 1; i < end; i++) {
                            const chess = getChessInPosition(i, y)
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
                    const targetChess = getChessInPosition(x, y)
                    let middleChessCount = 0
                    const start = Math.min(currentChess.props.y, y)
                    const end = Math.max(currentChess.props.y, y)
                    if (end > start + 1) {
                        for (let i = start + 1; i < end; i++) {
                            const chess = getChessInPosition(x, i)
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
                    const targetChess = getChessInPosition(x, y)
                    let middleChessCount = 0
                    const start = Math.min(currentChess.props.x, x)
                    const end = Math.max(currentChess.props.x, x)
                    if (end > start + 1) {
                        for (let i = start + 1; i < end; i++) {
                            const chess = getChessInPosition(i, y)
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
                if (currentChess.props.player === "black" && y <currentChess.props.y) {
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


    let winner = null
    let currentChess = null
    const handleClick=(e)=>{
        console.log(currentPlayer)
        // const rect = e.getBoundingClientRect()
        const clickX = e.pageX
        const clickY = e.pageY
        const offsetX = clickX -200+32
        const offsetY = clickY -200+32
        const x = Math.floor(offsetX /  80)
        const y = Math.floor(offsetY /  80)
        console.log(x,y)
        console.log(currentPlayer)
        if (winner != null) {
            alert(`${winner}赢了`)
            return
        }
        // console.log(chessAll)
        const clickChess = getChessInPosition(x, y)  //返回一个react元素
        console.log(currentPlayer+'123')
        if (currentChess === null) {
            if (clickChess == null) return
            if (clickChess.props.player !== currentPlayer) {
                console.log(clickChess.props.player,currentPlayer)
                alert("当前不是你的回合")
                return
            }
            currentChess = clickChess //react
            console.log(currentChess,clickChess,"1")
        } else {
            if (clickChess !== null && clickChess === currentChess) {
                currentChess = null
                console.log(currentChess,clickChess,"2")
                return
            }
            if (clickChess !== null && clickChess.props.player === currentPlayer) {
                currentChess = clickChess
                console.log(currentChess,clickChess,"3")
                return
            }
            if (clickChess === null) {
                console.log('---')
                console.log(currentChess,clickChess,"4")
                if (!canJumpTo(x, y,currentChess)) {
                    alert("无法到达")
                    currentChess = null
                } else {
                    setChessPieces(prevPieces => {
                        return prevPieces.map(piece => {
                              if (piece.id ===+`${currentChess.props.id}`) {
                                return { id:`${currentChess.props.id}`, type: `${currentChess.props.type}`, x: x, y:y, player: `${currentChess.props.player}`}
                              } else {
                                return piece
                              }
                            })
                          })
                          console.log(currentChess,clickChess,"5")
                    currentChess = null
                    setCurrentPlayer(currentPlayer === "red" ? "black" : "red")
                    console.log(currentChess,clickChess,"6")
                }
            }else{
                // console.log(currentChess,clickChess,"7")
                setChessPieces(chessPieces.filter(p => p.id !== clickChess.props.id))
                // console.log(currentChess,clickChess,"8")
                setChessPieces(prevPieces => {
                    return prevPieces.map(piece => {
                        if (piece.id ===`${currentChess.props.id}`) {
                            // console.log(x,y,"456")
                            return { id:`${currentChess.props.id}`, type: `${currentChess.props.type}`, x:`${clickChess.props.x}`, y:`${clickChess.props.y}`, player: `${currentChess.props.player}`}
                        } else {
                            // console.log(x,y,"123456",currentChess.props.id)
                            return piece
                        }
                        })
                    })
                    // console.log(currentChess,clickChess,"9")
                currentChess = null
                setCurrentPlayer(currentPlayer === "red" ? "black" : "red")
            }
            
        
            // if (clickChess&&clickChess.props.type === "将" || "帥") {
            //     winner = currentPlayer
            //     alert(`${winner}赢了`)
            //     return
            // }
        }
    }
    useImperativeHandle(event,()=>({
		handleClick
	}))
    
  return (
    // <Context.Provider value={{ handleClick }}>
    <div className="chessAll">
        {chessAll}
    </div>
    // </Context.Provider>
  )
}
