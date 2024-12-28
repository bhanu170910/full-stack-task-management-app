import axios from 'axios';
import React, { useState } from 'react';
const Addtaskform = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };
    if (!title) {
      setError('title is required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      onTaskAdded(newTask);
      setTitle('');
      setDescription('')
      setError('');
    }
    catch (error) {
      setError('Failed to add task.Please try agian');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='add-task-form'>
        <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} required />

        <textarea placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
        >
          <option value={false}>Pending</option>
          <option value={true}>Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </>
  )
}
export default Addtaskform;