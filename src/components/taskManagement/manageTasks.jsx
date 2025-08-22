import React, {useState} from "react";
import './manageTasks.css'

function ManageTasks() {
    
        const[tasks, setTasks] = useState([]);
        const[newTask, setNewTask] = useState("");    
        const[newTaskDescription, setNewTaskDescription] = useState("");
    
        function handleTitleChange(event) {
            setNewTask(event.target.value);
        }
    
        function handleDescriptionChange(event) {
            setNewTaskDescription(event.target.value);
        }
    
        // Add a task
        function addTask() {
            if (newTask.trim() !== "" && newTaskDescription.trim() !== "") {
                // Create a new task object with unique ID, title, description, and completion status
                const taskToAdd = {
                    id: Date.now(), 
                    title: newTask.trim(),
                    description: newTaskDescription.trim(),
                    isCompleted: false,
                    dateCreated: new Date().toLocaleDateString() 
                };
    
                setTasks(previousTasks => [...previousTasks, taskToAdd]);
    
                // Clear the input fields after adding the task
                setNewTask("");
                setNewTaskDescription("");
            } else {
                alert("Please fill in both task title and description!");
            }
        }

    return (
        <div className="manage-tasks">

            {/* Add new task */}
            <div className="add-new-task">
                <h1>Add New Task</h1>
                <div className="form-container">
                    {/* Task Title Input */}
                    <h2 className="title">Task Title</h2>
                    <input 
                        className="task-input"
                        type="text" 
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleTitleChange}
                    />

                    <h2 className="title">Task Description</h2>
                    {/* Task description Input */}
                    <textarea 
                        className="task-textarea"
                        placeholder="Enter task description..."
                        value={newTaskDescription}
                        onChange={handleDescriptionChange}
                        rows="4"
                    />
                    <button className="add-btn" onClick={addTask}>Add</button>
                </div>
            </div>


        </div>
    )
}

export default ManageTasks