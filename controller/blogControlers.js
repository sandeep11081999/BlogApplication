const blogSchema = require("../model/blogSchema");
const commentSchema = require("../model/commentSchema");

const registerBlog = async (req, res) => {
  const blog = new blogSchema(req.body);
  try {
    const filepath = `/uploads/${req.file.filename}`;
    blog.blog_Pic = filepath;
     await blog.save();
    res.status(201).json({
      "success":true,
      "message": "Blog Add Successfully",
    });
  } catch (err) {
    res.status(500).send({
      "success": false,
      message: err.message,
    });
  }
};

const blogList = async (req, res) => {
  try {
    const list = await blogSchema
      .find({})
      .sort({ createdAt: -1 })
      .populate("user_id", { name: 1, _id: 0 });
    res.status(200).send({
      "success": true,
      "message": "Blog List",
      "list": list,
    });
  } catch (err) {
    res.status(500).send({
      "success": false,
      message: err.message,
    });
  }
};

const blogDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const blogDetail = await blogSchema.findById(id, {
      title: 1,
      discription: 1,
      blog_Pic: 1,
      _id: 0,
    });
    const comment = await commentSchema
      .find({ blog_id: id })
      .sort({ createdAt: -1 })
      .populate("user_id", { name: 1, profile_Pic: 1, createdAt: 1, _id: 0 });
    res.status(200).json({
      "success": true,
      "message": blogDetail,
      "Comment": comment,
    });
  } catch (err) {
    res.status(500).send({
      "success": false,
      message: err.message,
    });
  }
};

const blogDelet = async (req, res) => {
  const id = req.params.id;
  try {
    const delet = await blogSchema.findByIdAndDelete(id);
    res.status(202).json({
      "success": true,
      "message": "Blog Delete Successfully",
    });
  } catch (err) {
    res.status(500).send({
      "success": false,
       message: err.message,
    });
  }
};

const likeBlog = async (req, res) => {
  const { id, likes } = req.params;
  try {
    const blogLike = await blogSchema.findById(id).select("like");
    if (likes === "true") {
      let like = blogLike.like;
      like++;
      const updatLike = await blogSchema.findByIdAndUpdate(
        blogLike.id,
        { $set: { like: like } },
        { new: true }
      );
      res.status(200).send({
        "success": true,
       " message": "Like Update Successfully",
      });
    } else {
      let like = blogLike.like;
      like--;
      const updatLike = await blogSchema.findByIdAndUpdate(
        blogLike.id,
        { $set: { like: like } },
        { new: true }
      );
      res.status(200).send({
        "success": true,
        "message":"disLike Successfully"
      })
    }
  } catch (err) {
    res.status(500).send({
      "success": false,
      message: err.message,
    });
  }
};

const searchBlog =async(req,res)=>{
  const title=req.body.title
   try{
    const query ={title:{$regex:title,$options:"i"}}
    const searchData = await blogSchema.find(query)
    res.status(200).json({
      "success":true,
      "BlogDetails" : searchData
    })
   }catch(err){
    res.status(500).send({
      "success": false,
      message: err.message,
    })
   }
}

module.exports = {
  registerBlog,
  blogDetail,
  blogList,
  blogDelet,
  likeBlog,
  searchBlog
};

