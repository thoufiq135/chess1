import './white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faChessKing, faChessBishop, faChessKnight, faChessPawn, faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { pawnHighlight,pawnmove,RESET } from '../slice1';
import { selectPiece } from '../slice1';

import { useDispatch,useSelector } from 'react-redux';

function White() {
    const {selectpiece,Setup,highlight,turn,checkmate}=useSelector((state)=>state.chess)
  
    let dispatch=useDispatch()
    let [time, settime] = useState({ min: 0, sec: 0 });
    let [Btime, setBtime] = useState({ min: 0, sec: 0 });
    let [Wtime, setWtime] = useState({ min: 0, sec: 0 });
    let [white,setwhite] = useState(true)



    function handle(r, c, p) {
        console.log("Clicked square:", { r, c, p });
    
        if (p) {
            dispatch(selectPiece({ r, c, p }));
            console.log("Selected piece:", selectpiece);
        }
    

        function handleMove() {
            const targetPiece = Setup[r][c];
    
            if (!targetPiece) {
                console.log("Valid move detected");
            } else {
                console.log("Cannot capture your own piece");
            }
    
            const movePayload = {
                from: selectpiece,
                to: { row: r, col: c, p: selectpiece.p },
            };
            console.log("Dispatching move payload:", movePayload);
            dispatch(pawnmove(movePayload));
        }
    
        if (selectpiece && highlight.some(([row, col]) => row === r && col === c)) {
            handleMove();
        } else {
            console.log("Highlighting moves for pawn");
            dispatch(pawnHighlight({ r, c, p }));
        }
    }
    
    
    

    useEffect(() => {
     
        const interval = setInterval(() => {
            
            settime((prevTime) => {
                const { min, sec } = prevTime;
                if (sec === 59) {
                    return { min: min + 1, sec: 0 };
                } else {
                    return { min, sec: sec + 1 };
                }
            });
        }, 1000);
        return()=>{clearInterval(interval)}

    }, []);
 
    
    
    
    
    
    
    
    
    
    function reset(){
        settime({min:0,sec:0})
        dispatch(RESET())
  
    }

    function whiteset(row, col, pie) {
        let ishighlight=highlight.some(([r,c])=>r===row&&c===col)  


        const isLight = (row + col) % 2 === 0;
        const pieceSymbols = {
            R: <FontAwesomeIcon icon={faChessRook} style={{ color: '#ffffff' }} />,
            N: <FontAwesomeIcon icon={faChessKnight} style={{ color: '#ffffff' }} />,
            B: <FontAwesomeIcon icon={faChessBishop} style={{ color: '#ffffff' }} />,
            Q: <FontAwesomeIcon icon={faChessQueen} style={{ color: '#ffffff' }} />,
            K: <FontAwesomeIcon icon={faChessKing} style={{ color: '#ffffff' }} />,
            P: <FontAwesomeIcon icon={faChessPawn} style={{ color: '#ffffff' }} />,
            r: <FontAwesomeIcon icon={faChessRook} style={{ color: '#000000' }} />,
            n: <FontAwesomeIcon icon={faChessKnight} style={{ color: '#000000' }} />,
            b: <FontAwesomeIcon icon={faChessBishop} style={{ color: '#000000' }} />,
            q: <FontAwesomeIcon icon={faChessQueen} style={{ color: '#000000' }} />,
            k: <FontAwesomeIcon icon={faChessKing} style={{ color: '#000000' }} />,
            p: <FontAwesomeIcon icon={faChessPawn} style={{ color: '#000000' }} />,
        };

        return (
            <div id="box" key={`${row}-${col}`} className={`Square ${isLight ? 'Light' : 'Dark'} ${ishighlight?"change":""}`} onClick={()=>handle(row,col,pie)}>
                {pie && <span className="comp">{pieceSymbols[pie]}</span>}
            </div>
        );
    }
    console.log("com",checkmate)

    return (
        <>
                <div className={checkmate? "completed":"not"}>Checkmate!</div>
                <div id="bd">bdead</div>
                <div id="wdied">whidied</div>
            <div id="par">
    
                <div id="turnwhi">{turn}</div>
                
                <button id="re" onClick={()=>reset(time)}>RESET</button>
                <div id="tablewhi">
               
                    {Setup.map((row, rowindex) =>
                        row.map((pieces, colindex) => whiteset(rowindex, colindex, pieces))
                    )}
                    
                </div>
                <div id="timerwhi">{time.min}:{time.sec}</div>
            </div>
        </>
    );
}


export default White;
