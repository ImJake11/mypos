

export function convertDataUrlToBlob(dataUrl: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const parts = dataUrl.split(';');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1].split(',')[1]); // Decode Base64
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        try {
            resolve(new Blob([uInt8Array], { type: contentType }));
        } catch (e) {
            reject(e);
        }
    });
}