import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    console.log("login route hit");
    res.sendStatus(200);
};  

export const register = async (req: Request, res: Response) => {
    console.log("register route hit");
    res.sendStatus(200);
};  