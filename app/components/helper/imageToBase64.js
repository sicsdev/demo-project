
export async function convertImageToBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Intenta evitar problemas de CORS
        img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            let dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = () => {
            reject(new Error(`No se pudo cargar la imagen de la URL: ${url}`));
        };
        img.src = url;
    });
}
