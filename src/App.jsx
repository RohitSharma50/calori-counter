import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState(getLocalStorageData());
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalcalories] = useState(localStorageCalories());
  
  const handleInput = () => {
    if(food=="" || calories==""){alert("Input value is required");
      return;}
    const newEntry = {
      id: Date.now(),
      food,
      calories: parseInt(calories),
      date: new Date().toLocaleDateString(),
    };
    setTotalcalories(totalCalories+parseInt(calories));
    setEntries([newEntry, ...entries]);
    setFood('');
    setCalories(''); 

   }; 

   function localStorageCalories(){
        let data=getLocalStorageData();
        let calories=0;
             data.map((item)=>{
          calories +=item.calories;

                              })
                      return calories
   }

    useEffect(()=>{
       localStorage.setItem('list', JSON.stringify(entries) )
    },[entries]);
   
     function getLocalStorageData(){
      let list=JSON.parse(localStorage.getItem('list'));
       if(list) 
        return JSON.parse(localStorage.getItem('list'));
       else return[];
     }
     const getValues = () => {
     const allValues = {};
     entries.forEach((value) => {
      if (!allValues[value.date]) {
           allValues[value.date] = [];
      }
      allValues[value.date].push(value);
     });
     return allValues;
  };

  return (
    <div className="container">
      <h1>Calorie Counter</h1>
      <div className="">
        <input
           type="text"
           placeholder="Food Item"
           value={food}    
           className="input"      
           onChange={(e) => setFood(e.target.value)} 
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          className="input"     
          onChange={(e) => setCalories(e.target.value)
          }
        />
        <button onClick={handleInput} className="button">Add Value</button>
      </div>

      <div className="entries-section">
        {Object.entries(getValues()).map(([date, items]) => (
          <div key={date}  >
            <h2>{date}</h2>
            

            <h2> TotalCalories:{totalCalories}</h2>

            {items.map((item) => (
              <div key={item.id} className="entries" >
                <ul>
                <l>{item.food} - {item.calories} kcal </l>
                </ul>
              </div>
              

            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
 export default App;