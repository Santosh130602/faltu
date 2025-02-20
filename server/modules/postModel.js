const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        caption: {
            type: String,
            required: true,
        },
        post: {
            type: String,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

