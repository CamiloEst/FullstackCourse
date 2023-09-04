import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'

const StyledThead = styled.thead`
  color: white;
  background-color: #1d1b31;
  font-size: 21px;

  & th {
    padding: 0.7rem 2.5rem;
  }
`

const StyledTr = styled.tr`
  background-color: #b0b4bf;
`
const StyledTd = styled.td`
  padding: 0.5rem 9rem 0.5rem 1rem;
  font-size: 19px;

  &.number {
    padding-left: 8rem;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  return (
    <>
      <h1>Users list</h1>
      <table>
        <StyledThead>
          <tr>
            <th>Username</th>
            <th>Created blogs</th>
          </tr>
        </StyledThead>
        {users
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map((user) => (
            <tbody key={user.id}>
              <StyledTr>
                <StyledTd>
                  <StyledLink to={`/users/${user.id}`}>
                    {user.username}
                  </StyledLink>
                </StyledTd>
                <StyledTd className="number">{user.blogs.length}</StyledTd>
              </StyledTr>
            </tbody>
          ))}
      </table>
    </>
  )
}

export default Users
