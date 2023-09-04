import Input from './Input'
import { forwardRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotication } from '../context/NotificationContext'
import { postBlog } from '../services/blogs'
import styled from 'styled-components'

const StyledSection = styled.section`
  padding-right: 65%;
`

const StyledButton = styled.button`
  background-color: #11101d;
  font-size: 17px;
  color: white;
  border-style: solid;
  transition: all 0.3s linear;
  cursor: pointer;
  padding: 0.4rem 1.6rem;
  border-radius: 11px;

  &:hover {
    color: #11101d;
    border-radius: 11px;
    background-color: white;
  }
`
const BlogForm = forwardRef((props, refs) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notifySucces, notifyError] = useNotication()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: postBlog,
    refetchOnWindowFocus: false,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      queryClient.invalidateQueries('users')
      notifySucces(`The blog ${newBlog.title} by ${newBlog.author} added`, 5)
    },
    onError: (error) => {
      if (error.response.status === 400) {
        notifyError('Title and url must be provided', 5)
      } else {
        notifyError(error.response.data.error, 5)
      }
    },
  })

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
    newBlogMutation.mutate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    refs.current.toggleVisibility()
  }

  return (
    <StyledSection>
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

        <StyledButton type="submit">Save</StyledButton>
      </form>
    </StyledSection>
  )
})

BlogForm.displayName = 'BlogForm'
export default BlogForm
