import type { NextApiRequest, NextApiResponse } from 'next';
import Task from "../(models)/Task"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const data = await Task.find()
            const response = { task: data };
            res.status(200).json(response);
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
