const moongoose = require("mongoose");
// const multer = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const optionSchema = new moongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// let storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, path.join(__dirname, '..', AVATAR_PATH));
//     },
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;

const Option = moongoose.model("Option", optionSchema);

module.exports = Option;
