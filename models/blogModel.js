
const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    blogTitle: { type: String, required: true },
    blogDescription: { type: String, default: "" },
    blogContent: { type: String, default: "" },
    blogImageUrl: { type: String, default: "" },
    blogVideoUrl: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
},
    { timestamps: true }
);


const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;