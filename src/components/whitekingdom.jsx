import './white.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faChessKing, faChessBishop, faChessKnight, faChessPawn, faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { pawnHighlight,pawnmove } from '../slice1';
import { selectPiece } from '../slice1';

import { useDispatch,useSelector } from 'react-redux';

function White() {
    const {selectpiece,Setup,highlight,turn}=useSelector((state)=>state.chess)
  
    let dispatch=useDispatch()
    let [time, settime] = useState({ min: 0, sec: 0 });


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
    function handle(r, c, p) {
        console.log("Clicked square:", { r, c, p });
    
        if (p) {
            dispatch(selectPiece({ r, c, p }));
            console.log("Selected piece:", selectpiece);
        }
    
        if (selectpiece && highlight.some(([row, col]) => row === r && col === c)) {
            console.log("Valid move detected");
            const movePayload = {
                from: selectpiece,
                to: { row: r, col: c, p: selectpiece.p },
            };
            console.log("Dispatching move payload:", movePayload);
            dispatch(pawnmove(movePayload));
        } else {
            console.log("Highlighting moves for pawn");
            dispatch(pawnHighlight({ r, c, p }));
        }
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

    return (
        <>
            <div id="par">
                <div id="turnwhi">{turn}</div>
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
