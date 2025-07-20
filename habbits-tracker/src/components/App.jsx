import React , { useState } from 'react'
import Header from './Header'
import Habits from './Habits'
import Stats from './Stats'
import { v4 as uuidv4 } from 'uuid';


import '../css/App.css'



export const Thecontext = React.createContext();

export function App() {

  const habits = JSON.parse(localStorage.getItem('habit'));
const numbDays =  JSON.parse(localStorage.getItem('numbdays'));
const totChecks = JSON.parse(localStorage.getItem('totCheck'));

  const [habit,setHabit] = useState( habits? habits :[]);
  const [numbdays,setNmbdays] = useState(numbDays ? numbDays :{totalNumber:0 ,streaks:[]
})
const [totCheck,setTotcheck] = useState(totChecks? totChecks :[])
 



  function handleSubmit(event) {

    event.preventDefault()
    const formEl = event.currentTarget
    const formData = new FormData(formEl)
      const Habit = formData.get('newHabit')
      setHabit(prev => {
        return [...prev,Habit];
        }
      )
    formEl.reset()
   
    
    
  }
  
React.useEffect( () => {

  localStorage.setItem('habit',JSON.stringify(habit));
  localStorage.setItem('numbdays',JSON.stringify(numbdays));
  localStorage.setItem('totCheck',JSON.stringify(totCheck));
},[habit,totCheck,numbdays,])


  return(
    <div className='big-container'>
    <Thecontext.Provider value={{habit,handleSubmit,setNmbdays,setTotcheck,numbdays,totCheck}}>
    <Header/>
    <Habits/>
    <Stats />

    </Thecontext.Provider>
  
    </div>
  )
}

