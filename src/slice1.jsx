import { createSlice } from "@reduxjs/toolkit";

const Chess = createSlice({
    name: "chess",
    initialState: {
        Setup: [
            ['r','n','b','q','k','b','n','r'],
            ['p','p','p','p','p','p','p','p'],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            ['P','P','P','P','P','P','P','P'],
            ['R','N','B','Q','K','B','N','R']
        ],
        selectpiece: null,
        highlight: [],
        turn: "white",
        white:true,
        small:["r","n","b","q","k","p"],
        checkmate: false,
    },
    reducers: {
        checkForCheckmate: (state) => {
            const isWhiteTurn = state.turn === "white";
            const king = isWhiteTurn ? "K" : "k";
            
            // Step 1: Locate the king
            let kingPosition = null;
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    if (state.Setup[r][c] === king) {
                        kingPosition = { r, c };
                        break;
                    }
                }
                if (kingPosition) break;
            }
        
            // If the king is not on the board (shouldn't happen), end the game
            if (!kingPosition) {
                state.checkmate = true;
                return;
            }
        
            // Step 2: Check if the king is under attack
            const isSquareUnderAttack = (r, c) => {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        const piece = state.Setup[i][j];
                        if (!piece || (isWhiteTurn ? piece === piece.toUpperCase() : piece === piece.toLowerCase())) {
                            continue; // Skip empty squares and friendly pieces
                        }
        
                        // Simulate highlighting opponent moves
                        const moves = []; // Replace with logic for generating moves for `piece`
                        for (const [mr, mc] of moves) {
                            if (mr === r && mc === c) return true;
                        }
                    }
                }
                return false;
            };
        
            if (!isSquareUnderAttack(kingPosition.r, kingPosition.c)) {
                state.checkmate = false;
                return;
            }
        
            // Step 3: Check if the king has legal moves
            const kingMoves = [];
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1],
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
            for (const [dr, dc] of directions) {
                const nr = kingPosition.r + dr;
                const nc = kingPosition.c + dc;
                if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                    const targetPiece = state.Setup[nr][nc];
                    if (!targetPiece || (isWhiteTurn ? targetPiece === targetPiece.toLowerCase() : targetPiece === targetPiece.toUpperCase())) {
                        if (!isSquareUnderAttack(nr, nc)) {
                            kingMoves.push([nr, nc]);
                        }
                    }
                }
            }
        
            if (kingMoves.length > 0) {
                state.checkmate = false;
                return;
            }
        
            // Step 4: Check if other pieces can resolve the check
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const piece = state.Setup[r][c];
                    if (piece && (isWhiteTurn ? piece === piece.toUpperCase() : piece === piece.toLowerCase())) {
                        const moves = []; // Replace with logic for generating moves for `piece`
                        for (const [mr, mc] of moves) {
                            const clonedBoard = JSON.parse(JSON.stringify(state.Setup));
                            clonedBoard[mr][mc] = piece;
                            clonedBoard[r][c] = null;
        
                            // Simulate checking if the king is still in check
                            if (!isSquareUnderAttack(kingPosition.r, kingPosition.c)) {
                                state.checkmate = false;
                                return;
                            }
                        }
                    }
                }
            }
        
            // No legal moves to resolve check, it's checkmate
            state.checkmate = true;
        },
        
        selectPiece: (state, action) => {
            const { r, c, p } = action.payload;
            console.log("Piece selected:", { r, c, p });
            state.selectpiece = { r, c, p };

        },
        pawnHighlight: (state, action) => {
            const { r, c, p } = action.payload;
            const phig = [];

            if (p === "P") {
                if (r > 0 && state.Setup[r - 1][c] === null) {
                    phig.push([r - 1, c]);
                }
                if (r === 6 && state.Setup[r - 2][c] === null && state.Setup[r - 1][c] === null) {
                    phig.push([r - 2, c]);
                }
                if (r > 0) {
                    if (c > 0 && state.Setup[r - 1][c - 1] !== null&&state.Setup[r - 1][c - 1]!== p) {
                        phig.push([r - 1, c - 1]);
                    }
                    if (c < 7 && state.Setup[r - 1][c + 1] !== null && state.Setup[r - 1][c + 1]!== p) {
                        phig.push([r - 1, c + 1]);
                    }
                }
            }
            if (p === "p") {

                if (r < 7 && state.Setup[r + 1][c] === null) {
                    phig.push([r + 1, c]); 
                }

                if (r === 1 && state.Setup[r + 2][c] === null && state.Setup[r + 1][c] === null) {
                    phig.push([r + 2, c]);
                }

                if (r < 7) {
                    if (c > 0 && state.Setup[r + 1][c - 1] !== null &&state.Setup[r + 1][c - 1]!== "p") {
                        phig.push([r + 1, c - 1]); 
                    }
                    if (c < 7 && state.Setup[r + 1][c + 1] !== null &&state.Setup[r + 1][c + 1]!== "p") {
                        phig.push([r + 1, c + 1]);
                    }
                }
            }
            //horse moves------------------------------------------------------------------------------------------------
            if (p === "N"||p==="n") {
                const iswhite=p==="N"
            
              
                const offset=[
                    [2, 1], [2, -1], [-2, 1], [-2, -1],
                    [1, 2], [1, -2], [-1, 2], [-1, -2],
                ]
                for (const[rowoff,coloff] of offset){
                     const newRow=r+rowoff
                     const newCol=c+coloff
                     if(newRow>=0&&newRow<8&&newCol>=0&&newCol<8){
                        let tarpiece=state.Setup[newRow][newCol];
                        if (tarpiece === null || (iswhite && tarpiece.toLowerCase() === tarpiece) || (!iswhite && tarpiece.toUpperCase() === tarpiece)) {
                            phig.push([newRow, newCol]);
                        }
                    }
                    
                }
                
            }
           
            state.highlight = [...phig];
            // ---------------------------------------------elephantmove---------------------------------------------------------------
            if (p === "r" || p === "R") {
                const iswhite = p === "R";
                const roffset = [
                    [-1, 0], [1, 0], [0, -1], [0, 1], 
                ];
            
                for (const [rrow, rcol] of roffset) {
                    let newrrow = r + rrow; 
                    let newrcol = c + rcol; 
            
                    while (newrrow >= 0 && newrrow < 8 && newrcol >= 0 && newrcol < 8) {
                        let rtarpiece = state.Setup[newrrow][newrcol];
            
                        if (rtarpiece !== null) {
                   
                            if (
                                (iswhite && rtarpiece.toLowerCase() === rtarpiece) ||
                                (!iswhite && rtarpiece.toUpperCase() === rtarpiece)
                            ) {
                                phig.push([newrrow, newrcol]);
                            }
                            break; 
                        }
            

                        phig.push([newrrow, newrcol]);
            
                   
                        newrrow += rrow;
                        newrcol += rcol;
                    }
                }
            
                state.highlight = [...phig];
            }
            // ----------------------------------------------------------------bishop----------------------------------------------------
            if (p === "b" || p === "B") {
                const iswhite = p === "B";
                const boffset = [
                    [-1, 1], [1, -1], [-1, -1], [1, 1], 
                ];
            
                for (const [brow, bcol] of boffset) {
                    let newbrow = r + brow; 
                    let newbcol = c + bcol; 
            
                    while (newbrow >= 0 && newbrow < 8 && newbcol >= 0 && newbcol < 8) {
                        let rtarpiece = state.Setup[newbrow][newbcol];
            
                        if (rtarpiece !== null) {
                   
                            if (
                                (iswhite && rtarpiece.toLowerCase() === rtarpiece) ||
                                (!iswhite && rtarpiece.toUpperCase() === rtarpiece)
                            ) {
                                phig.push([newbrow, newbcol]);
                            }
                            break; 
                        }
            

                        phig.push([newbrow, newbcol]);
            
                   
                        newbrow += brow;
                        newbcol += bcol;
                    }
                }
            
                state.highlight = [...phig];
            }
            // ------------------------------------------queen--------------------------------------------
            if (p === "q" || p === "Q") {
                const iswhite = p === "Q";
                const boffset = [
                    [-1, 1], [1, -1], [-1, -1], [1, 1],
                    [-1, 0], [1, 0], [0, -1], [0, 1] 

                ];
            
                for (const [brow, bcol] of boffset) {
                    let newbrow = r + brow; 
                    let newbcol = c + bcol; 
            
                    while (newbrow >= 0 && newbrow < 8 && newbcol >= 0 && newbcol < 8) {
                        let rtarpiece = state.Setup[newbrow][newbcol];
            
                        if (rtarpiece !== null) {
                   
                            if (
                                (iswhite && rtarpiece.toLowerCase() === rtarpiece) ||
                                (!iswhite && rtarpiece.toUpperCase() === rtarpiece)
                            ) {
                                phig.push([newbrow, newbcol]);
                            }
                            break; 
                        }
            

                        phig.push([newbrow, newbcol]);
            
                   
                        newbrow += brow;
                        newbcol += bcol;
                    }
                }
            
                state.highlight = [...phig];
            }
            // ------------------------------------------------------king---------------------------------
            if (p === "k" || p === "K") {
                const iswhite = p === "K";
                const boffset = [
                    [-1, 1], [1, -1], [-1, -1], [1, 1],
                    [-1, 0], [1, 0], [0, -1], [0, 1] 

                ];
            
                for (const [brow, bcol] of boffset) {
                    let newbrow = r + brow; 
                    let newbcol = c + bcol; 
                    if(newbrow>=0&&newbrow<8&&newbcol>=0&&newbcol<8){
                        let tarpiece=state.Setup[newbrow][newbcol];
                        if (tarpiece === null || (iswhite && tarpiece.toLowerCase() === tarpiece) || (!iswhite && tarpiece.toUpperCase() === tarpiece)) {
                            phig.push([newbrow, newbcol]);
                        }
                    }        
                   
                        
                    }
                
            
                state.highlight = [...phig];
            }
        },
        pawnmove: (state, action) => {
            const { from, to } = action.payload;
            const { r: fromR, c: fromC } = from;
            const { row: toR, col: toC } = to;
            const piece = state.Setup[fromR][fromC];
            const isWhitePiece = piece === piece.toUpperCase();
            console.log("Pawn move action received:", { from, to, piece });
        
            if ((state.white && !isWhitePiece) || (!state.white && isWhitePiece)) {
                console.log("Not your turn!");
                return;
            }
        
            state.Setup[toR][toC] = piece;
            state.Setup[fromR][fromC] = null;
            state.selectpiece = null;
            state.highlight = [];
            state.white = !state.white;
            state.turn = state.white ? "white" : "black";
            console.log(`Turn changed to: ${state.turn}`);
        

            Chess.caseReducers.checkForCheckmate(state);
            if (state.checkmate) {
                console.log(`Checkmate! ${state.turn === "white" ? "Black" : "White"} wins.`);
            }
        },
        
        
        
        setTurn: (state, action) => {
            state.turn = action.payload;
        },
        RESET:(state)=>{
           return {
        ...state,
        Setup: [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ],
        selectpiece: null,
        highlight: [],
        turn: "white",
    };
        }
    }
});

export const { selectPiece,selectpiece, pawnHighlight, setTurn, pawnmove,RESET } = Chess.actions;
export default Chess.reducer;