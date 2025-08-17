export const JumioAccountCreation = async() => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error in JumioAccountCreation:', err);
        throw err;
    }
}