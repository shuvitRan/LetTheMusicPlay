
// Process image in nodejs
let fs = require('fs');
let request = require('request');
let Jimp = require('jimp');
let metData = require('./DataRequest/insdata.json');
// let images = [];
// let loadedImages = 0;
let img_height = 400;




loadImages();


function loadImages(){
  console.log(Object.keys(metData).length);
  for (let i = 0; i<Object.keys(metData).length; i++){
      Jimp.read("../../MajorStudioSupportFile/InteractiveProject/MetInsOrigindownloads/"+ metData[i].objIds+".jpg", (err, myimg)=>{
        if(err) throw err;
        myimg
          .resize(Jimp.AUTO,img_height)
          .quality(100)
          .write(`./resizeImg/${metData[i].objIds}.jpg`);

      });

  }


}
