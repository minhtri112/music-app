import { Request, Response } from "express";


export const dashboard = async (req : Request, res : Response)=>{
    res.render('admin/pages/dashboard/index.pug',{
        pageTitle : "Trang chủ",
    });
}