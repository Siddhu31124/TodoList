import Login from "../components/Login"
import { redirect } from "react-router-dom";
export default function LoginPage(){
    return(<Login/>)
    }
    export async function action({request}){
        let data=await request.formData();
        let loginData={
          username:data.get("username"),
          password:data.get('password')
        }
        const response=await fetch('/api/login',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(loginData)
        })
        if(!response.ok){
            console.log(response)
        }
        let resdata=response.json()
        console.log(resdata)
        return redirect('/todo')
          
      }