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
  // TODO : BUG DE VOLTAR DE NIVEL A RESOLVER
  function ganhoXp(xpGanho) {
    const newXp = xp + xpGanho;
    if (newXp < 0) {
      setLevel(Math.max(0, level - 1)); // Decrementa o nível se o XP cair abaixo de 0
      setXp((100 + (level * 50)) - xpPerTask); // Reseta o XP para 0
    } else {
      setXp(newXp);
      if (newXp >= xpToNextLevel) {
        setLevel(level + 1)
        setXp(0)
      }
    }
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
          <div className='tasks' key={task.id} style={{textDecoration: task.completed? 'line-through' : 'none'}} >
            <input className='checkboxTasks' type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task.id)}/>
            <span className='textTasks'>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className='removeTasksBtn'>Remove</button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App;