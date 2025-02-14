import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { retrieveTokenFromLocalStorage } from "../Components/ProtectedRoutes";

const Post = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [postData, setPostData] = useState([]);

  // Fetch all posts
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/api/v1/posts");
  //       if (!response.ok) throw new Error("Failed to fetch posts");
  //       const data = await response.json();
        
  //       setPostData(data);
  //     } catch (err) {
  //       console.error("Error fetching posts:", err.message);
  //       setError(err.message);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    
// if ( accessToken) {
//   const userId= retrieveTokenFromLocalStorage("accessToken")
//   console.log(userId);
  
//   return
  
// }
    
    // Retrieve access token from local storage
  const accessToken = retrieveTokenFromLocalStorage("accessToken");

   // Check if accessToken exists
   if (!accessToken) {
    setError("User is not authenticated. Please log in.");
    setLoading(false);
    return;
  }
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("image", formData.file);

    try {
      const response = await fetch("https://comment-eta-bay.vercel.app/api/v1/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create post");
      }
      
      
      const newPost = await response.json();
    
      setPostData((prev) => [newPost.data, ...prev]); // Use `newPost.data` to match the backend structure
      console.log("Updated Post Data State:", postData);
      console.log("post ",newPost);
      

      setSuccess("Post created successfully!");
      setFormData({ title: "", content: "", file: null});
      e.target.reset();
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle like functionality
  const likePost = async (postId) => {
    const accessToken = retrieveTokenFromLocalStorage("accessToken");
    // console.log("Frontend - userId:", userId);
    console.log("Frontend - postId:", postId);
    // if (!userId) {
    //   setError("User authentication failed. Please log in.");
    //   return;
    // }
    // const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("https://comment-eta-bay.vercel.app/api/v1/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({  postId }),

      });
     

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to toggle like");
      }

      const updatedPost = await response.json();
      setPostData((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, isLiked: updatedPost.isLiked, likedCount: updatedPost.likeCount }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err.message);
      setError("Unable to toggle like.");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-md"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="input input-bordered input-primary w-full"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter post content"
          className="textarea textarea-bordered textarea-primary w-full"
          rows="4"
          required
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="file-input file-input-bordered file-input-primary w-full"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {postData.map((post) => (
          <div key={post._id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.content}</p>
              <button
  onClick={() => likePost(post._id)}
  className={`btn ${post.isLiked ? "btn-error" : "btn-outline"}`}
>
  <AiOutlineLike />
  {post.likedCount ?? 0} Likes
</button>

            </div>
            {post.imageUrl && (
              <figure>
                <img src={post.imageUrl} alt={post.title} />
              </figure>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
