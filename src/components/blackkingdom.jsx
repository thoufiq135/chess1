import './black.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChessRook,faChessKing,faChessBishop,faChessKnight,faChessPawn,faChessQueen} from "@fortawesome/free-solid-svg-icons"
import { useState,useEffect } from 'react'

function Black(){
    let[timer,settimer]=useState({mins:0,secs:0})
    useEffect(()=>{
        const Time=setInterval(()=>{
            settimer((p)=>{
                const{mins,secs}=p;
                if(secs===59){
                    return{mins:mins+1,secs:0}
                }else{
                    return{mins,secs:secs+1}
                }
            })
        },1000)
        return()=>clearInterval(Time)
    },[])
    
    
    function pieceset(rin,cin,pie){
        const color=(rin+cin)%2==0;
        const pieceSymbols = {
            r:<FontAwesomeIcon icon={faChessRook} style={{color: "#ffffff",}} />, 
            n: <FontAwesomeIcon icon={faChessKnight} style={{color: "#ffffff",}}/>, 
            b: <FontAwesomeIcon icon={faChessBishop} style={{color: "#ffffff",}}/>, 
            q: <FontAwesomeIcon icon={faChessQueen} style={{color: "#ffffff",}}/>, 
            k: <FontAwesomeIcon icon={faChessKing} style={{color: "#ffffff",}} />,
            p: <FontAwesomeIcon icon={faChessPawn} style={{color: "#ffffff",}}/>, 
            R: <FontAwesomeIcon icon={faChessRook} style={{color: "#000000",}} />,
            N: <FontAwesomeIcon icon={faChessKnight} style={{color: "#000000",}} />, 
            B: <FontAwesomeIcon icon={faChessBishop} style={{color: "#000000",}} />, 
            Q: <FontAwesomeIcon icon={faChessQueen} style={{color: "#000000",}} />, 
            K: <FontAwesomeIcon icon={faChessKing} style={{color: "#000000",}} />,
            P: <FontAwesomeIcon icon={faChessPawn} style={{color: "#000000",}} />, 
          };
          return(
            
            <div 
            key={{rin}-{cin}}
            className= {`square ${color?"light":"dark"}`}>
                {pie&& <span className='piece'>{pieceSymbols[pie]}</span>}
            </div>
            
          )
    }

    return(
        <>
        <div id='par'>
        <div id="turnbla">
                black
            </div>
        <div id="table">
            {Setup.map((row,rowindex)=>
                row.map((pieces,colindex)=>
                    pieceset(rowindex,colindex,pieces)
                )
            )}
        </div>
        <div id='timebla'>{timer.mins}:{timer.secs}</div>
        
        </div>
      
        </>
    )
}
export default Black;