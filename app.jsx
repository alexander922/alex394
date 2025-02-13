import React, { useState, useEffect } from "react";
import "./style.css";

// Funzione per caricare le attività dal localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const App = () => {
  // Stato per le attività, caricate da localStorage
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [newTask, setNewTask] = useState("");
  const [taskQuality, setTaskQuality] = useState("Bassa");

  // Funzione per salvare le attività nel localStorage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Funzione per aggiungere una nuova task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        quality: taskQuality,
        completed: false,
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setNewTask("");
      setTaskQuality("Bassa");
    }
  };

  // Funzione per segnare una task come completata
  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Funzione per rimuovere una task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Filtraggio delle task non completate e completate
  const filteredTasks = tasks.filter((task) => task.completed === false);
  const completedTasks = tasks.filter((task) => task.completed === true);

  return (
    <div className="container">
      <h1>Lista delle cose da fare</h1>
      <div className="input-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Aggiungi una nuova attività"
        />
        <select
          value={taskQuality}
          onChange={(e) => setTaskQuality(e.target.value)}
        >
          <option value="Bassa">Bassa</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button onClick={handleAddTask}>Aggiungi</button>
      </div>

      <h2>Attività da fare</h2>
      {filteredTasks.length === 0 ? (
        <p>Nessuna attività da fare.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={`task ${task.quality.toLowerCase()}`}>
              <span>{task.text}</span>
              <button onClick={() => toggleCompletion(task.id)}>
                Completa
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>
                Annulla
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Attività completate</h2>
      {completedTasks.length === 0 ? (
        <p>Nessuna attività completata.</p>
      ) : (
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id} className={`task ${task.quality.toLowerCase()} completed`}>
              <span>{task.text}</span>
              <button onClick={() => toggleCompletion(task.id)}>
                Annulla completamento
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
