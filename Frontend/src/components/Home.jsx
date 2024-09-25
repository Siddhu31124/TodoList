import {Link} from "react-router-dom"
export default function Home(){
    return(
            <div className="homeContainer">
                <div><img src="logo.png" /></div>
                <h2 >Create a New Todo</h2>
                <p > Get Statred with Creating a new Todo</p>
                <Link to="/add-todo"><button>Create a New Todo</button></Link> 
            </div>
        )
    }