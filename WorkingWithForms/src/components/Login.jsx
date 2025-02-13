// import {useRef,useState,useEffect} from "react"
// import { useInputValid } from "./hooks/useInputValidation.js"
// export default function Login() {
//   const [inputValue,setInputValue]=useState("")
//   const emailRef=useRef()
//   const passwordRef=useRef()
//     const { validInput } =useInputValid(inputValue.includes("@"))
//     function handelSubmit(event){
//       event.preventDefault();
      
//   }
  
//   function handelClick(){
//     setInputValue(emailRef.current.value)
//   }
  
//   return (
//     <form onSubmit={handelSubmit}>
//       <h2>Login</h2>

//       <div className="control-row">
//         <div className="control no-margin">
//           <label htmlFor="email">Email</label>
//           <input id="email" type="text" name="email" value={inputValue} ref={emailRef}/>
//           <div className="control-error">{validInput.email && <p>The Email Should Consist of @</p>}</div>
//         </div>

//         <div className="control no-margin">
//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" name="password" ref={passwordRef}/>
//           <div className="control-error">{validInput.password && <p>The Passwod Should more the 6 Characters</p>}</div>
//         </div>
//       </div>

//       <p className="form-actions">
//         <button type="reset" className="button button-flat">Reset</button>
//         <button className="button" onClick={handelClick}>Login</button>
//       </p>
//     </form>
//   );
// }

// if(!emailRef.current.value.includes("@")){
      //   setValidinput((preVal)=>{
      //     return {...preVal,email:true}
      //   })
      // }
      // else{
      //   setValidinput((preVal)=>{
      //     return {...preVal,email:false}
      //   })
      // }   
      // let validationCondition=emailRef.current.value.includes("@")
      // const { validInput } =useInputValid(validationCondition)
      // console.log(validInput)
      // if(passwordRef.current.value.length>6){
      //   setValidinput((preVal)=>{
      //     return {...preVal,password:true}
      //   })
      // }
      // else{
      //   setValidinput((preVal)=>{
      //     return {...preVal,password:true}
      //   })
      // }
      import { useRef, useState } from "react";
      import { useInputValid } from "./hooks/useInputValidation.js";
      
      export default function Login() {
        const [inputValue, setInputValue] = useState("");
        const emailRef = useRef();
        const passwordRef = useRef();
      
        const { validInput } = useInputValid(inputValue.includes("@"));
      
        function handleSubmit(event) {
          event.preventDefault();
          // Handle form submit logic here
        }
      
        function handleClick() {
          if (emailRef.current) {
            setInputValue(emailRef.current.value);
          }
        }
      
        return (
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
      
            <div className="control-row">
              <div className="control no-margin">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  ref={emailRef}
                  defaultValue={inputValue}
                />
                <div className="control-error">
                  {!validInput && <p>The Email Should Consist of @</p>}
                </div>
              </div>
      
              <div className="control no-margin">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordRef}
                />
                <div className="control-error">
                  {validInput.password && (
                    <p>The Password Should be more than 6 Characters</p>
                  )}
                </div>
              </div>
            </div>
      
            <p className="form-actions">
              <button type="reset" className="button button-flat">
                Reset
              </button>
              <button type="button" className="button" onClick={handleClick}>
                Login
              </button>
            </p>
          </form>
        );
      }
