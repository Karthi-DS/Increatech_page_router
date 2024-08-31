"use client";
import { useRouter } from 'next/navigation';

const DeleteBlock = ({id}:{id:any}) => {
  
  const router = useRouter()
  const deleteTicket =async (e:any) =>{
    let url = `http://localhost:3000/api/deleteTaskById/${id}`
      e.preventDefault();
      const res = await fetch(url,{
        method:"POST"
      })
      if(!res.ok){
        throw new Error("Failed to Create Ticket")
      } else{
        router.refresh()
      }  
  }
  return (
    <div>
        <button onClick={deleteTicket} className="deleteButton" >Delete</button>
    </div>
  )
}

export default DeleteBlock
