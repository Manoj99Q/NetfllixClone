import { NextApiRequest,NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverauth";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!='GET'){
        return res.status(405).end();
    }

    try{
        const {currentUser} = await serverAuth(req,res);

        const favouriteMovies =  await prismadb.movie.findMany({
            where:{
                id:{
                    in:currentUser?.favoriteIds,
                }
            }
        });

        return res.status(200).json(favouriteMovies);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}