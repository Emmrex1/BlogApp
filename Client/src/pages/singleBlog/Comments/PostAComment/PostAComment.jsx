import { useFetchBlogByIdQuery } from '@/redux/features/blogs/BlogApi';
import { usePostCommentMutation } from '@/redux/features/comments/commentApi';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PostAComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const {user} = useSelector((state) => state.auth) 
const navigate = useNavigate();
// console.log(user)
 const [postComment] = usePostCommentMutation();
 const { data: blog, refetch } = useFetchBlogByIdQuery(id, { skip: !id });

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!user) {
     toast.error("Please login to comment on this post");
     navigate("/login");
     return;
   }

   setIsLoading(true);
   const newComment = {
     comment,
     user: user?._id,
     postId: id,
   };

   try {
     const response = await postComment(newComment).unwrap();
     console.log("Comment response:", response);
     toast.success("Comment posted successfully");
     setComment("");
     refetch(); 
   } catch (error) {
     console.error("Comment post error:", error);
     toast.error("An error occurred while posting comment");
   }
 };


  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-8">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Share your opinion about this post..."
          className="w-full bg-bgPrimary focus:outline-none p-5"
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white font-medium py-3 rounded-md mt-4 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-indigo-500"
          }`}
        >
          {isLoading ? "Posting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostAComment;
