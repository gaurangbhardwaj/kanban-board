export const getTickets = async () => {
    try {
        const response = await fetch(
            `https://api.quicksell.co/v1/internal/frontend-assignment`,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Unable to get data");
        throw error;
    }
};
