import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/BlogApi";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  return (
    <div className="space-y-5">
      {isLoading && <p className="text-gray-500">Fetching related blogs...</p>}

      {error && (
        <p className="text-red-500 text-sm">Unable to load related blogs.</p>
      )}

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50 transition"
          >
            <div className="min-w-14 w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-400">
              <img
                src={blog.coverImg}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-blue-600 line-clamp-1">
                {blog.title.length > 50
                  ? `${blog.title.substring(0, 50)}...`
                  : blog.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.description?.length > 60
                  ? `${blog.description.substring(0, 60)}...`
                  : blog.description}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-sm text-gray-500">No related blogs found!</div>
      )}
    </div>
  );
};

export default RelatedBlogs;
