import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useSuccesNotification } from '../context/NotificationContext'
import { useUserValue } from '../context/UserContext'
import { putBlog, deleteBlog } from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import CommentsList from './CommentsList'
import styled from 'styled-components'
import { ReactComponent as Like } from '../imgs/like.svg'

const BlogSection = styled.section`
  margin-right: 5%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const BlogInfoSection = styled.section`
  background-color: #b0b4bf;
  padding: 3rem 3rem 2rem 3rem;
  border-radius: 18px;
  box-shadow: 1px 1px 5px 1px rgba(17, 16, 29, 0.8);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & h1 {
    padding: 0;
    margin: 0;
    font-size: 2.3rem;
  }

  & p {
    margin: 8px 0px;
    font-size: 1.1rem;
  }
`

const LikeSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 0.3rem;

  & strong {
    font-size: 1rem;
  }
`
const LikeButton = styled.button`
  background-color: #b0b4bf;
  border: none;
  
  & svg {
    width: 25px;
    height: 25px;
    margin-right: 1rem;
    margin: 0;
    fill: #11101d;
  }

  & :hover {
    fill: white;
  }

  & :active {
    fill: #475373;
  }
`

const RemoveButton = styled.button`
  align-self: flex-end;
  background-color: #1d1b31;
  color: white;
  padding: 0.3rem;
  border-style: solid;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover span {
    display: none;
  }

  &:hover {
    border-radius: 5px;
    background-color: #f44336;
    border-color: #d32f2f;
    padding: 0.3rem;
  }

  &:hover:before {
    content: 'Remove blog';
  }

  &:active {
    background-color: #b71c1c;
    border-color: #c62828;
  }
`

const Blog = ({ blog }) => {
  const notifySucces = useSuccesNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const user = useUserValue()

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      notifySucces(
        `The blog ${blog.title} by ${blog.author} has been removed`,
        5
      )
      navigate(-1)
    },
  })

  const modifyMutation = useMutation({
    mutationFn: putBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const increaseLikes = () => {
    const copy = { ...blog, likes: blog.likes + 1 }
    modifyMutation.mutate(copy)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate(blog.id)
    }
  }

  const blogCreatedByUser = blog.user.id === user.id

  return (
    <BlogSection>
      <BlogInfoSection>
        {blogCreatedByUser && (
          <RemoveButton className="remove" onClick={removeBlog}>
            <span>X</span>
          </RemoveButton>
        )}
        <h1>{blog.title}</h1>
        <p>
          <strong>Author: </strong> {blog.author}
        </p>
        <p>
          <strong>Available on: </strong>
          <a href={blog.url} rel="noreferrer" target="_blank">
            {blog.url}
          </a>
        </p>
        <p>
          <strong> Created by: </strong> {blog.user.username}
        </p>
        <LikeSection>
          <strong>{blog.likes}</strong>
          <LikeButton onClick={increaseLikes}>
            <Like />
          </LikeButton>
        </LikeSection>
      </BlogInfoSection>
      <CommentsList comments={blog.comments} blogId={blog.id} />
    </BlogSection>
  )
}

export default Blog
