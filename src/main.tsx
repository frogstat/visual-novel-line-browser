import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameViewValidator from "./GameViewValidator.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/games/:gameFolder?',
        element: <GameViewValidator/>
    },
])


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
