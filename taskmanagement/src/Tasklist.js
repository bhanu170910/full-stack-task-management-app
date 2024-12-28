import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import EditForm from "./editForm";

// TaskList Component
const TaskList = ({ reload, task }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://full-stack-task-management-app-4q2h.onrender.com/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = () => {
    setEditingTask(null);
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="task-list">
      {editingTask && (
        <EditForm
          task={editingTask}
          onUpdate={handleUpdate}
          onClose={handleCloseEdit}
        />
      )}
      <div className="task-cards">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-card-content">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div>
                <span className="staus-head">Status :</span>
                <span
                  className={`status ${task.status ? "completed" : "pending"}`}
                >
                  {task.status ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="button-holder">
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-primary edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TaskList;