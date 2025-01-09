import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./Components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notfound from "./pages/Notfound.jsx";
import Post from "./pages/Post.jsx";
import Logout from "./pages/Logout.jsx";
import ProtectedRoute from "./Components/ProtectedRoutes.jsx"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "post",
                element: (
                    <ProtectedRoute>
                        <Post />
                    </ProtectedRoute>
                ),
            },
            {
                path: "logout",
                element: (
                    <ProtectedRoute>
                        <Logout />
                    </ProtectedRoute>
                ),
            },
            { path: "*", element: <Notfound /> }, // Catch-all route
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
