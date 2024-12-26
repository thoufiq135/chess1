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
        message:null
    },
    reducers: {
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
            console.log("Pawn move action received:", { from, to });
        
            
        
            const { r: fromR, c: fromC } = from;
            const { row: toR, col: toC } = to;
        
            

            state.Setup[toR][toC] = state.Setup[fromR][fromC];
            state.Setup[fromR][fromC] = null;
        

            state.selectpiece = null;
            state.highlight = [];
            if(state.turn=="white"){
                state.turn="Black"
            }else{
                state.turn="white"
            }

        },
        
        setTurn: (state, action) => {
            state.turn = action.payload;
        },
    }
});

export const { selectPiece,selectpiece, pawnHighlight, setTurn, pawnmove } = Chess.actions;
export default Chess.reducer;
