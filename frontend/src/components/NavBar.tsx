import {NavLink} from 'react-router-dom'
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import React from "react";
//import "../style.css"

export default function NavBar(){

  const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
    return(
      <nav className="flex justify-center gap-10">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium " to={'/'}>All Entries</NavLink>
        
            <button className=" border border-gray-800 dark:border-gray-200 m-3 p-4 text-xl rounded-md  justify-center" name="darkmode" onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoSunny /> && "Dark Mode" }  <p className='ml-8'>{dark == true ? <IoSunny /> : <IoMoon />}</p>
                
                {
                    !dark && <IoMoon /> && "Light Mode"
                }
               
            </button>
       
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium " to={'/create'}>New Entry</NavLink>
      </nav>
    )
}