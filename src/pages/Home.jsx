import React, { useEffect, useState } from "react";
import { retrieveTokenFromLocalStorage } from "../Components/ProtectedRoutes";
import { AiOutlineLike } from "react-icons/ai";

const Home = () => {
  const [postData, setPostData] = useState([]); // Initialize as an array
  const [error, setError] = useState(null);

  const [currentpage ,setCurentPage]=useState(1)
  const postPerPage=6
  const [showInput, setShowInput] = useState(null); // Stores the ID of the post being commented on
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  
  });

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = retrieveTokenFromLocalStorage("accessToken");
        const response = await fetch(
          "https://comment-eta-bay.vercel.app/api/v1/all ",
          {
            method: "GET",
            
            headers: {
       
              // "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              
            },
            mode: 'cors',
            credentials: "include", // Ensures cookies are sent
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Posts:", data);
        setPostData(data)
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
  
    fetchPosts();
  }, []);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }
  ));
  };

  // Handle comment submission
  const handleComment = async (postId) => {
    const accessToken = retrieveTokenFromLocalStorage("accessToken");

    if (!accessToken) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("image", formData.file);
   

    try {
      const response = await fetch(`https://comment-eta-bay.vercel.app/api/v1/post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      });

      if (!response.ok) throw new Error("Failed to submit comment");
      const result = await response.json();
      console.log("Comment submitted successfully:", result);

      // Reset form and hide input
      setFormData({ title: "", content: "", file: null });
      setShowInput(null);
    } catch (err) {
      console.error("Error submitting comment:", err.message);
      setError(err.message);
    }
  };
  const handleDelete = async (postId) => {
    const accessToken = retrieveTokenFromLocalStorage("accessToken");
  
    if (!accessToken) {
      setError("User is not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`https://comment-eta-bay.vercel.app/api/v1/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete post");
      const result = await response.json();
      console.log("Post deleted successfully:", result);
  
      // Remove the deleted post from the state
      setPostData((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err.message);
      setError(err.message);
    }
  };
  

  const likePost = async (postId) => {
    const accessToken = retrieveTokenFromLocalStorage("accessToken");
    try {
      const response = await fetch("https://comment-eta-bay.vercel.app/api/v1/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ postId }),
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
  

    const totalpages=Math.ceil(postData.length / postPerPage)
    const startIndex=(currentpage-1)*postPerPage
    const endIndex=startIndex+postPerPage
    const currentPosts=postData.slice(startIndex,endIndex)

    const handleNextPage=()=> setCurentPage((prev)=>Math.min(prev+1,totalpages))
    const handlePrevpage=()=>setCurentPage((prev)=>Math.max(prev-1,1))
    


  return (
  
    <div className="container mx-auto p-4">
      <img src="./src/assets/image-png.jpg" alt="Blog" width={1500} />
      {error && <p className="text-red-500">Error: {error}</p>}
      {postData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    // width={300}
                    className="rounded-xl"
                  />
                )}
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.content}</p>
                        <button 
                onClick={() => likePost(post._id)}
                className={`btn ${post.isLiked ? "btn-error" : "btn-outline"}`}
              >
             
                <AiOutlineLike />
                {post.likedCount ??  0} Likes 
              </button>
                <div className="card-actions">
                  <button
                    className="btn btn-Netural"
                    onClick={() =>
                      setShowInput((prev) => (prev === post._id ? null : post._id))
                    }
                  >
                    {showInput === post._id ? "Cancel" : "Add Comment"}
                  </button>

                  {/* Modal for adding a comment */}
                  {showInput === post._id && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Add a Comment</h3>
                        <input
                          type="text"
                          name="title"
                          placeholder="Enter title"
                          value={formData.title}
                          onChange={handleChange}
                          className="input input-bordered w-full mb-2"
                        />
                        <textarea
                          name="content"
                          placeholder="Enter content"
                          value={formData.content}
                          onChange={handleChange}
                          className="textarea textarea-bordered w-full mb-2"
                        />
                        <input
                          type="file"
                          name="file"
                          onChange={handleChange}
                          className="input input-bordered w-full mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleComment(post._id)}
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-neutral"
                            onClick={() => setShowInput(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
              <button className="btn btn-error" onClick={()=> handleDelete(post._id)}>Delete</button>
                </div>
              </div>
              
            </div>
            

          ))
          }
          {/* pagniation */}
          <div className="join  grid grid-cols-2 " >
  <button className="join-item btn btn-outline" onClick={handlePrevpage} disabled={currentpage===1 }>Previous page</button>

  <button className="join-item btn btn-outline" onClick={handleNextPage} disabled={currentpage===totalpages}>Next</button>
</div>
        </div>
        
      ) : (
        !error && <p className="flex justify-center"><span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span></p>
      )}

    </div>
  );
};


export default Home;


