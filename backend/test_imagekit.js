import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

console.log('Testing ImageKit connectivity...');
console.log('Public Key:', process.env.IMAGEKIT_PUBLIC_KEY);
console.log('Endpoint:', process.env.IMAGEKIT_URL_ENDPOINT);

try {
    // Just try to list some files or do a small upload if we have a dummy file
    const result = await imagekit.listFiles({
        limit: 1
    });
    console.log('Connection successful! Found files:', result.length);
} catch (err) {
    console.error('Connection failed:', err);
}
