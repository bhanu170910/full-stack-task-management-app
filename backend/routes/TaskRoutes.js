import express from "express"
import { getTasks } from "../controller/taskContorller.js";
import { addTasks, deleteTask } from "../controller/taskContorller.js"

import { updateTask } from "../controller/taskContorller.js";

const route = express.Router();
route.get("/", getTasks);
route.post("/", addTasks);
route.put("/:id", updateTask);
route.delete("/:id", deleteTask)

export default route;