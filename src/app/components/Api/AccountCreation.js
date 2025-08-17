export const AccountCreation = async(token) => {
    const url = process.env.NEXT_PUBLIC_API_URL_ACCOUNT;
    const apiKey = token;


    if (!url && !apiKey) {
        throw new Error('API is not defined in the environment variables');
    }


    const bareer = `Bearer ${token}`;



    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bareer
            },
            body: JSON.stringify({
                "userReference": "test",
                "customerInternalReference": "string",
                "reportingCriteria": "string",
                "tokenLifetime": "15m",
                "workflowDefinition": {
                    "key": "10011",
                    "credentials": [{
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "category": "ID",
                        "country": {
                            "predefinedType": "DEFINED",
                            "values": [
                                "AUT"
                            ]
                        },
                        "type": {
                            "predefinedType": "DEFINED",
                            "values": [
                                "DRIVING_LICENSE"
                            ]
                        }
                    }]
                }
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}