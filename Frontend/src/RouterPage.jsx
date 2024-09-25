import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
export default function RouterPage(){
    return(
    <main className="mainContainer">
        <SideBar/>
        <Outlet/>
    </main>
)}