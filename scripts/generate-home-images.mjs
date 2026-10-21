import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
import {stat} from 'node:fs/promises';
const root = new URL('../public/images/',import.meta.url);
const input = fileURLToPath(new URL('hero-wide-selected.webp',root));
for (const [name,width,height] of [['hero-mobile-480.webp',480,600],['hero-mobile-800.webp',800,1000],['hero-wide-1280.webp',1280,null]]) {
 const destination = fileURLToPath(new URL(name,root));
 // Derive responsive sizes from the approved illustration; no new product artwork.
 await sharp(input).resize(width,height,{fit:'cover',position:'right',withoutEnlargement:true}).webp({quality:80}).toFile(destination);
 console.log(name,(await stat(destination)).size);
}
