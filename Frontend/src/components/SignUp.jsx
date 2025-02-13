import {redirect,json,Form} from "react-router-dom"
const Sign = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Sign Up</h1>
        <Form method="post" action="/signup">
          <div className="form-group">
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              id="email"
              className="form-input"
              name="email"
              placeholder="Enter your Email"
              required
            />
            <label htmlFor="username">UsernName</label>
            <input
              type="text"
              id="username"
              className="form-input"
              name="username"
              placeholder="Enter your UserNmae"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              name='password'
              placeholder="Enter your password"
              required
            />
          </div>
         <button type="submit" className="login-btn" >
            Sign Up
          </button> 
        </Form>
      </div>
    </div>
  );
};
export default Sign;

export async function actionSingUp({request,params}){
  const data=await request.formData()
  const signUpData={username:data.get("username"),password:data.get("password")}

  const response=await fetch("/api/signup",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(signUpData),
  })
  if(!response.ok){
    throw json({msg:"Failed to Sign"},{status:500})
  }
  return redirect('/')
}
