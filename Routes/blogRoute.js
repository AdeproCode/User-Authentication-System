

const express = require("express");
const authMiddleware = require("../middlewares");
const { handleBlogCreatetion, handleGetAllBlogPost, handleGetBlogPostById, handleEditBlogPost, handleDeleteBlogPost, handleGetAllAuthors } = require("../controller/blogController");




const router = express.Router();



// user can register
router.post("/blog/post", handleBlogCreatetion);

router.get("/blog/posts", authMiddleware, handleGetAllBlogPost);

router.get("/blog/post:id", authMiddleware, handleGetBlogPostById);

router.put("/blog/edit-post", authMiddleware, handleEditBlogPost);

router.delete("/blog/delete:id", authMiddleware, handleDeleteBlogPost);


router.get("/blog/authors", authMiddleware, handleGetAllAuthors);


module.exports = router;