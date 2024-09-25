import { useRef,useState} from "react"
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {todoAction} from "../store/ReduxStore"
import {v4} from "uuid"
import Input from "./Input"
export default function AddTodo(){
    const [error,setError]=useState(false)
    const dispatch=useDispatch()
    let titleInput=useRef()
    let descriptionInput=useRef()
    let DateInput=useRef() 
    const tasks = useSelector(state=>state.todos)
    function handelDetails(){
        // if(titleInput.current.value==="" || descriptionInput.current.value==="" || DateInput.current.value===""){
        //     console.log(error)
        //     return setError(true)
        // }
        let todoDetails=
        {
        id:v4(), 
        title:titleInput.current.value,
        description:descriptionInput.current.value,
        date:DateInput.current.value}
        dispatch(todoAction.onAddTodo(todoDetails))
        titleInput.current.value="",
        descriptionInput.current.value="",
        DateInput.current.value=""
        console.log(error)
        // setError(false)
    }
    return(
    <div className="element">
        <menu className="buttonContainer">
           <Link to={tasks.length>0?"/todo-details":"/"}><button className="buttonCancel">Cancel</button></Link> 
            <Link to={error?"/add-todo":"/todo-details"}><button className="buttonSave" onClick={handelDetails}>Save</button></Link>
        </menu>
        <Input ref={titleInput} label={"Title"} TypeofInput={"input"} required/>
        <Input ref={descriptionInput} label={"Description"} TypeofInput={"textarea"} required/>
        <Input ref={DateInput} label={"Due Date"} type="date" TypeofInput={"input"} required/>
        {error && <p >Need Fill All Details</p>}
    </div>
    )
}
