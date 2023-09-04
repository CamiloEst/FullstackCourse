import { useRef } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'

import { getAll as getBlogs } from '../services/blogs'
import { getAll as getUsers } from '../services/users'

import Blog from './Blog'
import User from './User'
import Users from './UserList'

import { useUserDispatch, useUserValue } from '../context/UserContext'
import SideBar from './SideBar'

import styled from 'styled-components'
import BlogsPage from './BlogsPage'

const StyledDiv = styled.main`
  position: absolute;
  height: 100vh;
  width: 75%;
  left: 25%;
`

const MainPage = () => {
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const dispatch = useUserDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()
  const user = useUserValue()

  const [blogs, users] = useQueries({
    queries: [
      {
        queryKey: ['blogs'],
        queryFn: getBlogs,
      },
      {
        queryKey: ['users'],
        queryFn: getUsers,
      },
    ],
  })

  if (blogs.isLoading | users.isLoading) {
    return <p>Loading...</p>
  } else if (blogs.error | users.error) {
    return <p>Error</p>
  }

  const logout = (event) => {
    event.preventDefault()
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const userMatch = matchUser
    ? users.data.find((u) => u.id === matchUser.params.id)
    : null

  const blogMatch = matchBlog
    ? blogs.data.find((b) => b.id === matchBlog.params.id)
    : null

  return (
    <>
      <SideBar user={user} handelLogout={logout} />
      <StyledDiv>
        <Routes>
          <Route path="/users/:id" element={<User user={userMatch} />} />
          <Route path="/blogs/:id" element={<Blog blog={blogMatch} />} />
          <Route path="/users" Component={Users} />
          <Route
            path="*"
            element={<BlogsPage blogFormRef={blogFormRef} blogs={blogs.data} />}
          />
        </Routes>
      </StyledDiv>
    </>
  )
}

export default MainPage
