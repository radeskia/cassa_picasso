import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import { useAuth } from "./providers/auth-context";

const queryClient = new QueryClient();
function App() {
    const { currentUser, updateUser } = useAuth();

    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <Layout />
            </QueryClientProvider>
        </main>
    );
}

export default App;
