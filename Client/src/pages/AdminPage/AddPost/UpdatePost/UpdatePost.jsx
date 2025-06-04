import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blogs/BlogApi";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import Header from "@editorjs/header";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const isEditorInitialized = useRef(false);

  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(1);

  const [updateBlog] = useUpdateBlogMutation();
  const { data: blog = {}, error, isLoading } = useFetchBlogByIdQuery(id);
  const { user } = useSelector((state) => state.auth);

  // Populate form fields when data is fetched
  useEffect(() => {
    if (blog?.post) {
      setTitle(blog.post.title);
      setCoverImg(blog.post.coverImg);
      setMetaDescription(blog.post.description);
      setCategory(blog.post.category);
      setRating(blog.post.rating || 1);
    }
  }, [blog?.post]);

  // Initialize EditorJS
  useEffect(() => {
    if (!blog?.post || isEditorInitialized.current) return;

    isEditorInitialized.current = true;

    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: blog.post.content,
      onReady: () => {
        editorRef.current = editor;
      },
      tools: {
        header: { class: Header, inlineToolbar: true },
        list: { class: EditorjsList, inlineToolbar: true },
      },
    });

    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (e) {
          console.warn("Editor cleanup failed", e);
        } finally {
          editorRef.current = null;
        }
      }
    };
  }, [blog?.post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editorRef.current) {
      toast.error("Editor is not ready yet.");
      return;
    }

    try {
      const content = await editorRef.current.save();

      const updatePost = {
        title,
        coverImg,
        content,
        category,
        description: metaDescription,
        author: user?._id,
        rating,
      };

      await updateBlog({ id, ...updatePost }).unwrap();

      toast.success("✅ Post updated successfully!");
      await editorRef.current.clear();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update post", error);
      toast.error("❌ Failed to update post. Try again.");
    }
  };

  if (isLoading) return <p className="p-4 text-center">Loading post...</p>;
  if (error)
    return (
      <p className="p-4 text-center text-red-500">Failed to load blog post.</p>
    );

  return (
    <div className="bg-white p-4 md:p-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">📝 Update Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="font-semibold text-lg">Blog Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Marina del Rey Marriott..."
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 w-full space-y-4">
            <label className="font-semibold text-lg">Content:</label>
            <div
              id="editorjs"
              className="border bg-white rounded-md min-h-[300px] p-4"
            ></div>
            <p className="text-xs text-gray-500 italic">
              Use formatting tools like headings, lists, etc.
            </p>
          </div>

          <div className="md:w-1/3 w-full space-y-6 border p-4 rounded-md bg-gray-50 shadow-sm">
            <div className="space-y-2">
              <label className="font-medium">Blog Cover URL:</label>
              <input
                type="text"
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-2"
                placeholder="https://example.com/blog-cover.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-2"
                placeholder="e.g. Travel, Technology..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Meta Description:</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-2"
                rows="4"
                placeholder="Brief description about your blog post..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Rating (1–5):</label>
              <input
                type="number"
                value={rating}
                min="1"
                max="5"
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white border rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Author:</label>
              <input
                type="text"
                value={user?.username || ""}
                className="w-full bg-gray-200 border rounded-md px-3 py-2"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all font-semibold"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
