import { API_URL } from '../constants/api';

class Public {
    public static readonly baseUrl: string = `${API_URL}/public`;

    public static suggestedSearches = async () => {
        const response = await fetch(`${Public.baseUrl}/suggested-searches`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw Error('Failed to fetch suggested searches');
        }

        return response.json();
    }

    public static search = async (query: string, partner_uuid: string) => {
        const response = await fetch(`${Public.baseUrl}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, partner_uuid })
        });

        if (!response.ok) {
            throw Error('Failed to fetch search results');
        }

        return response.json();
    }
}

export default Public;