import React from "react";
import logo from "../public/images/logo.jpg"
import SearchProperties from "./SearchProperties";
export default function Header(){
    return(
        <nav className="nav">
            <div className="flex-between">
                <img src={logo.src} alt='logo' width={100} className="pointer"/>
                <SearchProperties/>
                <h2 className="hero-title">SOL3</h2>
               
            </div>
        </nav>
    ) 
}