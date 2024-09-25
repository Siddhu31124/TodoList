import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export default function SideBar({}){
    const todo=useSelector(state=>state.todos)
    let tasks=(todo?todo:[])
    return(
        <div className="SidebarContainer">
            <h1>Your Todos</h1>
            <Link to="/todo/add-todo"><button className="custom-button">Create New Todo</button></Link> 
            <ul>
                {tasks.map((project,index)=><li key={index} >{project.title}</li>)}
            </ul>
        </div>
    )
}