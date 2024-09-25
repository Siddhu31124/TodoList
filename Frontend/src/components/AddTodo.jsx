import { useRef,useState} from "react"
import { Link,useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {todoAction} from "../store/ReduxStore"
import {v4} from "uuid"
import Input from "./Input"
export default function AddTodo(){
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let titleInput=useRef()
    let descriptionInput=useRef()
    let DateInput=useRef() 
    const tasks = useSelector(state=>state.todos)
    function  handelDetails(event){
        event.preventDefault()
        if(titleInput.current.value==="" || descriptionInput.current.value==="" || DateInput.current.value===""){
            console.log(error)
            return setError(true)
        }
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
        navigate("/todo/todo-details")
        async function fetchdata(){
            await fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(todoDetails), 
            headers: {
              "Content-Type": "application/json" 
            }
          })
        }
        fetchdata()
        
        setError(false)
    }

    return(
    <form className="element" onSubmit={handelDetails}>
        <menu className="buttonContainer">
            <Link to={tasks.length>0?"/todo/todo-details":"/todo"}><button className="buttonCancel" type="button">Cancel</button></Link> 
            <button className="buttonSave" type="submit">Save</button>
        </menu>
        <Input ref={titleInput} label={"Title"} TypeofInput={"input"}  required/>
        <Input ref={descriptionInput} label={"Description"} TypeofInput={"textarea"}   required/>
        <Input ref={DateInput} label={"Due Date"} type="date" TypeofInput={"input"}  required/>
        {error && <p className="errormsg">*Need Fill All Details</p>}
    </form>
    )
}

