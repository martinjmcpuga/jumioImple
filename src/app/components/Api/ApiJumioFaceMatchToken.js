export const ApiJumioFaceMatchToken = async(cpv) => {
    const url = process.env.NEXT_PUBLIC_JUMIO_FACEMATCH;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "cpv": cpv
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error in ApiJumioFaceMatchToken:', err);
        throw err;
    }
}