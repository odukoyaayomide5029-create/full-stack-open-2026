const dummy = (blogs) => {
  return 1
}




const totalLikes =(blog)=>{
return  blog.reduce((sum,blog)=>{
  return sum+ blog.likes
  },0)
}

const favoriteBlog=(blogs)=>{
return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])
}

const mostBlogs=(blogs)=>{
 const counts= blogs.reduce((acc, blog) => {
   acc[blog.author]= (acc[blog.author] || 0) + 1
  return acc
  }, {})
   const topAuthor = Object.keys(counts).reduce((top, author) => {
    return counts[author] > counts[top] ? author : top
  })

  return {
    author: topAuthor,
    blogs: counts[topAuthor]
  }
}

const mostLikes=(blogs)=>{
const counts = blogs.reduce((acc,blog)=>{
acc[blog.author]= (acc[blog.author]||0) + blog.likes
return acc
},{}
)
const author = Object.keys(counts).reduce((acc,top)=>{
return counts[acc]>counts[top]?acc:top
})
return {author:author,likes:counts[author]}
}

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}