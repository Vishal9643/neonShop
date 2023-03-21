import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const uploadImage = ({
  buffer,
  width = 500,
  crop = "scale",
  format = "webp",
  folder = "neonsignco/img",
}) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("cloudinary auth ", process.env.CLOUDINARY_CLOUD_NAME);
      cloudinary.config({
        cloud_name: "nneon",
        api_key: "133115595328568",
        api_secret: "RY6UZTQ_NmwQsEiYWeBsrErXB3c",
      });

      const stream = cloudinary.uploader.upload_stream(
        { folder, width, crop, format },
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );

      // buffer to readable stream
      streamifier.createReadStream(buffer).pipe(stream);
    } catch (error) {
      console.log("This is an error ", error);
      return reject(error);
    }
  });

export default uploadImage;
