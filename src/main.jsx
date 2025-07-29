import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./providers/auth-context.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </BrowserRouter>
        <Toaster
            theme="dark"
            toastOptions={{
                classNames: {
                    toast: "bg-[#08161b] bg-opacity-80 backdrop-blur border text-[16px]",
                    success: "text-emerald-500 border-emerald-500/70",
                    error: "text-rose-500 border-rose-500/70",
                    info: "text-slate-300 border-[#219ebc70]",
                    loading: "text-slate-300 border-[#219ebc70]",
                },
            }}
        />
    </StrictMode>
);
