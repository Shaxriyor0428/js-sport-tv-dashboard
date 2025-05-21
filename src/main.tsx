import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        <ToastContainer position="top-right" className="right-[52px] top-7" />
        </BrowserRouter>
    </QueryClientProvider>
)
