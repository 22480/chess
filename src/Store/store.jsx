import createStore from "easy-zustand";


    const useChessStore = createStore( [
            {id:1, type: "車", x: 0, y: 0, player: "black" },
            { id:2,type: "馬", x: 1, y: 0, player: "black" },
            { id:3,type: "相", x: 2, y: 0, player: "black" },
            { id:4,type: "士", x: 3, y: 0, player: "black" },
            { id:5,type: "帥", x: 4, y: 0, player: "black" },
            { id:6,type: "士", x: 5, y: 0, player: "black" },
            { id:7,type: "相", x: 6, y: 0, player: "black" },
            { id:8,type: "馬", x: 7, y: 0, player: "black" },
            { id:9,type: "車", x: 8, y: 0, player: "black" },
            { id:10,type: "炮", x: 1, y: 2, player: "black" },
            { id:11,type: "炮", x: 7, y: 2, player: "black" },
            { id:12,type: "兵", x: 0, y: 3, player: "black" },
            { id:13,type: "兵", x: 2, y: 3, player: "black" },
            { id:14,type: "兵", x: 4, y: 3, player: "black" },
            { id:15,type: "兵", x: 6, y: 3, player: "black" },
            { id:16,type: "兵", x: 8, y: 3, player: "black" },
            { id:17,type: "車", x: 0, y: 9, player: "red" },
            { id:18,type: "馬", x: 1, y: 9, player: "red" },
            { id:19,type: "象", x: 2, y: 9, player: "red" },
            { id:20,type: "士", x: 3, y: 9, player: "red" },
            { id:21,type: "将", x: 4, y: 9, player: "red" },
            { id:22,type: "士", x: 5, y: 9, player: "red" },
            { id:23,type: "象", x: 6, y: 9, player: "red" },
            { id:24,type: "馬", x: 7, y: 9, player: "red" },
            { id:25,type: "車", x: 8, y: 9, player: "red" },
            { id:26,type: "砲", x: 1, y: 7, player: "red" },
            { id:27,type: "砲", x: 7, y: 7, player: "red" },
            { id:28,type: "卒", x: 0, y: 6, player: "red" },
            { id:29,type: "卒", x: 2, y: 6, player: "red" },
            { id:30,type: "卒", x: 4, y: 6, player: "red" },
            { id:31,type: "卒", x: 6, y: 6, player: "red" },
            { id:32,type: "卒", x: 8, y: 6, player: "red" }
        ]

    )

        export default useChessStore

