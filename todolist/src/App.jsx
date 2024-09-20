// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: "Lever a criança na escola",
        completed: false
      },
      {
        id: 2,
        text: "Comer",
        completed: true
      }
    ]
  )
  const [inputValue, setInputValue] = useState('');

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
        return {...task, completed:!task.completed }
      }
      return task;
    }))
  }



  return (
    <main>
      <div>
        <h1 style={{textAlign: 'center'}}>TODO LIST</h1>
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