import { useQueryClient, useMutation } from '@tanstack/react-query'
import { commentBlog } from '../services/blogs'
import { useState } from 'react'
import styled from 'styled-components'

const CommentSection = styled.section`
  background-color: #b0b4bf;
  padding: 2rem 3rem 2rem 3rem;
  border-radius: 18px;
  box-shadow: 1px 1px 5px 1px rgba(17, 16, 29, 0.8);
  font-size: 20px;

  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & li {
    margin: 5px 0px;
  }

  & li:before {
    content: '- ';
  }
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
const StyledInput = styled.input`
  font-size: 17px;
  padding: 0.5rem;
  width: 60%;
  margin-right: 25px;
  border-radius: 11px;
  border: none;
`

const CommentsList = ({ blogId, comments }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: ({ id, content }) => commentBlog(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleComment = () => {
    setComment('')
    commentMutation.mutate({ id: blogId, content: comment })
  }

  return (
    <CommentSection>
      <h3>Comments</h3>
      <div>
        <StyledInput
          value={comment}
          onChange={(event) => {
            setComment(event.target.value)
          }}
          placeholder="Comment"
        />
        <StyledButton onClick={handleComment}>add comment</StyledButton>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </CommentSection>
  )
}

export default CommentsList
