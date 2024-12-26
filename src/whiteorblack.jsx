import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChessKing} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
function Sel(){
    return(
        <>
      
        <div id="con1">
        <h1>Select your Kingdom</h1>
           
            <Link to='/whitekingdom'>
            <button id="whitebtn">
            <div id="White">
            <FontAwesomeIcon icon={faChessKing} id="whiteking" />
            <p>White</p>
            </div>
            </button></Link>
        </div>
        </>
    )
}
export default Sel;