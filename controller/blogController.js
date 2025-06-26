
const Auth = require("../models/authModel");
const Blog = require("../models/blogModel");


// to create a blog
const handleBlogCreatetion = async (req, res) => {
    try {
        const { blogTitle, blogDescription, blogContent, blogImageUrl, blogVideoUrl, authorId } = req.body;

        const user = await Auth.findById(authorId);
        if (!user) {
            res.status(401).json({ message: "User not found" });
        }

        const createBlog = new Blog({
            blogTitle,
            blogDescription,
            blogContent,
            blogImageUrl,
            blogVideoUrl,
            authorId
        });
        await createBlog.save();


        res.status(201).json({
            message: "You just created a new blog post",
            createBlog
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all blog post
const handleGetAllBlogPost = async (req, res) => {
    
try {
    
    const blogPosts = await Blog.find();
    if (!blogPosts) {
        res.status(401).json({ message: "No blog post found" });
    }


    res.status(200).json({
        message: "Blogs found",
        blogPosts
    });

} catch (error) {
    res.status(500).json({message: error.message})
}

};

// get a blog post
const handleGetBlogPostById = async (req, res) => {
  try {
    
      const { blogPostId } = req.params.id;

      const blogPost = await Blog.findById(blogPostId);
      if (!blogPost) {
          res.status(404).json({ message: "No blog post found" });
      }

      res.status(200).json({
          message: "Blog post found",
          blogPost
      })
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }  

};

// edit a blog post
const handleEditBlogPost = async (req, res) => {
try {
    const edit = req.body

    const editedBlogPost = await Blog.findByIdAndUpdate(req.blog.id, edit, { new: true });
    await editedBlogPost.save();

    if (editedBlogPost) {
        res.status(201).json({
            message: "Blog post edited successfully",
            editedBlogPost
        });
    }

} catch (error) {
    res.status(500).json({ message: error.message });
}    

};


// delete a blog post
const handleDeleteBlogPost = async (req, res) => {
  try {
      const deleteBlogPost = req.params.id;

      const deletedBlogPost = await Blog.findByIdAndDelete(req.blog.id, deleteBlogPost);

      if (deletedBlogPost) {
          
      res.status(200).json({ message: " Blog post deleted" });
      }

  } catch (error) {
      res.status(500).json({ message: error.message });
  }  

};



// get all authors
const handleGetAllAuthors = async (req, res) => {
try {
    const { authorId } = req.body
    
    const authors = await Blog.find(authorId);
    if (!authors) {
        res.status(404).json({ message: "No author found" });
    }

    res.status(200).json({
        message: "Authors found",
        authors
    })


} catch (error) {
    res.status(500).json({ message: error.message });
}

}


module.exports = { handleBlogCreatetion, handleGetAllBlogPost, handleGetBlogPostById, handleEditBlogPost, handleDeleteBlogPost, handleGetAllAuthors };