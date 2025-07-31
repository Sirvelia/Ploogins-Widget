import { SUGGERENCE_API_URL } from "../constants/api";

class Suggerence {
    public static readonly baseUrl: string = SUGGERENCE_API_URL;

    public static insights = async (slug: string) => {
        const response = await fetch(`${Suggerence.baseUrl}/insights/${slug}`);

        if (!response.ok) {
            return null;
        }

        return response.json();
    }
}

export default Suggerence;