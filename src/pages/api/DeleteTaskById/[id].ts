import type { NextApiRequest, NextApiResponse } from 'next';
import Task from '@/pages/(models)/Task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query;
        if (req.method === 'POST') {
            const data = await Task.findByIdAndDelete(id)
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
