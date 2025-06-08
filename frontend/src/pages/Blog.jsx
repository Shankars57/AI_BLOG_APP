import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { BlogContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { axios } = useContext(BlogContext);

  const fetchBlogData = async () => {
    try {
      const dummyData = blog_data.find((item) => item._id === id);
      setData(dummyData);
      const { data } = await axios.get("/api/blog/" + id);
      if (data.success) {
        setData(data.blog);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/add`, {
        blogId: id,
      });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/comments/add`, {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50 "
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM D YYYY")}
        </p>
        <h1
          className="text-2xl 
        sm:text-5xl
         font-semibold
         max-w-2xl
          mx-auto
           text-gray-800"
        >
          {data.title}
        </h1>
        <h2
          className="my-5 max-w-lg truncate mx-auto"
          dangerouslySetInnerHTML={{ __html: data.subTitle }}
        ></h2>
        <p
          className="inline-block
           py-1
            px-4
            rounded-full
             mb-6 border
              text-sm
               card  
        border-primary/35
         bg-primary/5
          font-medium 
          text-primary
        
        "
        >
          Micheal Brown
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/*Comment section*/}

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="mb-5 font-semibold">comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative bg-primary/2 border border-primary/5
                max-w-xl 
                p-4 
                rounded 
                text-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} className="w-6" />
                  </div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm max-w-md ">{item.content}</p>
                  <div
                    className="
                    absolute
                   right-4
                   bottom-3 
                  flex
                   items-center
                    gap-2 
                  text-xs "
                  >
                    {Moment(item.createAt).fromNow()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/*ADD Comment */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-5">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4
          max-w-m"
          >
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full
              p-2 
            mb-4
             border
              border-gray-300
             rounded"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <textarea
              placeholder="Enter your comment"
              className="w-full
               p-2
               border
                border-gray-300
               rounded
                outline-none
                h-48"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary 
              text-white
               rounded
               p-2 px-8
                hover:scale-102 
                transition-all
                 cursor-pointer"
            >
              Post
            </button>
          </form>
        </div>
        {/*Share buttons*/}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 ">
            Share this article on social media.
          </p>
          <div className="flex ">
            <img
              className="cursor-pointer transition-all ease duration-500 hover:-translate-y-2"
              src={assets.facebook_icon}
              width={50}
              alt=""
            />
            <img
              className="cursor-pointer transition-all ease duration-500 hover:-translate-y-2"
              src={assets.twitter_icon}
              width={50}
              alt=""
            />
            <img
              className="cursor-pointer transition-all ease  duration-500 hover:-translate-y-2"
              src={assets.googleplus_icon}
              width={50}
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
