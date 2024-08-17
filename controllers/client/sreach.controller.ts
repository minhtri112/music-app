import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import {convertToSlug } from "../../helpers/converToSlug";
import { title } from "process";

//[GET] /sreach/result
export const result = async (req : Request, res : Response)=>{
    const keyValue = req.query.keyword;
    const type = req.params.type;
    let newSongs = [];

    if(keyValue){
        const keywordRegex = new RegExp(keyValue as string, "i");

        // Tạo ra slug không dấu , có thêm dấu - ngăn cách;
        const stringSlug = convertToSlug(keyValue as string);
        const stringSlugRegex = new RegExp(stringSlug, "i"); 

        const songs = await Song.find(
            {
                $or : [
                    {title : keywordRegex},
                    {slug : stringSlugRegex} 
                ]
            }
        );

        
        for(const item of songs){
            const infoSinger = await Singer.findOne({
                _id : item.singerId
            })
            item["infoSinger"] = infoSinger;


            newSongs.push({
                id : item.id,
                title : item.title,
                avatar : item.avatar,
                like : item.like,
                slug : item.slug,
                infoSinger : {
                    fullName : infoSinger.fullName
                }
            })
        }

     
    }

    if(type === "sreach"){
    res.render("client/pages/sreach/index.pug",{
        pageTitle : "Kết quả tìm kiếm",
        keyValue : keyValue,
        songs : newSongs
    });
    }
    else{
        res.json({
            code : 200,
            message : "Thành công",
            songs : newSongs
        });
    }



    
}

