import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";


export const songs = async (req : Request, res : Response)=>{

    const songs = await Song.find({
        deleted : false,
    });

    res.render('admin/pages/songs/index.pug',{
        pageTitle : "Danh sách bài hát",
        songs : songs
    });
}


export const create = async (req : Request, res : Response)=>{
    const topics = await Topic.find({
        deleted : false,
        status : "active"
    }).select("title");


    const singers = await Singer.find({
        deleted : false,
        status : "active"
    }).select("fullName");

    res.render('admin/pages/songs/create.pug',{
        pageTitle : "Tạo bài hát",
        topics : topics,
        singers : singers
    });
}


export const createPost = async (req : Request, res : Response)=>{

    const dataSong = {
        title : req.body.title || "",
        description : req.body.description || "",
        singerId : req.body.singerId || "",
        topicId : req.body.topicId || "",
        avatar : req.body.avatar[0] || "",
        status : req.body.status || "active",
        audio : req.body.audio[0] || "",
        lyrics : req.body.lyrics || "",
    }

    const song =  new Song(dataSong);
    await song.save();

    res.redirect(`/admin/songs`);
}


export const edit = async (req : Request, res : Response)=>{
    const id = req.params.id;

    const song = await Song.findOne({
        _id : id,
        deleted : false,
        status : "active"
    });

    const topics = await Topic.find({
        deleted : false,
        status : "active"
    }).select("title");


    const singers = await Singer.find({
        deleted : false,
        status : "active"
    }).select("fullName");

    res.render('admin/pages/songs/edit.pug',{
        pageTitle : "Tạo bài hát",
        topics : topics,
        singers : singers,
        song : song
    });
}


export const editPatch = async (req : Request, res : Response)=>{
    const id = req.params.id;
    const dataSong = {
        title : req.body.title || "",
        description : req.body.description || "",
        singerId : req.body.singerId || "",
        topicId : req.body.topicId || "",
        status : req.body.status || "active",
        lyrics : req.body.lyrics || "",
    }

    if(req.body.avatar){
        dataSong["avatar"] = req.body.avatar[0];
    }

    if(req.body.audio){
        dataSong["audio"] = req.body.audio[0];
    }


    await Song.updateOne({
        _id : id
    },dataSong);




    res.redirect(`back`);
}