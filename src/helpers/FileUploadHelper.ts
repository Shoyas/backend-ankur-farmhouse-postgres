import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';

// cloudinary.config({
//   cloud_name: config.cloudinary.cloudName,
//   api_key: config.cloudinary.apiKey,
//   api_secret: config.cloudinary.apiSecret,
// });

cloudinary.config({
  cloud_name: 'dpzjbug8g',
  api_key: '997215418895937',
  api_secret: 'cGsWNg6eP-l4CSq1S05TAFwL1BA',
});

/*
const params: CloudinaryParams = {
  folder: 'uploads/',
  unique_filename: true,
  allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'webp'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: params,
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|png|jpeg|gif|pdf|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        `Error: This File Upload supports only the following types - ${filetypes}`
      )
    );
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const destroyToCloudinary = async (
  secureUrl: string
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    const parts = secureUrl.split('/');
    const public_id = parts[parts.length - 1].split('.')[0];
    cloudinary.uploader.destroy(
      public_id,
      (error: Error, result: ICloudinaryResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const replaceImage = async (
  existingSecureUrl: string,
  newFile: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  try {
    await destroyToCloudinary(existingSecureUrl);
    return await uploadToCloudinary(newFile);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Image Upload Failed');
  }
};

export const FileUploadHelper = {
  upload,
  uploadToCloudinary,
  destroyToCloudinary,
  replaceImage,
};
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
