import '../css/stats.css'
import { Thecontext } from './App'
import React from 'react';

export default function Stats() {
 const {habit,totCheck,numbdays} = React.useContext(Thecontext);
 const totalHabits = habit.length;

const sum = totCheck.reduce((acc,item) => {

               return   acc + item.allChecked;

 },0)
 const streakSum = numbdays.streaks.reduce((acc,str) => {
  return acc + str.streak
},0);

 const sumChecked = sum? sum:1

 const percentComp = !numbdays.totalNumber?'0':  Math.round((sumChecked / numbdays.totalNumber )  * 100)
 
    return(
        <>
        <div className='container-stats'>
        <p className='stats'> Stats</p>
          <p> Total habits  <span> {totalHabits}</span></p>
          <p> Streaks  <span> {streakSum}</span></p>
          <p> %of completion this week <span> {percentComp}% </span></p>
        </div>
        </>
    )
}