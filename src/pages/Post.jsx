import React, { useState } from 'react';

const Post = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [postData,setPostData]=useState(null)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('image', formData.file);


    try {
      const response = await fetch('http://localhost:4000/api/v1/post', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create post');
      }

      const data = await response.json();
      setSuccess('Post created successfully!');
      setPostData(data)
      console.log('Post successful:', data);
      setFormData({ title: '', content: '', file: null }); // Reset form
    } catch (err) {
      setError(err.message);
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
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
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

    
    {/* Display post data in a card */}
    {postData && (
        <div className="card bg-base-100 w-96 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">{postData.title}</h2>
            <p>{postData.content}</p>
          </div>
          <figure>
            <img
              src={postData.image} // Assuming the server response includes `imageUrl`
              alt={postData.title}
            />
          </figure>
        </div>
      )}
 
    </div>

    
  );
};

export default Post;
