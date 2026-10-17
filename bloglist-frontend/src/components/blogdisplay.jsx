import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
export const BlogDisplay =({blog, handleLike,setBlogs,blogs})=>{
   const navigate = useNavigate()
  if (!blog) {
    return <p>Loading...</p>       
  }

const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeFromList = (id) => {
  setBlogs(blogs.filter(b => b.id !== id))
}

 const handleDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try {
      await blogService.remove(blog.id)
      removeFromList(blog.id)
       navigate('/')
    } catch (error) {
      console.log(error.response?.data)
     
    }
  }
  return(
  <div style={blogStyle}>

    <span>{blog.title} {blog.author}</span>
    <p>Likes:{blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
    <p>{blog.user.username}</p>
    <button onClick={()=>{handleDelete()}}>Remove</button>
  </div>
 
  )

}