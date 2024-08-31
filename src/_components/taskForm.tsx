"use client";
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css";
import axios from 'axios';
import { useSelector} from 'react-redux';

const TaskForm = () => {
  const task = useSelector((state:any)=>state.tasks)
  console.log(task.taskId)
    const router = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const startingTaskData = {
        task:"",
        priority:0
    }
    const [formData,setFormData] = useState(startingTaskData)
    console.log(formData)
    const handleChange = (e:any)=>{
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    useEffect(() => {
      if(task.taskId!=='new'){
        setFormData(task)
      }else{
        setFormData(startingTaskData)
      }
    }, [task]);

    const handleSubmit =async (e:any) =>{
      e.preventDefault();
      let url = ""
      if(task.taskId=="new"){
        url = "http://localhost:3000/api/createTask"
      }else{
        url = `http://localhost:3000/api/updateTaskById/${task._id}`
      }
      const res = await fetch(url,{
          method:"POST",
          body:JSON.stringify({formData})

        })
        console.log(res)
        if(!res.ok){
          throw new Error("Failed to Create Ticket")
        }
        router.push("/task_manager")
        router.refresh()
    }


  return (
    <div className='centerDiv'>
      <form onSubmit={handleSubmit} className='practiceform'>
        {/* <h3>Create Your Task</h3> */}
        <div>
        <label >Task</label>
        <input type="text" name="task" required={true} value={formData.task} onChange={handleChange}/>
        <label >Priority</label>
        <input name="priority" type="number" required={true} value={formData.priority}  onChange={handleChange}/>
        <input type="submit" value={task&&task.taskId!=='new'?"Update Task":"Create Task"} />
        </div>
      </form>
    </div>
  )
}

export default TaskForm
