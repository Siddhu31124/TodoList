import {useState} from "react"
export default function LoginState() {
  const [enteredValues,setEnteredValues]=useState({email:"",password:""})
  const [enteredError,setEnteredError]=useState({email:false,password:false})
  function handelSubmit(event){
      event.preventDefault();
  }
  function handelChange(identifier,value){
      if (identifier==="email"){
        setEnteredValues((prevoiusValue)=>{
          return{
            ...prevoiusValue,[identifier]:value 
          }
        })
        if(!value.includes("@")){
          setEnteredError((preVal)=>{
            return {...preVal,email:true}
          })
        }
        else{
          setEnteredError((preVal)=>{
            return {...preVal,email:false}
          })
        }
      }
      if (identifier==="password"){
        setEnteredValues((prevoiusValue)=>{
          return{
            ...prevoiusValue,[identifier]:value 
          }
        })
        if(value.length<6){
          setEnteredError((preVal)=>{
            return {...preVal,password:true}
          })
        }
        else{
          setEnteredError((preVal)=>{
          return {...preVal,password:false}
        })
        }
        
      }
  }
  return (
    <form onSubmit={handelSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" value={enteredValues.email} onChange={()=>handelChange("email",event.target.value)}/>
          <div className="control-error">{enteredError.email && <p>The Email Should Consist of @</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={enteredValues.password} onChange={()=>handelChange("password",event.target.value)}/>
          <div className="control-error">{enteredError.password && <p>The password Should Consist of 6 Characters</p>}</div>
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}