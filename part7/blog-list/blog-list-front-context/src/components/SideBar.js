import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../imgs/blogs-logo.svg'
import { ReactComponent as Users } from '../imgs/users.svg'
import { ReactComponent as Blog } from '../imgs/blog.svg'
import { ReactComponent as User } from '../imgs/user.svg'
import { ReactComponent as Logout } from '../imgs/logout.svg'

const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  width: 20%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: red;
  background-color: #11101d;
  padding-top: 1.5rem;
  box-shadow: 1px 1px 5px 1px rgba(17,16,29,.8);
`
const StyledUl = styled.ul`
  justify-content: flex-start;
  flex-direction: column;
  list-style-type: none;
  align-items: flex-start;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
`
const StyledLi = styled.li`
  margin: 0;
  align-self: stretch;
`
const StyledLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0rem 1rem;
  transition: all 0.5s ease;

  & .logo {
    width: 50px;
    fill: white;
  }

  &:visited {
    color: white;
  }
  &.nav-link {
    padding: 1rem 9rem 1rem 1rem;
  }
  &.nav-link:hover > svg {
    fill: #11101d;
  }

  &.nav-link:hover {
    color: #11101d;
    border-radius: 18px;
    background-color: white;
  }

  & .icon {
    width: 35px;
    height: 35px;
    fill: white;
    margin-right: 1rem;
  }
`
const StyledLogoSection = styled.section`
  display: flex;
  align-self: stretch;
  align-items: center;
  font-size: 18px;
  color: white;
  justify-content: flex-start;
  padding-bottom: 1.7em;
`

const StyledLogOutSection = styled.section`
  background-color: #1d1b31;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem 0rem 3rem 0rem;
  transition: all 0.5s ease;

  & svg {
    width: 45px;
    height: 45px;
    margin-right: 1rem;
    fill: white;
  }

  & .user-info {
    display: flex;
    align-items: center;
  }

  & .user-section {
    display: flex;
    flex-direction: column;
  }

  & .name {
    font-size: 14px;
    font-weight: lighter;
  }

  & button {
    background-color: #1d1b31;
    border: none;
    cursor: pointer
  }

  & button > svg {
    width: 35px;
  }

  & button:hover > svg {
    fill: #11101d;
  }
`

const NavBar = ({ user, handelLogout }) => {
  return (
    <StyledNavbar>
      <section>
        <StyledLogoSection>
          <StyledLink to={'/'}>
            <Logo alt="app logo" className="logo" />
            Blogs app
          </StyledLink>
        </StyledLogoSection>
        <StyledUl>
          <StyledLi>
            <StyledLink className="nav-link" to={'/blogs'}>
              <Blog className="icon" />
              Blogs
            </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink className="nav-link" to={'/users'}>
              <Users className="icon" />
              Users
            </StyledLink>
          </StyledLi>
        </StyledUl>
      </section>
      <StyledLogOutSection>
        <section className="user-info">
          <User />
          <section className="user-section">
            <span className="username">{user.username}</span>
            <span className="name">{user.name}</span>
          </section>
        </section>
        <button onClick={handelLogout}>
          <Logout />
        </button>
      </StyledLogOutSection>
    </StyledNavbar>
  )
}

export default NavBar
