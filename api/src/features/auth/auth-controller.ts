import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    console.log("login route hit");
    res.send("login route hit");
};  

export const register = async (req: Request, res: Response) => {
    console.log("register route hit");
    res.send("register route hit");
};  