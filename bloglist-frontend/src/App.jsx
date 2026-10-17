import { Routes, Route, Link,Navigate,useMatch,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 
'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import {LoginForm} from './components/login'
import {BlogForm} from './components/createBlog'
import {Togglable} from './components/toggable'
import {BlogDisplay} from './components/blogdisplay'





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errormsg,setErrorMsg]= useState(null)
  const [successMsg,setSuccessMsg]= useState(false)
  const match = useMatch('/blogs/:id')
   
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null


  
   useEffect(() => {
    let loggeduser= JSON.parse(localStorage.getItem('users'))|| null
    if(loggeduser){
      setUser(loggeduser)
      blogService.setToken(loggeduser.token)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
}}, [])
 const navigate = useNavigate() 
const handleLike = async (blog) => {
  if (!user) {
    navigate('/login')   
    return
  }
  const updatedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const returned = await blogService.update(blog.id, updatedBlog)
  setBlogs(blogs.map(b => b.id === blog.id ? returned : b))
}
  

  ;
 
    const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try{
    const user =await loginService.login({ username, password })
    localStorage.setItem('users',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>setBlogs( blogs ))
      setUsername('')
      setPassword('')
      setSuccessMsg(`welcome ${user.username}`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    
    }
    catch {
      setErrorMsg('wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
   
  }
  const logout=()=>{
localStorage.clear()
setUser(null)
  }

 return (
  <div>
    <nav style={{ padding: 8 }}>
      <Link to="/" style={{ marginRight: 8 }}>blogs</Link>
        <Link to="/create"  style={{ marginRight: 8 }}>New Blog</Link> 
      {user ? (
        <>
          
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link to="/login">login</Link>
      )}
    
    </nav>

    {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <h2>Log in to application</h2>
              <LoginForm
                username={username}
                password={password}
                changeUser={({ target }) => setUsername(target.value)}
                changePassword={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
                errormsg={errormsg}
              />
            </>
          )
        }
      />

      <Route
        path="/"
        element={
          user ? (
            <>
              

              <h2>blogs</h2>
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}><Blog
                    
                    blog={blog}
                  /></Link>  
                ))}
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
     <Route
  path="/blogs/:id"
  element={
    user ? (
      <BlogDisplay
        blog={blog}
        blogs={blogs}
        handleLike={handleLike}
        setBlogs={setBlogs}
        user={user}
      />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route path="/create" element={
  user?(
  
                <BlogForm
                  setErrorMsg={setErrorMsg}
                  errormsg={errormsg}
                  blogs={blogs}
                  setSuccessMsg={setSuccessMsg}
                  setBlogs={setBlogs}
                />
              
  ):<Navigate to="/login" replace />
}/>
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </div>
)
}

export default App