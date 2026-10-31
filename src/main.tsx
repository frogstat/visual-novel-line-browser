import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameNotFound from "./components/GameNotFound.tsx";
import GameView from "./GameView.tsx";
import {loadGame} from "./utils/gameLoader.ts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <GameNotFound/>
    },
    {
        path: '/games/:gameFolder?',
        loader: loadGame,
        element: <GameView/>,
        errorElement: <GameNotFound/>,
        HydrateFallback: () => <div>Loading...</div>
    },
])


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
