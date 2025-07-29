// Assets

// Hooks & utilities
import { useHandleLogin } from "../../api/login";
import { toast } from "sonner";
import { useAuth } from "../../providers/auth-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/admin");
            return;
        }
    }, [currentUser]);

    const loginMutation = useHandleLogin();

    const handleSubmit = async (formEvent) => {
        formEvent.preventDefault();
        const formData = new FormData(formEvent.target);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            loginMutation.mutate({ username, password });
            toast.success("Success!");
        } catch (error) {
            console.log(error);
            toast.error("Errored!");
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 flex flex-col gap-[30px]">
                        <p className="text-3xl font-semibold text-center text-neutral-100">
                            Admin Login
                        </p>
                        <form
                            className="flex flex-col gap-[20px]"
                            onSubmit={handleSubmit}
                        >
                            <input
                                name="username"
                                className="input"
                                placeholder="John"
                            />
                            <input
                                name="password"
                                className="input"
                                placeholder="*******"
                                type="password"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary text-xl font-semibold"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
