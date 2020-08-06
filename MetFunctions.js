
// Main section for the quize
let selectedItems=[];
let selectedSoundId;

let playerSelected;

let quizeObj=[];

let resultInfo;
let resultPicture;

let soundButton, restartButton, infoButton;

function StartButton(){

  rectMode(CENTER);
  let buttonWidth=200;
  let buttonHeight=40;


// find the start button position
  if(mouseX>=width/2-buttonWidth/2 &&
    mouseX<=width/2+buttonWidth/2 &&
    mouseY<=height/2+buttonHeight/2 &&
    mouseY>=height/2-buttonHeight/2){
      fill(20);
      stroke(200,20,200,200);
      // stroke(200);
      strokeWeight(2);
        // fill(230,20,50,200);
      rect(width/2, height/2,buttonWidth,buttonHeight,10);
      cursor('pointer');


      if(mouseIsPressed){
          calculateQuize();
          page="Loading";
          if(!clickSound.isPlaying()){
             clickSound.play();
          }

      };

  }else{
    noFill();
    stroke(230,20,100,200);
    strokeWeight(2);
    rect(width/2, height/2,buttonWidth,buttonHeight,10);
    cursor('default');
  };
  noStroke();
  fill(200);
  textSize(20);
  textAlign(CENTER,CENTER);
  text("Start",width/2, height/2);

  // enterButton.mouseOver();
};


class DisplayInstruments {
  constructor(objID){
    this.obj = loadImage("resizeImg/"+objID+".jpg");
    this.objID=objID
  }

  clicked(mx,my){
    if(mx>=this.x&&
       mx<=this.x+this.obj.width &&
       my >=this.y &&
       my<=this.y+this.obj.height){
         playerSelected = this.objID;




         // console.log("this is item: "+this.objID);

         compareResult();

    }
  }

  selected(mx,my){
    if(mx>=this.x&&
       mx<=this.x+this.obj.width &&
       my >=this.y &&
       my<=this.y+this.obj.height){
         // this.obj.resize(0,250);

         push();
         stroke(220,220,220,255);
         strokeWeight(5);
         rectMode(CORNER);
         fill(255,255,255,100);
         rect(this.x,this.y,this.obj.width,this.obj.height);
         pop();

     } else{

        // cursor('default')
     }
  }

  display(x,y,resize){
    this.resize= resize;
    this.obj.resize(0,this.resize);
    this.x=x;
    this.y=y;
    image(this.obj,this.x,this.y);

  }

};



function calculateQuize(){
  let thisObjId = [...objIds];

  for(let i=0; i<3;++i){
    let thisid= random(thisObjId);
    selectedItems[i]=thisid;
    //Deleting the added value from the clone array
    thisObjId = arrayRemove(thisObjId,thisid);
    // console.log(thisObjId);
    quizeObj[i] = new DisplayInstruments(selectedItems[i]);
  }
  selectedSoundId=random(selectedItems);
  
  sound = loadSound("sound/"+
    selectedSoundId+".mp3",()=>{
    // console.log("selectedItems:"+ selectedItems);
    // console.log("QuizeObj:"+quizeObj);
    // console.log("selectedSoundId"+selectedSoundId);


    SoundStatus();
    page="Quize";
    soundButton = new MyButton("Stop Music", width/2+10,height/2+200, playMusic, "regular");
    
    restartButton = new MyButton("Next",width/2-210,height/2+200, restartGame, "regular");


  });

};

function displayQuizeImages(){

  let thisX = 0;

  for(let i=0; i<selectedItems.length;++i){
    thisX+=quizeObj[i].obj.width;
  };

  let centerX = (width-thisX)/2;

  let newX =  centerX;
  selectedItems.forEach((n,i)=>{
    // thisX+=quizeObj[i].obj.width;
    quizeObj[i].display(newX,height/2-150,img_height);
    newX+=quizeObj[i].obj.width+10;
    quizeObj[i].selected(mouseX,mouseY);
    cursor('pointer');
  });

  // fill(204, 48, 118);
  fill(255);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("Guess which intrument is used to perform the sound.",width/2, height/2-200);





};

