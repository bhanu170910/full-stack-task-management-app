import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  status: {
    type: Boolean, default: false
  },
  created_at: {
    type: Date, default: Date.now
  },
}

)
export default mongoose.model("Task", taskSchema);