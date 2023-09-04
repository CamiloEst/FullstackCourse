import BlogsList from './BlogsList'

import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-right: 5%;`

const User = ({ user }) => {
  return (
    <StyledSection>
      <h1>Blogs created by: {user.username}</h1>
      <BlogsList blogs={user.blogs} username = {user.username}/>
    </StyledSection>
  )
}
export default User
