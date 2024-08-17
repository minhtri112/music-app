import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const uploadToCloudinary = async (buffer: any, resourceType: string) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (result) {
          resolve(result.url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// upload single image
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  if (req["file"]) {
    try {
      const result = await uploadToCloudinary(req["file"].buffer, 'image');
      req.body.file = result;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  next();
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req["files"]);
  
  for (const key in req["files"]) {
    req.body[key] = [];
    const arrays = req["files"][key];

    for (const item of arrays) {
      try {
        const resourceType = key === 'audio' ? 'video' : 'image';
        const result = await uploadToCloudinary(item.buffer, resourceType);
        req.body[key].push(result);
      } catch (error) {
        console.error(`Error uploading ${key}:`, error);
      }
    }
  }

  next();
};