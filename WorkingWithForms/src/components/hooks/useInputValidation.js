import { useState } from "react"
export function useInputValid(validationCondition){
    const [validInput,setValidinput]=useState({email:false,password:false})
    if(!validationCondition){
        setValidinput((preVal)=>{
          return {...preVal,email:true}
        })
      }
      else{
        setValidinput((preVal)=>{
          return {...preVal,email:false}
        })
      } 
      return {validInput}
}
