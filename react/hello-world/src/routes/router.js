import { createBrowserRouter, Outlet } from "react-router-dom";
import Aboutus from "../components/Aboutus.js";
import App from "../App.js";
import Form from "../components/Form.js";
import Crud from "../components/Crud.js"
import ViewPost from "../components/blog/ViewPost.js";
import CreatePost from "../components/blog/CreatePost.js";
import EditPost from "../components/blog/EditPost.js";
import ListPosts from "../components/blog/ListPost.js";
import Register from "../components/auth/register.js";
import Login from "../components/auth/Login.js"; 


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    // { path: 'form', element:  <Form/>},
    // { path: 'crud', element:  <Crud/>},
    { path: 'blog/posts', element: <ListPosts/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : 'blog/posts/create' , element : <CreatePost/> },
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>}
]);


export default router;