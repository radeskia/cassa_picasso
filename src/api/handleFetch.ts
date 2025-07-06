type FetchMethods = "GET" | "POST" | "PUT" | "DELETE";
export const handleFetch = async (
    method: FetchMethods,
    URL: string,
    body?: any
) => {
    // Get access token from local storage
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

    const response = await fetch(URL, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(ACCESS_TOKEN && { Authorization: `Bearer ${ACCESS_TOKEN}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    if (response.status === 401) {
        handleRemoveAuthData();
        location.replace("/login/");

        return null;
    }

    const data = await response.json();

    if (!response.ok || data.error) {
        throw new Error(
            data.message || "Something went wrong while fetching data"
        );
    }

    return data;
};

const handleRemoveAuthData = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER");
};
