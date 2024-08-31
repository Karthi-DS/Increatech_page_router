import Task from "../(models)/Task";
import { NextResponse } from "next/server";

export async function POST(req:any){
    try{
        const body = await req.json();
        const taskData = body.formData;
        console.log(taskData,body)
        await Task.create(taskData);
        return NextResponse.json({message:"Success"},{status:200})
    }catch(error){
        return NextResponse.json({message:"Error",error},{status:500})
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse,{params}:{params:any}) {
    try {
        if (req.method === 'POST') {
            const body = await req.body.json();
            const taskData = body.formData;
            const data = await Task.create(taskData)
            const response = { task: data,message:"Task Deleted Successfully." };
            res.status(200).json(response);
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
