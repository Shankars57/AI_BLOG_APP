import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { BlogContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const CommentTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const { axios } = useContext(BlogContext);
  const BlogDate = new Date(createdAt);
  const handleApproved = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve_comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteComment = async () => {
    const confirm = window.confirm("Are your sure?");

    try {
      if (!confirm) return;
      const { data } = await axios.post("/api/admin/delete_comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        {/* <b className="font-medium text-gray-600">Blog</b> : {blog.blog.title} */}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment </b> :{" "}
        {comment.content}
      </td>
      <td className="px-6 max-sm:hidden py-4">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4 ">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              onClick={handleApproved}
              className="w-5 hover:scale-110 transition-all cursor-pointer  "
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt=""
            onClick={deleteComment}
            className="w-5 hover:scale-105 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
