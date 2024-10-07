import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "user/:id",
      element: <UserPage />
    }
  ]
}])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
