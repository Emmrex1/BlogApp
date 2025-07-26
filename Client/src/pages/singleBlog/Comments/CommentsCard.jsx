
import React, { useState } from "react";
import commentorIcon from "../../../assets/logo/commentIcon.png";
import PostAComment from "./PostAComment/PostAComment";
import { useSelector } from "react-redux";
import { formatDate } from "@/utils/formatedate/FormateDate";

const CommentItem = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="mb-6 border rounded p-4">
      <div className="flex items-start gap-4">
        <img src={commentorIcon} alt="" className="h-10" />
        <div>
          <p className="text-blue-500 font-semibold underline underline-offset-4 capitalize">
            {comment?.user?.username}
          </p>
          <p className="text-[12px] italic">{formatDate(comment.createdAt)}</p>
        </div>
      </div>

      <p className="text-gray-700 mt-3">{comment?.comment}</p>

      <button
        onClick={() => setShowReply(!showReply)}
        className="text-sm text-blue-400 mt-2"
      >
        {showReply ? "Cancel" : "Reply"}
      </button>

      {showReply && (
        <div className="mt-3">
          <PostAComment parentId={comment._id} />
        </div>
      )}

      {/* Nested replies */}
      {comment?.replies?.length > 0 && (
        <div className="mt-4 ml-6 border-l-2 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsCard = ({ comments }) => {
  return (
    <div className="my-6 bg-white p-8 rounded">
      <h3 className="text-lg font-medium mb-6">All Comments</h3>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      <div className="mt-8">
        <PostAComment />
      </div>
    </div>
  );
};

export default CommentsCard;
