import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'; // Add custom styles here

const App = () => {
  // State Management
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  // Add Task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { task: newTask, date: selectedDate, completed: false }]);
      setNewTask('');
    }
  };

  // Delete Task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Toggle Completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);
  };

  // Pomodoro Timer Logic
  useEffect(() => {
    let timer;
    if (isRunning && pomodoroTime > 0) {
      timer = setInterval(() => setPomodoroTime((prev) => prev - 1), 1000);
    } else if (pomodoroTime === 0) {
      alert('Pomodoro session complete!');
      setIsRunning(false);
      setBadgeCount((prev) => prev + 1);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroTime]);

  // Format Timer
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Personalized Study Planner</h1>

      {/* Calendar */}
      <div className="calendar-section">
        <h2>Calendar</h2>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* Tasks */}
      <div className="task-section">
        <h2>Tasks</h2>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>

        <ul>
          {tasks
            .filter((task) => task.date.toDateString() === selectedDate.toDateString())
            .map((task, index) => (
              <li key={index} className={task.completed ? 'completed' : ''}>
                <span onClick={() => toggleCompletion(index)}>{task.task}</span>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>

      {/* Pomodoro Timer */}
      <div className="pomodoro-section">
        <h2>Pomodoro Timer</h2>
        <div className="timer-display">{formatTime(pomodoroTime)}</div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setPomodoroTime(25 * 60)}>Reset</button>
      </div>

      {/* Progress and Badges */}
      <div className="badge-section">
        <h2>Badges</h2>
        <p>You have earned {badgeCount} badges!</p>
      </div>
    </div>
  );
};

export default App;
