import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const Listas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const createTask=() =>{
    fetch('https://playground.4geeks.com/apis/fake/todos/user/conejito',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
    
  } 


    const getTask= () => {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/conejito/',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { id:"3694a48ec",  label: "Make the bed", done: false },
          { id:"c34b4dbb8b",  label: "Walk the dog", done: false },
          { id:"0611f8fdc",  label: "Do the replits", done: false},
        ),
      })
    }

    const borrarTask = () => {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/conejito/', {
        method: 'DELETE',
      })
      then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    };

  useEffect(() => {
    createTask ();

  }, []);
  useEffect(() => {
    getTask ();
    
  }, []);
  useEffect(() => {
   borrarTask ();
    
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Añade</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <FontAwesomeIcon icon={faCheck} onClick={() => toggleTask(task.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listas;
