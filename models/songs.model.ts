import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const songSchema = new mongoose.Schema(
    {
        title : String,
        avatar : String,
        description : String,
        singerId : String,
        topicId : String,
        like : Number,
        lyrics : String,
        audio : String,
        status : String,
        slug : {
            type : String,
            slug : "title",
            unique : true 
        },
        listen : Number,
        deleted : {
            type : Boolean,
            default : false 
        },
        deleteAt : Date,
    },
    {
      timestamps : true,  
    }
);

const Song = mongoose.model("Song",songSchema,"songs");

export default Song;