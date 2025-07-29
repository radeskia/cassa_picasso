import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth-context";
import { useMutation } from "@tanstack/react-query";
import { handleFetch } from "../lib/handleFetch";

export const useHandleLogin = () => {
    const { updateUser } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        onMutate: async (formData) => {
            const res = await handleFetch({
                url: `auth/login`,
                method: "POST",
                body: formData,
            });

            updateUser(JSON.stringify(res.user));
            localStorage.setItem("ACCESS_TOKEN", res.token);
            localStorage.setItem("USER", JSON.stringify(res.user));
            navigate("/admin");
        },
        onError: (e) => e,
    });
};
