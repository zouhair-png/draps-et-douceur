const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'assets/instagram/1.jpg',
  'assets/instagram/2.jpg',
  'assets/instagram/3.jpg',
  'assets/instagram/4.jpg'
];

(async function(){
  for (const img of images){
    const base = path.basename(img).replace(/\.[^.]+$/,'');
    const input = img;
    const out1200 = `assets/instagram/${base}-1200.jpg`;
    const out800 = `assets/instagram/${base}-800.jpg`;
    const out1200webp = `assets/instagram/${base}-1200.webp`;
    const out800webp = `assets/instagram/${base}-800.webp`;

    try {
      await sharp(input).resize(1200).jpeg({quality:80}).toFile(out1200);
      await sharp(input).resize(800).jpeg({quality:80}).toFile(out800);
      await sharp(input).resize(1200).webp({quality:80}).toFile(out1200webp);
      await sharp(input).resize(800).webp({quality:80}).toFile(out800webp);
      console.log('Optimized', input);
    } catch (e) {
      console.error('Error optimizing', input, e.message);
    }
  }
})();
