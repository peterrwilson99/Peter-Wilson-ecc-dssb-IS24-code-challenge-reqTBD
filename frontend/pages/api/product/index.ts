import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const url = 'http://localhost:3000/api/product';
    if(req.method === "GET"){
        return await getProduct(req, res, url);
    }else if(req.method === "POST"){
        return await postProduct(req, res, url);
    }

    return res.status(405).json({message: "Method not allowed"});
}

async function getProduct(req: NextApiRequest, res: NextApiResponse, url: string){
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(!response.ok){
            return res.status(response.status).json({message: data.message});
        }
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json({message: error});
    }
}

async function postProduct(req: NextApiRequest, res: NextApiResponse, url: string){
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        
        if(!response.ok){
            return res.status(response.status).json({message: data.message});
        }
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json({message: error});
    }
}
