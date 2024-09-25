import HomePage from "./Pages/HomePage";
import AddTodoPage from "./Pages/AddTodoPage";
import TodoDetailsPage from "./Pages/TodoDetailsPage";
import RouterPage from "./RouterPage"
import LoginPage from "./Pages/LoginPage";
import Sign from "./components/SignUp";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
function App() {
  const router=createBrowserRouter([
    {path:"/",element:<LoginPage/>},
    {path:"/signup",element:<Sign/>},
    {
    path:'/todo',
    element:<RouterPage/>,
    children:[
    {path:"/todo",element:<HomePage/>},
    {path:"/todo/add-todo",element:<AddTodoPage/>},
    {path:"/todo/todo-details",element:<TodoDetailsPage/>},
    {path:"/todo/todo/edit/:id",element:<AddTodoPage />}
    ]
  }])
  return(
    <RouterProvider router={router}/>
  )
}

export default App;
