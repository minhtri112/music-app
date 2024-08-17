import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";


//[GET] /songs/:slugTopic
export const list = async (req : Request, res : Response)=>{
    const topic = await Topic.findOne({
        slug : req.params.slugTopic,
        status : "active",
        deleted : false
    });

    const songs = await Song.find({
        topicId : topic.id,
        status : "active",
        deleted : false
    });
    
    for(const song of songs){
        const infoSinger = await Singer.findOne({
            _id : song.singerId,
            status : "active",
            deleted : false
        });

        song["infoSinger"] = infoSinger;
    }


     
    res.render("client/pages/songs/list.pug",{
        pageTitle : topic.title,
        songs : songs
    });
}


//[GET] /songs/detail/:slogSong
export const detail = async (req : Request, res : Response)=>{
    const slugSong : String = req.params.slugSong;

    const song = await Song.findOne({
        slug : slugSong,
        deleted : false,
        status : "active"
    });

    const favoriteSong = await FavoriteSong.findOne({
        songId : song.id,
    });

    song["favoriteSong"] = favoriteSong ? true : false;

    const singer = await Singer.findOne({
        _id : song.singerId,
        deleted : false,
        status : "active"
    }).select("fullName");

    const topic = await Topic.findOne({
        _id : song.topicId,
        deleted : false,
        status : "active"
    }).select("title");




    res.render("client/pages/songs/detail.pug",{
        pageTitle : "Chi tiết bài hát",
        song : song,
        singer : singer,
        topic : topic
    });
}




//[PACTH] /songs/detail/:slogSong
export const like = async (req : Request, res : Response)=>{
    const idSong : string = req.params.idSong;
    const typeLike : string = req.params.typeLike;

    const song = await Song.findOne({
        _id : idSong,
        status : "active",
        deleted : false,
    });

    const newLike : number = typeLike == "like" ? song.like + 1 : song.like - 1;

    await Song.updateOne({
        _id : idSong
    },{
        like : newLike
    });

    res.json({
        code : "200",
        message : "Thành công",
        like : newLike
    })
}


//[PACTH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req : Request, res : Response)=>{
    const idSong : string = req.params.idSong;
    const typeFavorite : string = req.params.typeFavorite;

    if(typeFavorite == "favorite") {
        const exitsFavoriteSong = await FavoriteSong.findOne({
            songId : idSong
        });

        if(!exitsFavoriteSong){
            const record = new FavoriteSong({
                userId : "",
                songId : idSong,
            });

            record.save();
        }
        else{
            const result =  await FavoriteSong.deleteOne({
                songId : idSong
            });
            if(result.deletedCount == 0){
                console.log("Xóa thất bại");
            }
            else{
                console.log("Xóa thành công");
            }
        }
    }

    res.json({
        code : "200",
        message : "Thành công",
    })

}

//[PACTH] /songs/listen/:idSong
export const listen = async (req : Request, res : Response)=>{
    const idSong : string = req.params.songId;

    const song = await Song.findOne({
        _id : idSong,
        status : "active",
        deleted : false, 
    });

    const newListen : number = song.listen ? song.listen + 1 : 1;

    await Song.updateOne({
        _id : idSong
    },{
        listen : newListen
    });

    res.json({
        code : "200",
        message : "Thành công",
        listen : newListen
    })

}