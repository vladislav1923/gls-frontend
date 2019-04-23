export class UnsplashService {

    private clientId = '55f5bf7af97bb188abb13ae242329141e991125be8ac97e199a3c9ade21f69ca';
    private orientation = 'landscape';
    private apiUrl = `https://api.unsplash.com/photos/random?client_id=${this.clientId}&orientation=${this.orientation}`;
    private defaultImageUrl =
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80';

    public async getRandomImageUrl(): Promise<string> {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                const result = await response.json();

                return result.urls.regular;
            }

            return this.defaultImageUrl;
        } catch {
            return this.defaultImageUrl;
        }
    }

}
