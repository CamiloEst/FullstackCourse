import BlogForm from './BlogForm'
import BlogList from './BlogsList'
import Togglable from './Togglable'

import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-right: 5%;
  flex: 1 1 0;
  min-width: 0;

  & h1 {
    font-size: 30px;
  }

  & h2 {
    font-size: 25px;
  }
`

const BlogsPage = ({ blogFormRef, blogs }) => {
  return (
    <StyledSection>
      <h1>Welcome to blogs app</h1>
      <Togglable ref={blogFormRef} buttonLabel="Add blog">
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <h2>Here is the list of created blogs</h2>
      <BlogList blogs={blogs} />
    </StyledSection>
  )
}

export default BlogsPage
