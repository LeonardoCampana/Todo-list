// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const xpPerTask = 10;
  const xpToNextLevel = 100 + (level * 50);

  function addTask(text) {
    if (text === '') {
      return;
    }
      const newTask = {
        id: Date.now(),
        text: text,
        completed: false
      }
      setTasks([...tasks, newTask])
      setInputValue('')
  }

  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          ganhoXp(xpPerTask)
        }
        else
        {
          ganhoXp(-xpPerTask)
        }
        return {...task, completed:!task.completed }
      }
      return task;
    }))
  }
  function ganhoXp(xpGanho) {
    let newXp = xp + xpGanho;
    let newLevel = level;
  
    while (newXp < 0 && newLevel > 0) {
      newLevel--;
      newXp += (100 + (newLevel * 50));
    }
  
    while (newXp >= (100 + (newLevel * 50))) {
      newXp -= (100 + (newLevel * 50));
      newLevel++;
    }
  
    setXp(newXp);
    setLevel(newLevel);
  }

  return (
    <main>
      <div className='header'>
        <h1 style={{textAlign: 'center'}}>TODO LIST</h1>
        <div className='xpBarContainer'>
          <span>Level: {level}</span>
          <div className='xpBar'>
            <div className='xp-progress' style={{width: `${(xp / xpToNextLevel) * 100}%`}}></div>
          </div>
        </div>

      </div>
      <div className='AddTasks'>
        <input type="text" name="" id="" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={() => addTask(inputValue)}>ADD</button>
      </div>
      <div className='tasksContainer'>
        {tasks.map(task => (
          <div className='tasks' key={task.id} >
            <input className='checkboxTasks' type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task.id)}/>
            <span className='textTasks' style={{color: task.completed? '#2bda31' : '#6da7ac', important: true}}>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className='removeTasksBtn'>Remove</button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App;