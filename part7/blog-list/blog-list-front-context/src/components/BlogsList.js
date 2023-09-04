import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-self: stretch;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  border: 1px solid #11101d;
  border-radius: 9px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 5px 1px rgba(17, 16, 29, 0.8);
  background-color: #b0b4bf;
  color: #11101d;
  transition: all 0.2s ease;

  &:hover {
    background-color: #11101d;
    color: white;
  }
  & h3 {
    padding: 0;
    font-size: 23px;
    margin: 0.5rem 0;
  }

  & .blog-info {
    margin-bottom: 10px;
  }
`
const BlogsList = ({ blogs, username }) => {
  return (
    <StyledSection>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <StyledLink to={`/blogs/${blog.id}`}>
                <h3>{blog.title}</h3>
                <span className="blog-info">
                  <strong>Author: </strong>
                  {blog.author}
                </span>
                <span className="blog-info">
                  <strong>Created by: </strong>
                  {blog.user ? blog.user.username: username}
                </span>
              </StyledLink>
            </li>
          ))}
      </ul>
    </StyledSection>
  )
}

export default BlogsList
