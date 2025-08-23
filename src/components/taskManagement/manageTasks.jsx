import React, { useState } from "react";
import './manageTasks.css'

// Accept tasks and setTasks as props instead of creating local state
function ManageTasks({ tasks, setTasks }) {
    
    // Remove this line: const[tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");    
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("medium");

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    function handleTitleChange(event) {
        setNewTask(event.target.value);
    }

    function handleDescriptionChange(event) {
        setNewTaskDescription(event.target.value);
    }

    function handlePriorityChange(event) {
        setNewTaskPriority(event.target.value);
    }

    // Add a task - now updates the shared state
    function addTask() {
        if (newTask.trim() !== "") {
            const taskToAdd = {
                id: Date.now(), 
                title: newTask.trim(),
                description: newTaskDescription.trim(),
                priority: newTaskPriority, 
                isCompleted: false,
                dateCreated: new Date().toLocaleDateString() 
            };

            setTasks(previousTasks => [...previousTasks, taskToAdd]);

            setNewTask("");
            setNewTaskDescription("");
            setNewTaskPriority("medium");
        } else {
            alert("You have not added a new task with the title!");
        }
    }

    function startEditTask(task) {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    }

    function saveEditTask(taskId) {
        if (editTitle.trim() !== "") {
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        title: editTitle.trim(),
                        description: editDescription.trim()
                    };
                }
                return task;
            });
            
            setTasks(updatedTasks);
            setEditingTaskId(null);
            setEditTitle("");
            setEditDescription("");
        } else {
            alert("Your fields are empty");
        }
    }

    function cancelEdit() {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
    }

    function deleteTask(taskId) {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        
        if (editingTaskId === taskId) {
            cancelEdit();
        }
    }

    function changePriority(taskId, newPriority) {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, priority: newPriority };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    return (
        <div className="manage-tasks">
            {/* Add new task */}
            <div className="add-new-task">
                <h1>Add New Task</h1>
                <div className="form-container">
                    <h2 className="title">Task Title</h2>
                    <input 
                        className="task-input"
                        type="text" 
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleTitleChange}
                    />

                    <div className="priority-section">
                        <h2 className="title">Priority</h2>
                        <select 
                            className="priority-select"
                            value={newTaskPriority}
                            onChange={handlePriorityChange}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    <h2 className="title">Task Description</h2>
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

            {/* Edit tasks */}
            <div className="edit-tasks">
                <h1>Edit Tasks</h1>
                
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>No tasks added yet</p>
                    </div>
                ) : (
                    <div className="tasks-list">
                        {tasks.map((task) => (
                            <div key={task.id} className="task-item-edit">
                                {editingTaskId === task.id ? (
                                    <div className="edit-form">
                                        <div className="edit-row">
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="edit-input"
                                                placeholder="Task title"
                                            />
                                        </div>
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            className="edit-textarea"
                                            placeholder="Task description"
                                            rows="3"
                                        />
                                        <div className="edit-actions">
                                            <button className="save-btn" onClick={() => saveEditTask(task.id)}>Save</button>
                                            <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="task-display">
                                        <div className="task-row">
                                            <div className="task-info">
                                                <h3 className="task-title">{task.title}</h3>
                                            </div>
                                            
                                            <div className="task-actions">
                                                <button className="edit-icon-btn" onClick={() => startEditTask(task)} title="Edit task">
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                
                                                <select 
                                                    className="priority-select-edit"
                                                    value={task.priority || "medium"}
                                                    onChange={(e) => changePriority(task.id, e.target.value)}
                                                    title="Change priority level"
                                                >
                                                    <option value="low">Low Priority</option>
                                                    <option value="medium">Medium Priority</option>
                                                    <option value="high">High Priority</option>
                                                </select>
                                                
                                                <button 
                                                    className="delete-icon-btn"
                                                    onClick={() => deleteTask(task.id)}
                                                    title="Delete task"
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageTasks;