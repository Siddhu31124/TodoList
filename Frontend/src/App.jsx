import HomePage from "./Pages/HomePage";
import AddTodoPage from "./Pages/AddTodoPage";
import TodoDetailsPage from "./Pages/TodoDetailsPage";
import RouterPage from "./RouterPage"
import LoginPage from "./Pages/LoginPage";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
function App() {
  const router=createBrowserRouter([
    {path:"/login",element:<LoginPage/>},
    {
    path:'/',
    element:<RouterPage/>,
    children:[
    {path:"/login",element:<LoginPage/>},
    {path:"/",element:<HomePage/>},
    {path:"/add-todo",element:<AddTodoPage/>},
    {path:"/todo-details",element:<TodoDetailsPage/>}
    ]
  }])
  return(
    <RouterProvider router={router}/>
  )
}

export default App;
