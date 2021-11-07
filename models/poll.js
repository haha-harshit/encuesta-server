const moongoose = require("mongoose");
// const multer = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const pollSchema = new moongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },

        options: [
            {
                type: moongoose.Schema.Types.ObjectId,
                ref: "Option",
            },
        ],
        owner: {
            type: moongoose.Schema.Types.ObjectId,
            ref: "User",
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

const Poll = moongoose.model("Poll", pollSchema);

module.exports = Poll;
