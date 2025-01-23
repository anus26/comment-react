import React, { useEffect, useState } from "react";
import { retrieveTokenFromLocalStorage } from "../Components/ProtectedRoutes";
const Home = () => {
  const [postData, setPostData] = useState([]); // Initialize as an array
  const [error, setError] = useState(null);
  const [comment,setComment]=useState()
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      content: "",
      file: null,
    });
  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/all");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const result = await response.json();

        console.log("Fetched Data:", result); // Debugging output

        // Access the posts inside the `data` property
        if (result.data && Array.isArray(result.data)) {
          setPostData(result.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);
  
  // comment
    // Handle input changes
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    };
  const handlecomment=async()=>{
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
  const response=await fetch(`http://localhost:4000/api/v1/post/:id`,
    {
     method:'put', 
    
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  },
  )
  
  console.log("Comment submitted:", comment);
  setComment(""); // Clear the input
  setShowInput(false); // Optionally hide input after submission
} catch (error) {
  
}



    
  }

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">Error: {error}</p>}
      {postData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postData.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="rounded-xl"
                  />
                )}
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.content}</p>
                <div className="card-actions">
                  <form onSubmit={handlecomment}>
                  {showInput&&(
                            <div className="flex items-center space-x-2">
    {/* <textarea
    className="textarea textarea-success"
    placeholder="Comment"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  /> */}
  <input type="text" placeholder="Type here" value={formData.title} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
  <input type="text" placeholder="Type here" value={formData.content} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
  <input type="file" placeholder="Type here" onChange={handleChange} className="input input-bordered w-full max-w-xs" />
  
                <button
                className="btn btn-primary ml-2"
                onClick={handlecomment}
                >
                Go
              </button>
              </div>
                )}
                </form>
                <button className="btn btn-secondary" onClick={()=>setShowInput(!showInput)}>{showInput ? "Cancel" : "Add Comment"}</button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      ) : (
        !error && <p>Loading posts or no posts available...</p>
      )}
    </div>
  );
};

export default Home;
