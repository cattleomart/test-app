const pixelmatch = require("pixelmatch")
const fs = require("fs")
const PNG = require("pngjs").PNG

exports.compareScreenshots = fileName => {
  return new Promise((resolve, reject) => {
    const doneReading = () => {
      expect(img1.width).toBe(img2.width);
      expect(img1.height).toBe(img2.height);
     // console.log(img1);
      //console.log(img2);
      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        null,
        img1.width,
        img1.height,
        { threshold: 0.1 }
      );
      {
        expect(numDiffPixels).toBe(0);
      }
      console.log(numDiffPixels)
      resolve();
    };
    console.log('creating img vars and parsing')
    const img1 = fs.createReadStream("testScreenshot.png").pipe(new PNG());
   // console.log(fileName)
  
    const img2 = fs
      .createReadStream(fileName)
      .pipe(new PNG())
      .on("parsed", doneReading);
     
  });
};
