import React, { useState } from "react";
import './allTasks.css'

function AllTasks({ tasks, setTasks }){

        // State to track which filter is active
        const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'completed', 'pending'
    
        // Function to toggle task completion status
        function toggleTaskCompletion(taskId) {
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, isCompleted: !task.isCompleted };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    
        // Filter tasks based on active filter
        function getFilteredTasks() {
            if (activeFilter === 'completed') {
                return tasks.filter(task => task.isCompleted === true);
            } else if (activeFilter === 'pending') {
                return tasks.filter(task => task.isCompleted === false);
            }
            return tasks; // Show all tasks
        }
    
        const filteredTasks = getFilteredTasks();

    return (

        <div className="all-tasks">
            <h1>All Tasks</h1>
            {/* Filter buttons */}
            <div className="filter-buttons">
                <button 
                    className={activeFilter === 'completed' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setActiveFilter('completed')}
                >
                    View Completed Tasks
                </button>
                <button 
                    className={activeFilter === 'pending' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setActiveFilter('pending')}
                >
                    View Pending Tasks
                </button>
                <button 
                    className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setActiveFilter('all')}
                >
                    View All Tasks
                </button>
            </div>

            {/* Tasks list */}
            <div className="tasks-container">
                {filteredTasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>
                            {activeFilter === 'completed' && 'No completed tasks yet'}
                            {activeFilter === 'pending' && 'No pending tasks'}
                            {activeFilter === 'all' && 'No tasks added yet'}
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <div className="task-content">
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-description">{task.description}</p>
                                <span className="task-date">{task.dateCreated}</span>
                            </div>
                            
                            <div className="task-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                    className="checkbox"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
            
        </div>


    )


}

export default AllTasks