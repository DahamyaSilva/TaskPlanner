import React from "react"
import './assets/style.css'
import AllTasks from "./components/allTasks/allTasks"
import ManageTasks from "./components/taskManagement/manageTasks"
function App() {

  return (
    <div className="main-container">
      <AllTasks />
      <ManageTasks />

    </div>
  )
}

export default App
