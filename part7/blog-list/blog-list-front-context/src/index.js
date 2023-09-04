import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App'
import { NotificationContextProvider } from './context/NotificationContext'
import { UserContextProvider } from './context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const GlobalStyle = createGlobalStyle`
 body {
    font-family:  "Roboto", Helvetica Neue, Helvetica, sans-serif;
    background-color: #475373;
    color: #11101d;
    margin: 0;
    padding: 0;
  }
`

const root = createRoot(document.getElementById('root'))

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NotificationContextProvider>
        <UserContextProvider>
          <GlobalStyle />
          <App />
        </UserContextProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
