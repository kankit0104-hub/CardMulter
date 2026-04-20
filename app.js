import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [post, setPost] = useState(null); // Holds the returned data
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !description) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setPost(response.data.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>MERN Image Uploader</h1>
      
      <form onSubmit={handleUpload} className="upload-form">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <textarea 
          placeholder="Enter image description..." 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Card'}
        </button>
      </form>

      <hr />

      {post && (
        <div className="card-tile">
          <img src={post.imageUrl} alt="Uploaded content" />
          <div className="card-body">
            <p className="description">{post.description}</p>
            <small>Uploaded on: {new Date(post.timestamp).toLocaleString()}</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;