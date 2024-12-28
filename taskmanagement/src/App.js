import react, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";
import Addtaskform from "./AddTaskForm";
import TaskList from "./Tasklist";


function App() {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [task, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://full-stack-task-management-app-4q2h.onrender.com/tasks");
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setReload(!reload);
    setIsAddFormVisible(false);
  }
  //toggle add task from visibility
  const toggleAddForm = () => {
    setIsAddFormVisible(true);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = task.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <>
      <div className="container"></div>
      <h1 className="main-heading">Task Management App</h1>
      <div className='search-container' >
        <input
          type="text"
          placeholder="Search Tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn-1" type="button" onClick={handleSearchClick}>Search</button>

        {/* add task button */}
        {!isAddFormVisible && (
          <button className="btn-2" onClick={toggleAddForm}>Add Task</button>
        )}
      </div>


      {/* conditionally show the add task form */}
      {isAddFormVisible ? (<Addtaskform onTaskAdded={handleTaskAdded}></Addtaskform >
      ) : (
        <TaskList task={filteredTasks} reload={reload} ></TaskList>
      )}
    </>
  );
}

export default App;
