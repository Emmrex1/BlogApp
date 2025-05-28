import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../redux/features/blogs/BlogApi";
import CommentsCard from "./Comments/CommentsCard";
import RelatedBlogs from "./relatedBlog/RelatedBlog";
import SingleBlogCard from "../home/blog/singleBlogCard/SingleBlogCard";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);

  return (
    <div className="container mx-auto px-4 mt-12 mb-20 text-gray-900">
      {isLoading && (
        <div className="flex justify-center items-center py-20 text-lg font-medium text-gray-600 animate-pulse">
          Loading blog...
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-600 font-semibold">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      {blog?.post && (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Blog Content */}
          <main className="lg:w-2/3 w-full bg-white rounded-xl shadow-lg p-8">
            <SingleBlogCard blog={blog.post} />
            <section className="mt-14">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                Comments
              </h2>
              <CommentsCard comments={blog?.comments} />{" "}
              {/* ✅ updated to `comments` */}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 w-full bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 self-start">
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-2">
              Related Blogs
            </h3>
            <RelatedBlogs />
          </aside>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
