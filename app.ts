import * as fs from 'fs';
import * as jimp from 'jimp';

const inputDirectory = 'images'; 
const outputDirectory = 'output'; 
const watermarkPath = 'OOAY'; 


const addCircularWatermark = async (inputImagePath: string, outputImagePath: string) => {
  try {
    const imageBuffer = fs.readFileSync(inputImagePath);

    const image = await jimp.read(imageBuffer);

    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

    image.print(font, 10, 10, watermarkPath);

    await image.writeAsync(outputImagePath);

    console.log(`Circular watermark added to ${outputImagePath}`);
  } catch (error) {
      console.error('Error:', error.message);
  }
}

const processImages = async () => {
  try {
    const files = fs.readdirSync(inputDirectory);

    for (const file of files) {
      const inputImagePath = `${inputDirectory}/${file}`;
      const outputImagePath = `${outputDirectory}/${file.replace(/\.[^/.]+$/, ".png")}`;

      await addCircularWatermark(inputImagePath, outputImagePath);
    }

      console.log('All images processed successfully.');
  } catch (error) {
      console.error('Error:', error.message);
  }
}

processImages();

