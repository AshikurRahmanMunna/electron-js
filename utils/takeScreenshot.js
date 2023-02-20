const { desktopCapturer } = require("electron");
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");

const takeScreenshot = (writeToDom = false, type = "screen") => {
  desktopCapturer
    .getSources({
      types: [type],
      thumbnailSize: {
        width: 1920,
        height: 1080,
      },
    })
    .then((sources) => {
      const pathFile = readFileSync("./path.json", "utf-8");
      const pictureDir = JSON.parse(pathFile).picture;
      const saveDir = path.join(pictureDir, "/electron-screenshots");
      if (!existsSync(saveDir)) {
        mkdirSync(saveDir);
      }
      if (writeToDom) {
        const img = document.getElementById("ss-img");
        img.src = sources[0].thumbnail.toDataURL();
        img.style.width = "500px";
      }
      writeFileSync(
        path.join(saveDir, `/${Date.now()}.jpeg`),
        sources[0].thumbnail.toJPEG(100)
      );
    })
    .catch((err) => console.log("Error occurred", err));
};

module.exports = takeScreenshot;
