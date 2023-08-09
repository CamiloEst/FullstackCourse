import Input from './Input'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChangeTitle = ({ target }) => {
    setTitle(target.value)
  }
  const handleChangeAuthor = ({ target }) => {
    setAuthor(target.value)
  }
  const handleChangeUrl = ({ target }) => {
    setUrl(target.value)
  }

  const saveBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>Create new Blog</h1>
      <form onSubmit={saveBlog}>
        <Input
          id="title"
          text="Title"
          placeholder="Blog title"
          value={title}
          changeHandler={handleChangeTitle}
        />
        <Input
          id="author"
          text="Author"
          value={author}
          placeholder="Blog author"
          changeHandler={handleChangeAuthor}
        />
        <Input
          id="url"
          text="Url"
          placeholder="Blog url"
          value={url}
          changeHandler={handleChangeUrl}
        />

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
