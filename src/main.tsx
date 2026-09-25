import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

export let gamesServer: string = "";

async function checkServerStatus() {
    const serverLocation = "http://localhost:8000"

    try {
        const response = await fetch(serverLocation + "/manifest.json");

        if (response.ok) {
            console.log("using " + serverLocation);
            return serverLocation;
        }
    } catch {
        console.log("Server not reachable or lacks manifest.json! Using local files")
    }
    return "";
}

checkServerStatus().then(resp => {
    gamesServer = resp;
    createRoot(document.getElementById('root')!).render(
        <App
        />
    )
})


