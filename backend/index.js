import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import route from "./routes/TaskRoutes.js"



const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

//start the servercd
const MONGURL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000


//database connection
mongoose
  .connect(MONGURL).then(() => console.log('MongoDB connected'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Routes
app.use('/tasks', route);
