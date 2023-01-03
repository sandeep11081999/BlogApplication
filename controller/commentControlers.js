const commentSchema = require("../model/commentSchema")

const registerComment = async(req , res)=>{
    const comment = new commentSchema(req.body)
    try{
     const commentData = await comment.save()
     res.status(201).json({
        "success": true,
        message:"Add Comment Successfully",
        commentData
     })
    }catch(err){
        res.status(500).send({
            "success": false,
            message:err.message
          })
    }
}




module.exports ={
    registerComment
}