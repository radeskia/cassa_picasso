export const handleFetch = async ({
    url,
    method,
    body,
}: {
    url: any;
    method: any;
    body?: any;
}) => {
    // Get token (if any) before fetching the data
    const token = localStorage.getItem("ACCESS_TOKEN");

    // Reusable fetch options object with conditional keys depending on request type
    const fetchOptions = {
        method: `${method}`,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };
    // Try fetching data, on successful fetching return data, else throw with appropriate message
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}${url}`,
            {
                ...fetchOptions,
            }
        );

        // If there's no content returned, exit function
        if (response.status === 204) return;

        // If the response status is 401, logout the unauthenticated user
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER");

            // Redirect the user to the login page
            location.replace("/login");
        }

        // Parse the received API response data
        const data = await response.json();

        // If everything is OK, return the received data
        if (response.ok) return data;

        // In case there's an error, display the message received
        // in the API response, or fallback to a standardized error message
        if (!response.ok) {
            console.log("Response was not okay!", response);
        }
    } catch (error) {
        console.log(error);
    }
};
