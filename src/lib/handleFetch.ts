export const handleFetch = async ({
    url,
    method,
    body,
}: {
    url: string;
    method: string;
    body?: BodyInit | Record<string, any>;
}) => {
    // Get token (if any) before fetching the data
    const token = localStorage.getItem("ACCESS_TOKEN");

    const isFormData = body instanceof FormData;

    // Reusable fetch options object with conditional keys depending on request type
    const fetchOptions: RequestInit = {
        method,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(body && !isFormData && { "Content-Type": "application/json" }),
        },
        ...(body && {
            body: isFormData ? body : JSON.stringify(body),
        }),
    };

    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}${url}`,
            fetchOptions
        );

        if (response.status === 204) return;

        // If the response status is 401, logout the unauthenticated user
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER");

            // Redirect the user to the login page
            location.replace("/login");
        }

        // If everything is OK, return the received data
        const data = await response.json();

        // In case there's an error, display the message received
        // in the API response, or fallback to a standardized error message
        if (response.ok) return data;

        console.error("Response not OK", response);
    } catch (error) {
        console.error("Fetch Error", error);
    }
};
