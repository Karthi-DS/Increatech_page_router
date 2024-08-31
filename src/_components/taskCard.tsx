import React from "react";
import DeleteBlock from "./deleteBlock";
import PriorityDisplay from "./priorityDisplay";
import { useRouter } from "next/navigation";

const TaskCard = ({ task }: { task: any }) => {

  const router = useRouter()
  const pushToUpdate = () =>{
    router.push(`task_page/${task._id}`)
  }
  return (
    <div className="taskCard">
      <div className="inlineCard">
        <div className="iconPriority">
          <PriorityDisplay priority={task.priority}></PriorityDisplay>
        </div>
      </div>
      <div className="taskInfo">
        Task: <span className="taskInfoTask">{task.task}</span>
      </div>
      <div>
        <div className="inlineCard">
          <div className="iconDelete">
            <DeleteBlock id={task._id}></DeleteBlock>
          </div>
          <div>
            <button className="editButton" onClick={pushToUpdate}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
