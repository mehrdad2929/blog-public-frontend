import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Home from './pages/Home'
import PublicAuthor from './pages/PublicAuthor'
import AuthorsList, { loader as authorsListLoader } from './pages/AuthorsList'
import PublicPostDetail, { action as postDetailAction } from './pages/PublicPostDetail'
import Login, { action as loginAction } from './pages/Login'
import Signup, { action as signupAction } from './pages/Signup'
import ErrorPage from './pages/ErrorPage'
import { fetchAuthorPosts, fetchPostDetails, removeToken } from './utils/api'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/authors',
    element: <AuthorsList />,
    loader: authorsListLoader,
  },
  {
    path: '/posts/:id',
    element: <PublicPostDetail />,
    loader: async ({ params }) => {
      return fetchPostDetails(params.id)
    },
    action: postDetailAction,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/signup',
    element: <Signup />,
    action: signupAction,
  },
  {
    path: '/logout',
    action: () => {
      removeToken()
      return redirect('/')
    },
  },
  {
    path: '/:authorname',
    element: <PublicAuthor />,
    loader: async ({ params }) => {
      try {
        return await fetchAuthorPosts(params.authorname)
      } catch (error) {
        if (error.message === 'Author not found') {
          return redirect('/authors')
        }
        throw error
      }
    },
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App