function mousePressed(){
  if(page == "Quize" && selection =="waitSelect"){
    for(let i = 0 ; i< quizeObj.length; ++i){
      quizeObj[i].clicked(mouseX,mouseY);
    }
  };

};

function compareResult(){

  if(playerSelected == selectedSoundId){


       selection ="Correct";
       //find the correct obj
       findTheObj();
       playSound = true;
       if(!correctSound.isPlaying()){

         correctSound.play();
       }

       infoButton = new MyButton("More Info",width/2-80,height/2+40, MoreInfoFromMet, "infoButton");




  }
  else if(playerSelected != selectedSoundId){

    selection = "Wrong";
    if(!wrongSound.isPlaying()){

      wrongSound.play();
    }

    // page="ResultWrong";

  }
};



function DescriptionPage(info, picture){
  background(20);
  this.info = info;
  this.picture = picture;

  SoundViz();
  // console.log(resultInfo);

  resultPicture.display(width/2-resultPicture.obj.width-100,height/2-150,img_height);
  let textX = width/2-80;

  fill(255);
  textSize(80);
  textAlign(LEFT,TOP);
  text(this.info.title,textX, height/2-150);
  textSize(20);
  text("Date: "+ this.info.date,textX, height/2-150+100);
  text("Culture: "+ this.info.culture,textX, height/2-150+130);
  text("Classification: "+ this.info.classification,textX, height/2-150+160);

}



function findTheObj(){

// console.log(metData);

//keep the picture
for(let i =0; i<quizeObj.length;++i){
  if(quizeObj[i].objID==selectedSoundId){
     resultPicture =quizeObj[i];
  };
};
//find the object in met data
  for(let n in metData){
    if(selectedSoundId==metData[n].objIds){

      // console.log(metData[n]);
      resultInfo = metData[n];
    }
  };



};

function playMusic(){
  playSound=!playSound;
  if(playSound){
    soundButton.button.html("Stop Music");
  }else{
    soundButton.button.html("Play Music");
  }

  SoundStatus();



};

function restartGame(){

  // let thisObjId = [...objIds];
  if(sound.isPlaying()){
  sound.stop();
  };

  if(!clickSound.isPlaying()){

     clickSound.play();
  }

 random4Shape=random(2,10);
  if(posneg==1){
    posneg=-1;
  }else{
    posneg=1;
  }

  if(vizPage==1){

    for(let i = 0; i<fftLines.length;i++){
      fftLines[i].update();
    };

    vizPage=2;


  }else if(vizPage==2){

    vizPage=3
  } else if(vizPage==3){

    for(let i = 0; i<fftCircles.length;i++){
      fftCircles[i].pUpdate();
    };
    vizPage=1;
  }

  playSound=true;
  soundButton.remover();
  restartButton.remover();
  if(page =='Result'){
  infoButton.remover();
};
  calculateQuize();
  page="Loading";


}

function MoreInfoFromMet(){
  let win= window.open("https://www.metmuseum.org/art/collection/search/"+resultInfo.objIds,"_blank");
  win.focus();
  if(!clickSound.isPlaying()){

     clickSound.play();
  }


}






// button on canvas
class MyButton {


  constructor(index,x,y,myfunction,buttonClass){
    this.button;
    this.index = index;
    this.x =x;
    this.y = y;
    this.myfunction = myfunction;

    this.button = createButton(this.index);
    if(buttonClass != undefined){
      this.buttonClass= buttonClass;
      // this.button.class(`${this.buttonClass}`);
      this.button.class(this.buttonClass);
    }
    this.button.position(this.x,this.y);
    this.button.mousePressed(this.myfunction);

  }

  checkWidth(updateX){
    this.updateX =updateX;
    this.button.position(updateX,this.y);
    // this.button.top

  }

  remover(){
    this.button.remove();
  };


}


// function mouseMoved(){
//   for(let i = 0 ; i< quizeObj.length; ++i){
//     quizeObj[i].selected(mouseX,mouseY);
//   }
// }



function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
};
