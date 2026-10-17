import { useState } from "react";
import blogService from '../services/blogs'

import { useNavigate } from 'react-router-dom'

export const BlogForm = ({setErrorMsg,errormsg,blogs,setBlogs,setSuccessMsg}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
const navigate=useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
     if (!title.trim() || !author.trim()) {
      setErrorMsg("title and url are required");
       setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
      return;
    }
    try{
   const newBlog= await blogService.create({ title, author, url });
   setBlogs(blogs.concat(newBlog))
   setSuccessMsg(`${newBlog.title} successfully created`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 3000)
    setTitle("");
    setAuthor("");
    setUrl("");
    navigate('/')
  
  }
    catch(err){
    setErrorMsg(err.response?.data?.error || "could not create blog");
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  
  }

  return (
    <div>
      {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

