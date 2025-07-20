import React, { useState } from "react";
import "../css/Habits.css"; 
import { Thecontext } from "./App";
import { v4 as uuidv4 } from 'uuid';


export default function Habits() {
 
  const {habit,setNmbdays,setTotcheck} = React.useContext(Thecontext)


  const habits = habit.map((hab,index) => <Habit key={index} name={hab}
  setNmbdays={setNmbdays} setTotcheck={setTotcheck} index={index}/>
  )
 
 

  return (
   <div className="container">
    <div className="habits"> Habits</div>
    <div>
     {habits}
    </div>

   </div>
  );
}


function Habit({ name,setNmbdays ,setTotcheck,index}) {
   const checks = JSON.parse(localStorage.getItem(`check${index}`));
   const [check,setCheck] = useState(checks? checks :[{ key: uuidv4(),mark:'✔' }])
   

const handleChange = (e) => {
    const {value} = e.target;
    const {key} =e.target.dataset;
   
    
   setCheck(prev => 
  prev.map(pre => 
    pre.key === key ? { ...pre, mark: value } : pre
  )
);

   
}


React.useEffect(() => {
  if (!check || check.length < 2) return;
let count = 0;
if (check.length >= 2 && check[0].mark === '✔' && check[1].mark === '✔') {
  count += 1;
}

for (let i = 2; i < check.length - 1; i++) {
  if (
    check[i - 1].mark === '✖' &&
    check[i].mark === '✔' &&
    check[i + 1].mark === '✔'
  ) {
    count += 1;
  }
}




setNmbdays(prev => {
  const findStreak = prev.streaks.findIndex(ind => ind.id === index);
   if(findStreak !== -1) {
  
    const updatedStreaks = prev.streaks.map(str => 
       str.id === index ? {...str,streak:count}: str)

       return {...prev,streaks:updatedStreaks}
} else {

   return {...prev,streaks:[...prev.streaks,{id:index,streak:count}]}
  }
})

 const totalChecked = check.reduce((acc,item) => {

    return item.mark === '✔' ? acc + 1: acc;
  
  },0)
 setTotcheck( prev => {
 
  const existingIdex = prev ? prev.findIndex(elem => elem.id === index):null
  if( existingIdex !== -1 && prev) {
   return prev.map(elem => 
       elem.id === index ? {...elem,allChecked:totalChecked} :elem
    )
  } else {

 return   [...prev, {id:index, allChecked:totalChecked}]
  }
 
})

localStorage.setItem(`check${index}` ,JSON.stringify(check));
}, [check]);  


  const handleSubmit = (e) => {
  e.preventDefault();

    
  setCheck(prev => [...prev, { key: uuidv4(), mark:'✔' }]);
 

  setNmbdays(prev => 
    check.length === 1 ? {
    ...prev, totalNumber:prev.totalNumber +2} : {
    ...prev, totalNumber:prev.totalNumber +1}
    
  )
    
  }

    const marks = check.map(mark => {

  return (
   <div key={mark.key} className="mark-wrapper">
  <div className={ mark.mark}>{mark.mark}</div>
  <select
    onChange={handleChange}
    data-key={mark.key}
    className="select-overlay"
    value={mark.mark}
  >
    <option value="✖">✖</option>
    <option value="✔">✔</option>
  </select>
</div>

  );
});


  return (
   <>
      <form onSubmit={handleSubmit} className="mark-container">
      <p> {name}</p>
      <div className="second-container">{marks} </div>

            <button type="submit">Mark Today</button>

   </form>
   </>
  );
}
