import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
function Home(){
    return(
        <>
        <div id="back">
            <div id="blur">
            <div className="Play">
            <Link to="/Select" ><button id="play">Play<FontAwesomeIcon icon={faGamepad} /></button></Link>
            </div>
            </div>
        </div>
        </>
    )
}
export default Home;