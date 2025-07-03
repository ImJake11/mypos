
export function convertDataUrlToWebP(originalDataUrl: string, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Important for CORS if loading from external URLs

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error("Could not get 2D rendering context for canvas."));
                return;
            }
            ctx.drawImage(img, 0, 0);

            try {
                // Check if the browser supports WebP output
                if (canvas.toDataURL('image/webp', quality).startsWith('data:image/webp')) {
                    resolve(canvas.toDataURL('image/webp', quality));
                } else {
                    // Fallback or error if WebP is not supported by toDataURL
                    reject(new Error("Browser does not support WebP conversion via canvas.toDataURL."));
                }
            } catch (e) {
                reject(e);
            }
        };

        img.onerror = (e) => {
            reject(new Error(`Failed to load image from data URL: ${e}`));
        };

        img.src = originalDataUrl;
    });
}