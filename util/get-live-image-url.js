const fs = require("fs");
require("dotenv").config();

const GetLiveImageurl = (filename) => {
  const imageData = fs.readFileSync(`./uploads/${filename}`);
  const base64Image = Buffer.from(imageData).toString("base64");

  const formData = new FormData();
  formData.append("image", base64Image);

  return fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return Promise.resolve(data.data.url);
    })
    .catch((err) => {
      return Promise.reject("unable to get Live url");
    });
};

module.exports = { GetLiveImageurl };
