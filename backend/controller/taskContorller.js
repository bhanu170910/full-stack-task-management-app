import Task from '../module/taskModule.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({ message: "tasks are Not Found," });
    }
    res.json(tasks);
  }
  catch (err) {
    res.status(500).json({ error: "Server Error" })
  }
}

export const addTasks = async (req, res) => {
  try {
    const taskData = new Task(req.body);
    const { title, description, status } = taskData;

    const addNewTask = new Task({ title, description, status });
    const saveTask = await addNewTask.save();
    res.status(201).json(addNewTask);

  }
  catch (error) {
    res.status(500).json({ error: 'failed to create task' })
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}