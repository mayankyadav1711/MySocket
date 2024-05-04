// This is a middleware for handling multipart/form-data, which is primarily used for uploading files. It allows you to handle files in the request object
import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,  // Limit file size to 5MB
  },
});

// This middleware function is configured to handle a single file upload with the field name "avatar". It's used for routes where you expect only one file to be uploaded, such as user profile picture uploads
const singleAvatar = multerUpload.single("avatar");


// This middleware function is configured to handle multiple file uploads with the field name "files", allowing up to 5 files to be uploaded simultaneously. It's used for routes where you expect multiple files to be uploaded, such as attachments in a chat application
const attachmentsMulter = multerUpload.array("files", 5);

export { singleAvatar, attachmentsMulter };
