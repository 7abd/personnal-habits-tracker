import "../css/Header.css"; 
import { useState,useContext } from "react";
import { Thecontext } from "./App";

export default function Header() {

   
const  { handleSubmit} = useContext(Thecontext)

    return ( 
       <>
       <h1 className="habit">
        My Habit Tracker</h1>
        <form onSubmit={handleSubmit}  className="add-habit-container">
            <div className="add-new"> Add New Habbit</div>
            <div className="add-container">
            <input name="newHabit" type="text"  placeholder="Add New Habit"/>
            <button type="submit">Add</button>
            </div>
        </form>
        </>
        
    )
}