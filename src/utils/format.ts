export const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
        return `${(downloads / 1000000).toFixed(1)}M`;
    }

    if (downloads >= 1000) {
        return `${(downloads / 1000).toFixed(1)}K`;
    }

    return downloads.toString();
}

export const formatRating = (rating: number) => {
    const calculatedRating = rating * 5 / 100;
    const roundedRating = Math.ceil(calculatedRating * 10) / 10; // Round up to 1 decimal place
    return roundedRating % 1 === 0 ? roundedRating.toFixed(0) : roundedRating.toFixed(1);
}

export const strip_tags = (html: string, tags: string[]): string => {
    const regex = new RegExp(`<(${tags.join('|')})(\\s[^>]*)?>|<\/(${tags.join('|')})>`, 'gi');
    return html.replace(regex, '');
}