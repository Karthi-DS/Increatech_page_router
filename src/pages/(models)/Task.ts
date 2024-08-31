import mongoose, {Schema} from "mongoose";
const mongodbUri: any = "mongodb://localhost:27017/TaskDB";
mongoose.connect(mongodbUri);
mongoose.Promise = global.Promise;

const taskSchema = new Schema({
    task:String,
    priority:Number
},{
    timestamps:true,
})

const Task = mongoose.models.Task || mongoose.model("Task",taskSchema)

export default Task