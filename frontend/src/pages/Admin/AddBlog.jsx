import React, { useContext, useMemo, useState, useEffect } from "react";
import { assets, blogCategories } from "../../assets/assets";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BlogContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AddBlog = () => {
  const { axios } = useContext(BlogContext);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState("Startup");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- ReactQuill toolbar + formats --------- */
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  /* -------------- Helpers --------------- */
  // revoke the object URL when thumbnail changes to avoid memory leaks
  useEffect(() => {
    if (!image) return;
    const src = URL.createObjectURL(image);
    return () => URL.revokeObjectURL(src);
  }, [image]);

  /* -------------- Submit --------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);

      const sendingData = {
        title,
        subTitle,
        isPublished,
        category,
        description,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(sendingData));
      if (image) formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        // reset form
        setImage(null);
        setTitle("");
        setSubTitle("");
        setDescription("");
        setCategory("Startup");
        setIsPublished(false);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  const generatedByAI = async () => {
    
    if (title.trim()) {
         setDescription("")
      try {
        setLoading(true);
        const { data } = await axios.post("/api/blog/ai", { prompt: title });
        if (data.success) {
          setDescription(data.content);
        } else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else toast.error("Please enter your title first");
  };

  /* -------------- Render --------------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 h-full overflow-y-auto bg-blue-50/50 text-gray-600"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Thumbnail uploader */}
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="thumbnail upload"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>

        {/* Title */}
        <p className="mt-4">Blog Title</p>
        <input
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 rounded outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Sub‑title */}
        <p className="mt-4">Blog Sub‑Title</p>
        <input
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 rounded outline-none"
          type="text"
          placeholder="Sub‑Title"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          required
        />

        {/* Description */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-72 pb-14 pt-2 relative">
          <ReactQuill
            theme="snow"
            placeholder="Write your post here…"
            value={description}
            onChange={setDescription}
            modules={quillModules}
            formats={quillFormats}
            className="h-56"
          />
          {loading && (
            <div className="absolute  right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-col/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            type="button"
            onClick={generatedByAI}
            disabled={loading}
            className="absolute  cursor-pointer   right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog Category</p>
        <select
          className="mt-2 px-3 py-2 border border-gray-300 rounded outline-none text-gray-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {blogCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish toggle */}
        <div className="flex items-center gap-2 mt-4">
          <label htmlFor="publish" className="cursor-pointer">
            Publish Now
          </label>
          <input
            id="publish"
            type="checkbox"
            className="scale-125 cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary cursor-pointer text-white rounded text-sm disabled:opacity-70"
        >
          {isAdding ? "Adding…" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
