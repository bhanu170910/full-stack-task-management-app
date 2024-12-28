import React, { useState, useEffect } from "react";
import axios from "axios";

const EditForm = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, status };
    try {
      await axios.put(`https://full-stack-task-management-app-4q2h.onrender.com/tasks/${task._id}`, updatedTask);
      onUpdate(); // Callback to update the task list after editing
      onClose(); // Close the form after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
        >
          <option value={false}>Pending</option>
          <option value={true}>Completed</option>
        </select>
        <div className="button-holder">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
export default EditForm;