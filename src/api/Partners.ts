import { API_URL } from '../constants/api';

class Partners {
    public static readonly baseUrl: string = `${API_URL}/partners`;

    public static check = async (partnerUUID: string) => {
        const response = await fetch(`${Partners.baseUrl}/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ partner_uuid: partnerUUID }),
        });

        if (!response.ok) {
            return false;
        }

        return response.json();
    }
}

export default Partners;