import Blog from './Blog'

const Blogs = ({ blogs, putBlog, deleteBlog }) => {
  return (
    <>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} putBlog={putBlog} deleteBlog={deleteBlog} />
      ))}
    </>
  )
}

export default Blogs
