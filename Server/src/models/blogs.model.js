const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
   title: {
          type: String,
          require: true
   }, 
    
         description: String,
         
          content: {
          type: Object,
          require: true
          },

          coverImg:String,
          category: String,
          author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
          },
          rating: Number,
          createdAt: {
            type: Date,
            default: Date.now
          }

})

const Blog = mongoose.model("Blog",BlogSchema);
module.exports = Blog;