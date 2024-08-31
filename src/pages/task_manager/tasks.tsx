"use client";
import TaskCard from "../../_components/taskCard";
import axios from "axios";
import React,{useEffect,useState} from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tasks,setTasks] = useState([{task:"goto gym",priority:3}])
  const [isLoading,setLoading] = useState(false);
  const router = useRouter()
  const pushToAddTask = ()=>{
    router.push("/task_manager/task_page/new")
  }
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true)
      try {
        const response:any = await axios.get("http://localhost:3000/api/getTask/");
        const TicketData = response.data.task;
        setTasks(TicketData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        setLoading(false)
      }
    };
    fetchData();
  },[])
  return (
    <>
        {isLoading?"Loading..":tasks.length>0?
          tasks.map((task:any,index)=>(
            <div className="cardDiv" key={index}>         
              <TaskCard task={task}/>
            </div>
          )):"No Tickets to display"
        }
        <button className="addTask" onClick={pushToAddTask}>Add <br /> Task</button>
    </>
  )
}
