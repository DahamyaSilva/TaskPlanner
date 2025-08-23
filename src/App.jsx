import React, { useState } from 'react';
import './assets/style.css'
import AllTasks from "./components/AllTasks/allTasks"
import ManageTasks from "./components/taskManagement/manageTasks"

function App() {
  const [tasks, setTasks] = useState([]);

  return (
      <div className="main-container">
          {/* Pass tasks and setTasks to both components */}
          <AllTasks tasks={tasks} setTasks={setTasks} />
          <ManageTasks tasks={tasks} setTasks={setTasks} />
      </div>
  );
}

export default App
