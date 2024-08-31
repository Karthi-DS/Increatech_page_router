"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../[slug].module.css";

const TaskForm = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the dynamic route

  const startingTaskData = {
    task: "",
    priority: 0
  };
  
  const [formData, setFormData] = useState(startingTaskData);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get(`http://localhost:3000/api/getTaskById/${id}`);
          console.log(res)
          if (res.status === 200) {
            const data = res.data.task[0];

            setFormData({ task: data.task, priority: data.priority });
          } else {
            setFormData(startingTaskData);
          }
        } else {
          setFormData(startingTaskData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let url = "";
    if (!id || id === "new") {
      url = "http://localhost:3000/api/createTask";
    } else {
      url = `http://localhost:3000/api/updateTaskById/${id}`;
    }
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ formData })
    });
    if (!res.ok) {
      throw new Error("Failed to Create or Update Task");
    }
    router.push("/task_manager/tasks");
    router.reload();
  };

  return (
    <div className='centerDiv'>
      <form onSubmit={handleSubmit} className={styles.practiceform}>
        <div>
          <label>Task</label>
          <input type="text" name="task" required={true} value={formData.task} onChange={handleChange} />
          <label>Priority</label>
          <input name="priority" type="number" required={true} value={formData.priority} onChange={handleChange} />
          <input type="submit" value={id && id !== 'new' ? "Update Task" : "Create Task"} />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
