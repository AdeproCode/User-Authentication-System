

const express = require("express");
const authMiddleware = require("../middlewares");
const { handleBlogCreatetion, handleGetAllBlogPost, handleGetBlogPostById, handleEditBlogPost, handleDeleteBlogPost, handleGetAllAuthors } = require("../controller/blogController");

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management API
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of all blog posts
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogTitle
 *               - blogContent
 *             properties:
 *               blogTitle:
 *                 type: string
 *               blogDescription:
 *                 type: string
 *               blogContent:
 *                 type: string
 *               blogImageUrl:
 *                 type: string
 *               blogVideoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post found
 *       404:
 *         description: Blog post not found
 */

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogTitle:
 *                 type: string
 *               blogDescription:
 *                 type: string
 *               blogContent:
 *                 type: string
 *               blogImageUrl:
 *                 type: string
 *               blogVideoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /blogs/authors:
 *   get:
 *     summary: Get all unique blog post authors
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 authors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: No authors found
 */



// user can register
router.post("/blog/post", authMiddleware, handleBlogCreatetion);

router.get("/blog/posts", authMiddleware, handleGetAllBlogPost);

router.get("/blog/post/:id", authMiddleware, handleGetBlogPostById);

router.put("/blog/edit-post/:id", authMiddleware, handleEditBlogPost);

router.delete("/blog/delete/:id", authMiddleware, handleDeleteBlogPost);


router.get("/blog/authors", authMiddleware, handleGetAllAuthors);


module.exports = router;